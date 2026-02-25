"use client";

import React, { ReactNode } from "react";
import { SessionProvider, useSession } from "@/lib/authMock";

interface SessionProviderCompProps {
  children: ReactNode;
  session?: any;
}

export default function SessionProviderComp({
  children,
  session,
}: SessionProviderCompProps) {
  const clientSession = useSession?.()?.session || session;
  return <SessionProvider session={clientSession}>{children}</SessionProvider>;
}