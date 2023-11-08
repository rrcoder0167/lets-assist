"use client";
import React from 'react';
import LandingPage from '@/components/LandingPage';
import Navbar from '@/components/navbar';
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { status, data: session } = useSession();

  return (
    <LandingPage />
  );
}