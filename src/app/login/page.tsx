import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to Beam.",
};

export default function LoginPage() {
  return (
    <AuthShell>
      <Suspense fallback={<div className="h-[360px]" />}>
        <AuthForm mode="login" />
      </Suspense>
    </AuthShell>
  );
}
