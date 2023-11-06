import React from 'react';
import './page.css';
import Navbar from '@/components/navbar';

const RegisterPage = () => {
  return (
    <>
    <Navbar />
    <div className="container">
    <h2>Never made an Account before? No Problem!</h2>
    <div className="login-container">
      <div className="oauth-buttons">      
        <a href="#" className="oauth-button github">
          Signup with GitHub
          <img src="/github-logo.png" className="github-icon" alt="GitHub sign-up"></img>
        </a>
        <a href="#" className="oauth-button google">
          Signup with Google
          <img src="/google-logo.png" className="google-icon" alt="Google sign-up"></img>
        </a>
        <a href="#" className="oauth-button apple">
          Signup with Apple
          <img src="/apple-logo.png" className="apple-icon" alt="Apple sign-up"></img>
        </a>
      </div>
      <form className="login-form">
        <input type="text" placeholder="Username" className="input-field" />
        <input type="email" placeholder="Email" className="input-field" />
        <input type="password" placeholder="Password" className="input-field" />
        <input type="password" placeholder="Confirm Password" className="input-field" />
        <button type="submit" className="register-button">Register</button>
      </form>
      <div className="signup-link">
      <p>Already have an account? <a href="/login">Login here</a></p>
      </div>
    </div>
    </div>
    </>
  );
};

export default RegisterPage;