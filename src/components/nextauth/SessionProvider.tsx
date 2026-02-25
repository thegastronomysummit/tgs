"use client";

import React, { ReactNode } from "react";
import { SessionProvider, useSession } from "@/lib/authMock"; // keep your mock or replace with 'next-auth/react'

interface SessionProviderCompProps {
  children: ReactNode;
}

export default function SessionProviderComp({ children }: SessionProviderCompProps) {
  // You can fetch or manage session here if needed
  const { session } = useSession?.() || {}; // optional if using mock

  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}