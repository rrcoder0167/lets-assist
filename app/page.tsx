"use client";
import React from 'react';
import LandingPage from '@/components/LandingPage';
import Navbar from '@/components/navbar';
import Dashboard from '@/components/Dashboard'
import { useSession } from "next-auth/react";

export default function Home() {
  const { status, data: session } = useSession();
    if (status === "authenticated") {
      return <>
      <Dashboard/>
      </>;
    } else {
      return <>
      <Navbar />
      <LandingPage />
      </>;
    }
  }