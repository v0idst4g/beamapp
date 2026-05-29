import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Workspace } from "@/components/app/Workspace";
import type { ChatMessage } from "@/lib/types";

export const metadata: Metadata = {
  title: "Your day",
};

// Always render fresh for the signed-in user.
export const dynamic = "force-dynamic";

export default async function AppPage() {
  // If Supabase isn't configured yet, send people to the login screen rather
  // than throwing — middleware normally guards this route in production.
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    redirect("/login");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware guards this route; this is a belt-and-braces fallback.
  if (!user) redirect("/login");

  const [{ data: profile }, { data: messages }] = await Promise.all([
    supabase
      .from("profiles")
      .select("subscription_status, stripe_customer_id")
      .eq("id", user.id)
      .maybeSingle(),
    supabase
      .from("messages")
      .select("id, user_id, role, content, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })
      .limit(50),
  ]);

  return (
    <Workspace
      userEmail={user.email ?? ""}
      subscriptionStatus={profile?.subscription_status ?? null}
      hasCustomer={Boolean(profile?.stripe_customer_id)}
      initialMessages={(messages ?? []) as ChatMessage[]}
    />
  );
}
