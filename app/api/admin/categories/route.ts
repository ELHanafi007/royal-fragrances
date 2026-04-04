import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { checkAdminAuth } from '@/lib/auth';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('name, slug')
      .order('name', { ascending: true });

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
    const { name, slug } = await request.json();
    
    const { error } = await supabase
      .from('categories')
      .insert([{ name, slug }])
      .select();

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json({ error: 'Category already exists' }, { status: 400 });
      }
      throw error;
    }
    
    const { data: allCategories } = await supabase
      .from('categories')
      .select('name, slug')
      .order('name', { ascending: true });

    return NextResponse.json({ success: true, categories: allCategories });
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
    const { slug } = await request.json();
    
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('slug', slug);

    if (error) throw error;

    const { data: allCategories } = await supabase
      .from('categories')
      .select('name, slug')
      .order('name', { ascending: true });

    return NextResponse.json({ success: true, categories: allCategories });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
