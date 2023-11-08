"use client"
import React from 'react';
import './page.css';
import { signIn } from 'next-auth/react';

const LoginPage = () => {
  const handleGoogleSignIn = () => {
    signIn("google");
  };
  return (
    <>
      <div className="login-container">
        <h2>Login to Let&apos;s Assist</h2>
        <div className="oauth-buttons">
          <a href="https://github.com/login/oauth/authorize" className="oauth-button github">
            Log in with GitHub
            <img src="/github-logo.png" className="github-icon" alt="GitHub sign-in" />
          </a>
          <button onClick={handleGoogleSignIn} className="oauth-button google">
            Log in with Google
            <img src="/google-logo.png" className="google-icon" alt="Google sign-in" />
          </button>
          <a href="https://appleid.apple.com/auth/authorize" className="oauth-button apple">
            Log in with Apple
            <img src="/apple-logo.png" className="apple-icon" alt="Apple sign-in" />
          </a>
        </div>
        <form className="login-form">
          <input type="email" placeholder="Email" className="input-field" />
          <input type="password" placeholder="Password" className="input-field" />
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="signup-link">
          <p>Don&apos;t have an account? <a href="/signup">Sign up here</a></p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;