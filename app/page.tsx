"use client";
import { HeroSection } from "@/components/Hero";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Toaster, toast } from "sonner";
import { Suspense } from "react";
// import Dashboard from "@/components/Dashboard";

function HomeContent() {
  const searchParams = useSearchParams();
  useEffect(() => {
    const emailConfirmed = searchParams.get("confirmed");
    if (emailConfirmed === "true") {
      toast.success("Success! Email verified. Login to continue.", {
        duration: 5000,
      });
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Toaster position="bottom-right" theme="dark" richColors />
      <HeroSection />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
