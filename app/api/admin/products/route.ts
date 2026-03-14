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
    const product = await request.json();
    
    // Basic validation
    if (!product.imageUrl?.startsWith('http') && !product.imageUrl?.startsWith('/')) {
      return NextResponse.json({ error: 'Invalid Image URL' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select();

    if (error) throw error;
    return NextResponse.json(data[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { id, ...updatedProduct } = await request.json();

    // Basic validation
    if (!updatedProduct.imageUrl?.startsWith('http') && !updatedProduct.imageUrl?.startsWith('/')) {
      return NextResponse.json({ error: 'Invalid Image URL' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('products')
      .update(updatedProduct)
      .eq('id', id)
      .select();

    if (error) throw error;
    return NextResponse.json(data[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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
