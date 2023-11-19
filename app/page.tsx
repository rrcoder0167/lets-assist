"use client";

import React, { useEffect, useState } from 'react';
import LandingPage from '@/components/LandingPage';
import Dashboard from '@/components/Dashboard';
import "./page.css"
import { useSession } from "next-auth/react";

export default function Home() {
  const { status, data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
  let timeoutId;
  if (status === "loading") {
    timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds
  } else if (status === "authenticated") {
    setAuthenticated(true);
    setIsLoading(false);
  }

  return () => {
    clearTimeout(timeoutId);
  };
}, [status]);

  return (
    <>
  {status === "loading" ? (
    <div className="loading-page d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Ready!</span>
      </div>
      <p className="loading-text">Loading the latest content for you...</p>
    </div>
  ) : status === "authenticated" ? (
    <Dashboard />
  ) : (
    <LandingPage />
  )}
</>
  );
}