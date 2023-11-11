import "./LandingPage.css";
import React from 'react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <>
      <main className="d-flex align-items-center justify-content-center flex-column" style={{ height: '80vh' }}>
        <h1 className="landing-text">Give back to your<br />community, your way</h1>
        <p className="sub-text">Find local volunteering opportunities <span className="highlight">today</span> with Let&apos;s Assist, and give back to your community</p>
        <button className="btn btn-success mt-3">Get Started</button>
      </main>
      <ProjectMatchmaking />
      <RealTimeProjectUpdates />
      <VolunteerRecognition />
      <CommunityForums />
      <EndingSection />
      <Footer />
    </>
  );
}

function ProjectMatchmaking() {
  return (
    <section className="section-container">
      <div className="section-content">
        <h2 className="section-title">Find what you <span className="section-highlight-love">love</span>, give when <span className="section-highlight-green">you can.</span></h2>
        <p className="section-subtext">This is some subtext for the Project Matchmaking section.</p>
        <div className="section-details">
          <div className="section-image">
            <Image src="https://placehold.co/500x300" alt="Placeholder" width={500} height={300} />
          </div>
          <div className="section-description">
            <Image className="description-icon" src="https://placehold.co/32x32" alt="Heart Icon" width={32} height={32} />
            <h3 className="description-title">Personalized Project Matching</h3>
            <p className="description-subtext">Connect with causes close to your heart with our smart matching system that aligns your passions and skills with community needs.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RealTimeProjectUpdates() {
  return (
    <section className="section-container">
      <div className="section-content">
        <div className="section-flex-container">
          <div className="section-description">
            <h3 className="description-title">Stay Updated, Stay Involved</h3>
            <p className="description-subtext">Never miss a chance to make a difference with real-time alerts for new projects and updates.</p>
          </div>
          <div className="section-image">
            <Image src="https://placehold.co/500x300" alt="Placeholder" width={500} height={300} />
          </div>
        </div>
      </div>
    </section>
  );
}

function VolunteerRecognition() {
  return (
    <section className="section-container">
      <div className="section-content">
        <div className="section-details">
          <div className="section-image">
            <Image src="https://placehold.co/500x300" alt="Placeholder" width={500} height={300} />
          </div>
          <div className="section-description">
            <h3 className="description-title">Celebrate Your Contributions</h3>
            <p className="description-subtext">Get recognized for your volunteer work with achievement badges, certificates, and a spotlight in our volunteer community.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommunityForums() {
  return (
    <section className="section-container">
      <div className="section-content">
        <div className="section-flex-container">
          <div className="section-description">
            <h3 className="description-title">Join the Conversation</h3>
            <p className="description-subtext">Share stories, advice, and support in our community forums where volunteers unite to make a bigger impact.</p>
          </div>
          <div className="section-image">
            <Image src="https://placehold.co/500x300" alt="Placeholder" width={500} height={300} />
          </div>
        </div>
      </div>
    </section>
  );
}

function EndingSection() {
  return (
    <section className="ending-section">
      <div className="ending-content">
        <h2 className="ending-text">Who will you help today?</h2>
      </div>
    </section>
  );
}

function Footer() {
  const profilePictureSize = 128;

  return (
    <footer className="footer">
      <h3 className="developers-title">Meet the Developers</h3>
      <div className="profiles">
        <div className="profile">
          <a href="https://github.com/rrcoder0167">
            <Image src="https://avatars.githubusercontent.com/u/106852975?v=4" width={profilePictureSize} height={profilePictureSize} alt="Profile 1" />
          </a>
          <p>Riddhiman Rana</p>
        </div>
        <div className="profile">
          <a href="https://github.com/vkeshav300">
            <Image src="https://avatars.githubusercontent.com/u/70541603?v=4" width={profilePictureSize} height={profilePictureSize} alt="Profile 2" />
          </a>
          <p>Keshav Verma</p>
        </div>
        <div className="profile">
          <a href="https://github.com/errorcodezero">
            <Image src="https://avatars.githubusercontent.com/u/74121237?v=4" width={profilePictureSize} height={profilePictureSize} alt="Profile 3" />
          </a>
          <p>Abinav Venkit</p>
        </div>
      </div>
      <div className="credits">
        <p>Copyright 2023, Powered by Vercel.</p>
      </div>
    </footer>
  );
}