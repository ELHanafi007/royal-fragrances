import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const orderData = await request.json();
    const { product, selectedSize, customerName, whatsappNumber, address, deliveryFee, totalPrice } = orderData;

    // 1. Store order in Supabase
    const { data: order, error: dbError } = await supabase
      .from('orders')
      .insert([{
        product_name: product.name,
        brand: product.brand,
        size_ml: selectedSize.ml,
        price: selectedSize.price,
        delivery_fee: deliveryFee,
        total_price: totalPrice,
        customer_name: customerName,
        whatsapp_number: whatsappNumber,
        address: address,
        status: 'pending'
      }])
      .select();

    if (dbError) throw dbError;

    // 2. Send Email Notification (Optional)
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const resend = new Resend(resendKey);
        await resend.emails.send({
          from: 'Royal Fragrance <orders@resend.dev>',
          to: [process.env.OWNER_EMAIL || ''],
          subject: `👑 New Order: ${product.name} - ${customerName}`,
          html: `
            <div style="font-family: serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #b88b4a;">
              <h1 style="color: #b88b4a; text-align: center;">New Royal Order</h1>
              <hr style="border: 0; border-top: 1px solid #b88b4a;" />
              <h3>Product Details:</h3>
              <p><strong>Fragrance:</strong> ${product.name}</p>
              <p><strong>Brand:</strong> ${product.brand}</p>
              <p><strong>Size:</strong> ${selectedSize.ml > 0 ? selectedSize.ml + 'ml' : 'Curated Pack'}</p>
              <p><strong>Subtotal:</strong> ${selectedSize.price} DH</p>
              <p><strong>Delivery Fee:</strong> ${deliveryFee === 0 ? 'FREE' : deliveryFee + ' DH'}</p>
              <p style="font-size: 1.2em; color: #b88b4a;"><strong>Total Price:</strong> ${totalPrice} DH</p>
              <h3>Customer Details:</h3>
              <p><strong>Name:</strong> ${customerName}</p>
              <p><strong>WhatsApp:</strong> ${whatsappNumber}</p>
              <p><strong>Address:</strong> ${address}</p>
              <hr style="border: 0; border-top: 1px solid #b88b4a;" />
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Email notification failed, but order was saved:", emailError);
      }
    }

    return NextResponse.json({ success: true, orderId: order[0].id });
  } catch (error: any) {
    console.error("Order Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
