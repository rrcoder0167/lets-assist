import React from 'react';
import './page.css';
import Navbar from '@/components/navbar';

const LoginPage = () => {
  return (
    <>
    <Navbar />
    <div className="login-container">
    <h2>Login to Let&apos;s Assist</h2>
      <div className="oauth-buttons">      
      <a href="https://github.com/login/oauth/authorize" className="oauth-button github">
    Sign in with GitHub
    <img src="/github-logo.png" className="github-icon" alt="GitHub sign-in" />
</a>
<a href="https://accounts.google.com/o/oauth2/v2/auth" className="oauth-button google">
    Sign in with Google
    <img src="/google-logo.png" className="google-icon" alt="Google sign-in" />
</a>
<a href="https://appleid.apple.com/auth/authorize" className="oauth-button apple">
    Sign in with Apple
    <img src="/apple-logo.png" className="apple-icon" alt="Apple sign-in" />
</a>
      </div>
      <form className="login-form">
        <input type="text" placeholder="Username" className="input-field" />
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