"use client";
import { HeroSection } from "@/components/Hero";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Toaster, toast } from "sonner";
import { Suspense } from "react";

function HomeContent() {
  const searchParams = useSearchParams();
  useEffect(() => {
    const emailConfirmed = searchParams.get("confirmed");
    const emailDeleted = searchParams.get("deleted");

    if (emailConfirmed === "true") {
      toast.success("Success! Email verified. Login to continue.", {
        duration: 5000,
      });
      // Clean URL after showing toast
      window.history.replaceState({}, document.title, "/");
    }

    if (emailDeleted === "true") {
      toast.error("Your account has been successfully deleted.", {
        duration: 5000,
      });

      window.history.replaceState({}, document.title, "/");
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
