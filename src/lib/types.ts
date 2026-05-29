export type Note = {
  id: string;
  user_id: string;
  note_date: string; // YYYY-MM-DD
  body: string;
  updated_at: string;
};

export type Todo = {
  id: string;
  user_id: string;
  todo_date: string; // YYYY-MM-DD
  text: string;
  done: boolean;
  due_date: string | null;
  sort_order: number;
  created_at: string;
};

export type ChatMessage = {
  id: string;
  user_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
};

export type Profile = {
  id: string;
  created_at: string;
  stripe_customer_id: string | null;
  subscription_status: string | null;
};
