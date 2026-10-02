"use client";

import RecoveryScreen from "@/components/RecoveryScreen";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <RecoveryScreen kind="error" retry={reset} />;
}
