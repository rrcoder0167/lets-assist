import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import React from 'react';
import LandingPage from '@/components/LandingPage';

export default function Home() {
  return (
    <>
        <LandingPage />
    </>
  );
}

