import React from 'react';
import Image from 'next/image';
import './page.css'

export default function Home() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <a className="navbar-brand font-weight-bold" href="#">
          <Image src="/letsassist-logo.svg" width="30" height="30" alt="Let's Assist"/>
          Let&apos;s Assist
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Volunteering Near You</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div className="ml-auto">
          <button className="btn btn-outline-primary mr-3">Login</button>
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </nav>
      <main className="d-flex align-items-center justify-content-center flex-column" style={{height: '80vh'}}>
        <h1 className="landing-text">Give back to your<br/>community, your way</h1>
        <p className="sub-text">Find local volunteering opportunities <span className="highlight">today</span> with Let&apos;s Assist, and give back to your community</p>
        <button className="btn btn-success mt-3">Get Started</button>
      </main>
    </>
  );
}