import { HeroSection } from "@/components/Hero";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Lets Assist: The Ultimate Volunteering Platform",
  description:
    "The ultimate volunteering platform to help you find volunteering opportunities. Give back to your community, your way.",
};

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <HeroSection />
      {/* <div className="xl:p-10 md:p-10 sm:p-7 p-5 mb-72">
        <h1 className="xl:text-8xl md:text-7xl sm:text-6xl text-5xl font-black pb-5">
          Give back to <span className="text-primary">your<br />community, your way</span>
        </h1>
      </div> */}
    </div>
  );
}