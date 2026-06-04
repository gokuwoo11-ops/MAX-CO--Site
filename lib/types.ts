export type OrderStatus = "new" | "in_review" | "quoted" | "in_progress" | "completed";

export type Order = {
  id: string;
  code: string;
  user_id: string | null;
  student_email: string | null;
  student_name: string;
  class_grade: string;
  project_type: string;
  subject: string;
  topic: string;
  pages: string;
  deadline: string;
  instructions: string | null;
  reference_notes: string | null;
  status: OrderStatus | string;
  created_at: string;
  updated_at: string;
};

export type OrderMessage = {
  id: string;
  order_id: string;
  sender: "customer" | "owner" | "system";
  body: string;
  created_at: string;
};
