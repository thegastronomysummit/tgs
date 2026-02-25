"use client";

import React, { ReactNode } from "react";
import { SessionProvider, useSession } from "@/lib/authMock";

interface SessionProviderCompProps {
  children: ReactNode;
}

export default function SessionProviderComp({ children }: SessionProviderCompProps) {
  // fetch session inside here (mock or real)
  const { session } = useSession?.() || {};

  return <SessionProvider session={session}>{children}</SessionProvider>;
}