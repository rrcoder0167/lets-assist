"use client";
import React from 'react';
import LandingPage from '@/components/LandingPage';
import { useSession } from "next-auth/react";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const { status, data: session } = useSession();
  const authenticated = (status === "authenticated") ? false : true;

  return (
    <>
      {authenticated ? (
        <LandingPage />
      ) : (
      <Dashboard />
      )}
    </>
  );
}