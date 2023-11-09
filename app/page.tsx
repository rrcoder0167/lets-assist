"use client";
import React from 'react';
import LandingPage from '@/components/LandingPage';
import Navbar from '@/components/navbar';
import { useSession } from "next-auth/react";
import Image from "next/image";
import Dashboard from "@/components/dashboard";

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