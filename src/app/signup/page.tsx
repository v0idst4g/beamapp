import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Get started",
  description: "Create your Beam account.",
};

export default function SignupPage() {
  return (
    <AuthShell>
      <Suspense fallback={<div className="h-[360px]" />}>
        <AuthForm mode="signup" />
      </Suspense>
    </AuthShell>
  );
}
