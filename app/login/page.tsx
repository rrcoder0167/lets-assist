import React from 'react';
import './page.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      <h2>Login to Let&apos;s Assist</h2>
      <div className="oauth-buttons">      
        <button className="oauth-button github">Sign in with GitHub
        <img src="/github-logo.png" class="github-icon" alt="Google sign-in"></img>
        </button>
        <button className="oauth-button google">Sign in with Google
        <img src="/google-logo.png" class="google-icon" alt="Google sign-in"></img>
        </button>
        <button className="oauth-button apple">Sign in with Apple
        <img src="/apple-logo.png" class="apple-icon" alt="Apple sign-in"></img>
        </button>
      </div>
      <form className="login-form">
        <input type="text" placeholder="Username" className="input-field" />
        <input type="password" placeholder="Password" className="input-field" />
        <button type="submit" className="login-button">Login</button>
      </form>
      <p>Don&apos;t have an account? <a href="/signup">Sign up here</a></p>
    </div>
  );
};

export default LoginPage;