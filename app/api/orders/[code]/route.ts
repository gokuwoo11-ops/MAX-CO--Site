import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../../lib/supabaseAdmin";

type RouteContext = {
  params: Promise<{ code: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { code } = await context.params;
    const supabase = getSupabaseAdmin();

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("code", code)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    const { data: messages, error: messageError } = await supabase
      .from("order_messages")
      .select("*")
      .eq("order_id", order.id)
      .order("created_at", { ascending: true });

    if (messageError) {
      return NextResponse.json({ error: messageError.message }, { status: 500 });
    }

    return NextResponse.json({ order, messages: messages || [] });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unexpected error while loading order."
      },
      { status: 500 }
    );
  }
}
