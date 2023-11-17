"use client";
import React from 'react';
import LandingPage from '@/components/LandingPage';
import Dashboard from '@/components/Dashboard';
import { useSession } from "next-auth/react";

export default function Home() {
  const { status, data: session } = useSession();
  // ! Switch false & true around for login BYPASS
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