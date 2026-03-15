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
    const ownerEmail = process.env.OWNER_EMAIL;
    console.log("DEBUG: Using OWNER_EMAIL from process.env:", ownerEmail);

    if (resendKey && ownerEmail) {
      try {
        const resend = new Resend(resendKey);
        const { data: emailData, error: emailError } = await resend.emails.send({
          from: 'Royal Fragrance <onboarding@resend.dev>',
          to: [ownerEmail],
          subject: `👑 New Order: ${product.name} - ${customerName}`,
          html: `
            <div style="font-family: serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #b88b4a; background-color: #faf7f2;">
              <h1 style="color: #b88b4a; text-align: center; margin-bottom: 30px;">New Royal Order</h1>
              <div style="background-color: white; padding: 20px; border-radius: 15px; border: 1px solid rgba(184, 139, 74, 0.1);">
                <h3 style="color: #b88b4a; border-bottom: 1px solid rgba(184, 139, 74, 0.2); padding-bottom: 10px;">Fragrance Details</h3>
                <p><strong>Product:</strong> ${product.name}</p>
                <p><strong>Brand:</strong> ${product.brand}</p>
                <p><strong>Size:</strong> ${selectedSize.ml > 0 ? selectedSize.ml + 'ml' : 'Curated Collection'}</p>
                <p><strong>Subtotal:</strong> {selectedSize.price} DH</p>
                <p><strong>Delivery Fee:</strong> ${deliveryFee === 0 ? 'FREE' : deliveryFee + ' DH'}</p>
                <p style="font-size: 1.2em; color: #b88b4a; margin-top: 15px;"><strong>Total Price:</strong> ${totalPrice} DH</p>
              </div>

              <div style="background-color: white; padding: 20px; border-radius: 15px; border: 1px solid rgba(184, 139, 74, 0.1); margin-top: 20px;">
                <h3 style="color: #b88b4a; border-bottom: 1px solid rgba(184, 139, 74, 0.2); padding-bottom: 10px;">Customer Information</h3>
                <p><strong>Name:</strong> ${customerName}</p>
                <p><strong>WhatsApp:</strong> ${whatsappNumber}</p>
                <p><strong>Shipping Address:</strong> ${address}</p>
              </div>
              
              <div style="text-align: center; margin-top: 30px; color: #b88b4a; font-size: 0.8em; opacity: 0.6;">
                Royal Fragrance • The Art of Olfactory Opulence
              </div>
            </div>
          `,
        });

        if (emailError) {
          console.error("Resend API Error details:", emailError);
        } else {
          console.log("Order notification email sent successfully:", emailData?.id);
        }
      } catch (err) {
        console.error("Email notification failed with exception:", err);
      }
    } else {
      console.warn("Email notification skipped: RESEND_API_KEY or OWNER_EMAIL missing in environment.");
    }

    return NextResponse.json({ success: true, orderId: order[0].id });
  } catch (error: any) {
    console.error("Order Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
