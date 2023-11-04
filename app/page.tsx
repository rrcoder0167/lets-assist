import React from 'react';
import "./page.css";

export default function Home() {
  return (
    <>
      <main className="d-flex align-items-center justify-content-center flex-column" style={{height: '80vh'}}>
        <h1 className="landing-text">Give back to your<br/>community, your way</h1>
        <p className="sub-text">Find local volunteering opportunities <span className="highlight">today</span> with Let&apos;s Assist, and give back to your community</p>
        <button className="btn btn-success mt-3">Get Started</button>
      </main>
      <ProjectMatchmaking />
      <RealTimeProjectUpdates />
      <VolunteerRecognition />
      <CommunityForums />
    </>
  );
}

function ProjectMatchmaking() {
  return (
    <section className="section-container">
      <div className="section-content">
        <h2 className="section-title">Find what you <span className="section-highlight">love</span>, give when you can.</h2>
        <p className="section-subtext">This is some subtext for the Project Matchmaking section.</p>
        <div className="section-details">
          <div className="section-image">
            <img src="https://placehold.co/500x300" alt="Placeholder" />
          </div>
          <div className="section-description">
            <h3 className="description-title">Image Description</h3>
            <p className="description-subtext">This is some subtext for the image description.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RealTimeProjectUpdates() {
  return (
    <section>
      <h2>Real-Time Project Updates</h2>
      <p>Description for Real-Time Project Updates...</p>
    </section>
  );
}

function VolunteerRecognition() {
  return (
    <section>
      <h2>Volunteer Recognition</h2>
      <p>Description for Volunteer Recognition...</p>
    </section>
  );
}

function CommunityForums() {
  return (
    <section>
      <h2>Community Forums</h2>
      <p>Description for Community Forums...</p>
    </section>
  );
}