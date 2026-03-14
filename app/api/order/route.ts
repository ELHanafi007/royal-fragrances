import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, address, phone, product } = body;

    // Structured message for the owner
    const structuredMessage = `
🌟 NEW ORDER RECEIVED 🌟

👤 CUSTOMER DETAILS
-------------------
Name: ${name}
Phone: ${phone}
Address: ${address}

📦 PRODUCT DETAILS
------------------
Product: ${product.name}
Brand: ${product.brand}
Size: ${product.size}ml
Price: ${product.price} DH

⏰ ORDERED AT: ${new Date().toLocaleString()}
-------------------
    `;

    // Log the structured message to the server console (Owner receives this)
    // In a production app, you would send this via Email (e.g., Resend), 
    // Telegram Bot, or save to a Database.
    console.log(structuredMessage);

    // Return success to the client
    return NextResponse.json({ 
      success: true, 
      message: "Order processed successfully" 
    });
  } catch (error) {
    console.error("Order API Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to process order" 
    }, { status: 500 });
  }
}
