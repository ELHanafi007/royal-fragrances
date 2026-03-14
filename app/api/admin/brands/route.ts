import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('brands')
      .select('name')
      .order('name', { ascending: true });

    if (error) throw error;
    return NextResponse.json(data.map(b => b.name));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    
    const { data, error } = await supabase
      .from('brands')
      .insert([{ name }])
      .select();

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json({ error: 'Brand already exists' }, { status: 400 });
      }
      throw error;
    }
    
    // Fetch all brands to return the updated list
    const { data: allBrands } = await supabase
      .from('brands')
      .select('name')
      .order('name', { ascending: true });

    return NextResponse.json({ success: true, brands: allBrands?.map(b => b.name) });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { name } = await request.json();
    
    const { error } = await supabase
      .from('brands')
      .delete()
      .eq('name', name);

    if (error) throw error;

    // Fetch all brands to return the updated list
    const { data: allBrands } = await supabase
      .from('brands')
      .select('name')
      .order('name', { ascending: true });

    return NextResponse.json({ success: true, brands: allBrands?.map(b => b.name) });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
