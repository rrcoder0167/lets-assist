"use client";
import React from 'react';
import './page.css';
import { signIn } from 'next-auth/react';
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const handleGoogleSignIn = () => {
      signIn("google");
    };
    const handleGithubSignIn = () => {
      signIn("github")
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await signIn("credentials", {
          email,
          password,
          redirect:false,
        });

        if (res.error) {
          setError("Invalid Credentials");
          return;
        }
      
        router.replace("/");
      } catch (error) {
        console.log(error);

      }


    }

  return (
    <>
      <div className="login-container">
        <h2>Login to Let&apos;s Assist</h2>
        <div className="oauth-buttons">
          <button onClick={handleGithubSignIn} className="oauth-button github">
            Log in with GitHub
            <Image src="/github-logo.png" className="github-icon" alt="GitHub sign-in" width={512} height={512}/>
          </button>
          <button onClick={handleGoogleSignIn} className="oauth-button google">
            Log in with Google
            <Image src="/google-logo.png" className="google-icon" alt="Google sign-in" width={512} height={512}/>
          </button>
          <a href="https://appleid.apple.com/auth/authorize" className="oauth-button apple">
            Log in with Apple
            <Image src="/apple-logo.png" className="apple-icon" alt="Apple sign-in" width={512} height={512}/>
          </a>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="input-field" />
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="input-field" />
          <button type="submit" className="login-button">Login</button>
          {error && (
            <div className="alert alert-danger" role="alert">
            {error}
            </div>
          )}
        </form>
        <div className="signup-link">
          <p>Don&apos;t have an account? <a href="/signup">Sign up here</a></p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;