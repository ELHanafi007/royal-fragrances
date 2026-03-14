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
    // We try to match both camelCase and snake_case to be safe
    const product = {
      name: body.name,
      brand: body.brand,
      description: body.description,
      imageUrl: body.imageUrl,
      image_url: body.imageUrl, // Map to snake_case just in case
      category: body.category,
      sizes: body.sizes,
      notes: body.notes
    };

    // Basic validation
    if (!product.name || !product.brand) {
      return NextResponse.json({ error: 'Name and Brand are required' }, { status: 400 });
    }
    if (!product.imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('products')
      .insert([product])
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
    const updatedProduct = {
      name: rest.name,
      brand: rest.brand,
      description: rest.description,
      imageUrl: rest.imageUrl,
      image_url: rest.imageUrl, // Map to snake_case just in case
      category: rest.category,
      sizes: rest.sizes,
      notes: rest.notes
    };

    const { data, error } = await supabase
      .from('products')
      .update(updatedProduct)
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
