"use client";

import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <>
      <Button asChild>
        <Link href="/register">Register</Link>
      </Button>
    </>
  );
}
