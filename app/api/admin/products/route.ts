import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { checkAdminAuth } from '@/lib/auth';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await request.json();
    
    // Clean data for Supabase
    const productData = {
      name: body.name,
      brand: body.brand,
      description: body.description,
      mini_description: body.miniDescription,
      image_url: body.imageUrl,
      images: body.images || [body.imageUrl],
      category: body.category,
      variants: body.variants,
      characteristics: body.characteristics,
      notes: body.notes
    };

    console.log("Sending to Supabase:", productData);

    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select();

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(data[0]);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { id, ...rest } = body;

    // Clean data for Supabase
    const updatedProductData = {
      name: rest.name,
      brand: rest.brand,
      description: rest.description,
      mini_description: rest.miniDescription,
      image_url: rest.imageUrl,
      images: rest.images || [rest.imageUrl],
      category: rest.category,
      variants: rest.variants,
      characteristics: rest.characteristics,
      notes: rest.notes
    };

    console.log("Updating Supabase:", updatedProductData);

    const { data, error } = await supabase
      .from('products')
      .update(updatedProductData)
      .eq('id', id)
      .select();

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(data[0]);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { id } = await request.json();
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
