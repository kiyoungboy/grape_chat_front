import type { PropsWithChildren } from "react";

import { useAuth } from "@/hooks/useAuth";

export default function ProtectedRoute({
  children,
}: PropsWithChildren) {
  const { loading } = useAuth();

  if (loading) {
    return <div>인증 확인 중...</div>;
  }

  return children;
}