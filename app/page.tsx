import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import React from 'react';
import LandingPage from '@/components/LandingPage';


export default async function Home() {
  const session = await getServerSession(options)
  return (
    <>
      <LandingPage />
    </>
  );
}

