import type { Metadata } from "next";
import "./globals.css";
import DisplayCard from "@/components/displayCard";

export const metadata: Metadata = {
  title: "Let's Assist",
  description: "A volunteering platform",
};

export default function Home() {
  return (
    <>
      <main className="center-col my-36">
        <h1 className="text-8xl keyword">Let{"'"}s Assist</h1>
        <p className="text-sm font-bold">
          Handling <span className="keyword"> volunteering </span> made easy.
          Give back to your <span className="keyword">community.</span>
        </p>
      </main>
      <div>
        <DisplayCard
          title="Volunteering"
          keyword="Groups"
          description="Make group-based volunteering events restricted to those within the group."
          src="https://placehold.co/500x300"
          alt="Placeholder"
          className="center-col"
        />
      </div>
    </>
  );
}
