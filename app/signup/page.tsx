"use client";
import './page.css';
import React from 'react';
import Image from "next/image";
import { useState } from "react";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleSignIn = () => {
    signIn("google");
  };
  const handleGithubSignIn = () => {
    signIn("github")
  }

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch('api/userExists', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch('api/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
        })
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <>
      <div className="container">
        <h2>Don&apos;t have an account? No Problem!</h2>
        <div className="login-container">
          <div className="oauth-buttons">
            <button onClick={handleGithubSignIn} className="oauth-button github">
              Log in with GitHub
              <Image src="/github-logo.png" className="github-icon" alt="GitHub sign-in" width={512} height={512} />
            </button>
            <button onClick={handleGoogleSignIn} className="oauth-button google">
              Log in with Google
              <Image src="/google-logo.png" className="google-icon" alt="Google sign-in" width={512} height={512} />
            </button>
            <button className="oauth-button apple">
              Signup with Apple
              <Image src="/apple-logo.png" className="apple-icon" alt="Apple sign-up" width={512} height={512}></Image>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <input onChange={e => setUsername(e.target.value)} type="text" placeholder="Name" className="input-field" />
            <input onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" className="input-field" />
            <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="input-field" />
            <input type="password" placeholder="Confirm Password" className="input-field" />
            <button type="submit" className="register-button">Register</button>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
          </form>
          <div className="signup-link">
            <p>Already have an account? <a href="/login">Login here</a></p>
          </div>
        </div>
      </div>
    </>
  );
};