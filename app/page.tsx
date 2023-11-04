import React from 'react';
import Image from 'next/image';
import './page.css';
import Navbar from "./components/navbar.tsx";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="d-flex align-items-center justify-content-center flex-column" style={{height: '80vh'}}>
        <h1 className="landing-text">Give back to your<br/>community, your way</h1>
        <p className="sub-text">Find local volunteering opportunities <span className="highlight">today</span> with Let&apos;s Assist, and give back to your community</p>
        <button className="btn btn-success mt-3">Get Started</button>
      </main>
    </>
  );
}