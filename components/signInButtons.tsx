"use client";

import React from 'react';
import Image from 'next/image';
import "./navbar.css"
import Link from 'next/link';
import { signIn } from "next-auth/react";

export default function SignInButtons() {
    return (
        <button
            onClick={() => signIn("google")}
            className="signInWithBtn"
        >
            <Image src="/google-logo.png" height={30} width={30} alt="Google Logo" />
            <span className="signInWithBtnText">Sign In With Google</span>
        </button>
    );
}