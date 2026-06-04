import { NextResponse } from "next/server";
import { createOrderCode } from "../../../lib/orderCode";
import { getSupabaseAdmin } from "../../../lib/supabaseAdmin";
import { notifyOwnerPush } from "../../../lib/pushNotifications";

function requiredString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseAdmin();

    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Login required before ordering." }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: authData, error: authError } = await supabase.auth.getUser(token);

    if (authError || !authData.user) {
      return NextResponse.json({ error: "Invalid login session." }, { status: 401 });
    }

    const body = await request.json();
    const requiredFields = ["studentName", "classGrade", "projectType", "subject", "topic", "pages", "deadline"];

    for (const field of requiredFields) {
      if (!requiredString(body[field])) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const code = createOrderCode();

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        code,
        user_id: authData.user.id,
        student_email: authData.user.email,
        student_name: body.studentName.trim(),
        class_grade: body.classGrade.trim(),
        project_type: body.projectType.trim(),
        subject: body.subject.trim(),
        topic: body.topic.trim(),
        pages: body.pages.trim(),
        deadline: body.deadline.trim(),
        instructions: body.instructions?.trim() || null,
        reference_notes: body.referenceNotes?.trim() || null,
        status: "new"
      })
      .select("*")
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: orderError?.message || "Could not save order." }, { status: 500 });
    }

    const { error: messageError } = await supabase.from("order_messages").insert({
      order_id: order.id,
      sender: "system",
      body: "Order created. The studio will reply here after checking your brief."
    });

    if (messageError) {
      return NextResponse.json({ error: messageError.message }, { status: 500 });
    }

    try {
      await notifyOwnerPush({
        title: `New MAX & Co order: ${order.code}`,
        body: `${order.subject} • ${order.topic} • Deadline: ${order.deadline}`,
        url: "/studio-desk-7q4"
      });
    } catch (error) {
      console.error("Owner push notification failed:", error);
    }

    return NextResponse.json({ success: true, orderCode: order.code });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error while creating order." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const ownerPin = request.headers.get("x-owner-pin");

    if (!ownerPin || ownerPin !== process.env.OWNER_PIN) {
      return NextResponse.json({ error: "Unauthorized studio access." }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ orders: data || [] });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error while loading orders." },
      { status: 500 }
    );
  }
}
