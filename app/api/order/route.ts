import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const orderData = await request.json();
    const { cart, customerName, whatsappNumber, address, totalPrice } = orderData;

    // 1. Store order in Supabase
    // We store a summary for compatibility with existing schema if necessary
    const summary = cart.map((item: any) => `${item.name} (${item.size}) x${item.quantity}`).join(", ");
    
    const { data: order, error: dbError } = await supabase
      .from('orders')
      .insert([{
        product_name: summary.substring(0, 250), // Truncate if too long
        total_price: totalPrice,
        customer_name: customerName,
        whatsapp_number: whatsappNumber,
        address: address,
        status: 'pending'
      }])
      .select();

    if (dbError) {
      console.error("Supabase Storage Error:", dbError);
      // We continue anyway to send the email
    }

    // 2. Send Email Notification
    const resendKey = process.env.RESEND_API_KEY;
    const recipientEmail = "sunshinervshine@yahoo.com";

    if (resendKey) {
      try {
        const resend = new Resend(resendKey);
        
        const itemsHtml = cart.map((item: any) => `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.size}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">x${item.quantity}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${item.price * item.quantity} MAD</td>
          </tr>
        `).join("");

        const { data: emailData, error: emailError } = await resend.emails.send({
          from: 'Plantes Artificielles <onboarding@resend.dev>',
          to: [recipientEmail],
          subject: `🌿 Nouvelle Commande: ${customerName}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #1a2e1a; background-color: #fdfdfb;">
              <h1 style="color: #1a2e1a; text-align: center; margin-bottom: 30px;">Nouvelle Acquisition</h1>
              
              <div style="background-color: white; padding: 20px; border-radius: 15px; border: 1px solid rgba(26, 46, 26, 0.1);">
                <h3 style="color: #1a2e1a; border-bottom: 1px solid rgba(26, 46, 26, 0.2); padding-bottom: 10px;">Détails de la Sélection</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr>
                      <th style="text-align: left; padding: 10px; font-size: 12px; color: #666;">PRODUIT</th>
                      <th style="text-align: center; padding: 10px; font-size: 12px; color: #666;">TAILLE</th>
                      <th style="text-align: center; padding: 10px; font-size: 12px; color: #666;">QTÉ</th>
                      <th style="text-align: right; padding: 10px; font-size: 12px; color: #666;">PRIX</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                  </tbody>
                </table>
                <p style="text-align: right; font-size: 1.2em; color: #1a2e1a; margin-top: 20px;">
                  <strong>Total: ${totalPrice} MAD</strong>
                </p>
                <p style="text-align: right; color: #2d4a2d; font-size: 0.8em;">Livraison: GRATUITE</p>
              </div>

              <div style="background-color: white; padding: 20px; border-radius: 15px; border: 1px solid rgba(26, 46, 26, 0.1); margin-top: 20px;">
                <h3 style="color: #1a2e1a; border-bottom: 1px solid rgba(26, 46, 26, 0.2); padding-bottom: 10px;">Informations Client</h3>
                <p><strong>Nom:</strong> ${customerName}</p>
                <p><strong>WhatsApp:</strong> ${whatsappNumber}</p>
                <p><strong>Adresse:</strong> ${address}</p>
              </div>
              
              <div style="text-align: center; margin-top: 30px; color: #1a2e1a; font-size: 0.8em; opacity: 0.6;">
                Plantes Artificielles • Le Luxe Botanique Permanent
              </div>
            </div>
          `,
        });

        if (emailError) {
          console.error("Resend API Error details:", emailError);
        }
      } catch (err) {
        console.error("Email notification failed with exception:", err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Order Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
