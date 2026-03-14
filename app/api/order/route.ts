import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const orderData = await request.json();
    const { product, selectedSize, customerName, whatsappNumber, address } = orderData;

    // 1. Store order in Supabase
    const { data: order, error: dbError } = await supabase
      .from('orders')
      .insert([{
        product_name: product.name,
        brand: product.brand,
        size_ml: selectedSize.ml,
        price: selectedSize.price,
        customer_name: customerName,
        whatsapp_number: whatsappNumber,
        address: address,
        status: 'pending'
      }])
      .select();

    if (dbError) throw dbError;

    // 2. Send Email Notification
    const { data: email, error: emailError } = await resend.emails.send({
      from: 'Royal Fragrance Orders <orders@resend.dev>', // You should use your own domain here eventually
      to: [process.env.OWNER_EMAIL!],
      subject: `👑 New Order: ${product.name} - ${customerName}`,
      html: `
        <div style="font-family: serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #b88b4a;">
          <h1 style="color: #b88b4a; text-align: center;">New Royal Order</h1>
          <hr style="border: 0; border-top: 1px solid #b88b4a;" />
          
          <h3>Product Details:</h3>
          <p><strong>Fragrance:</strong> ${product.name}</p>
          <p><strong>Brand:</strong> ${product.brand}</p>
          <p><strong>Size:</strong> ${selectedSize.ml}ml</p>
          <p><strong>Price:</strong> ${selectedSize.price} DH</p>
          
          <h3>Customer Details:</h3>
          <p><strong>Name:</strong> ${customerName}</p>
          <p><strong>WhatsApp:</strong> ${whatsappNumber}</p>
          <p><strong>Address:</strong> ${address}</p>
          
          <hr style="border: 0; border-top: 1px solid #b88b4a;" />
          <p style="font-size: 10px; color: #666; text-align: center;">Royal Fragrance - The Art of Olfactory Opulence</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, orderId: order[0].id });
  } catch (error: any) {
    console.error("Order Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
