"use client";
import "./Navbar.css"
import React from 'react';
import Image from 'next/image';
import { useSession, signOut } from "next-auth/react";
import { useState } from 'react';

export default function Navbar() {
  const { status, data: session } = useSession();
  const authenticated = (status == "authenticated") ? false : true;
  const [isMenuOpen, setMenuOpen] = useState(false);
  const handleButtonClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar px-4" data-bs-theme="dark">
      <a className="navbar-brand" href="/">
        <Image src="/letsassist-logo.svg" width={30} height={26} alt="Logo" className='navbar-brand-image' />
        Let&apos;s Assist
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
          {authenticated ? (
            // This if if you're not authenticated
            <>
            <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Features</a>
            <ul className='dropdown-menu'>
              <li><a className="dropdown-item" href="#">Project Matchmaking</a></li>
              <li><a className="dropdown-item" href="#">Real-Time Project Updates</a></li>
              <li><a className="dropdown-item" href="#">Volunteer Recognition</a></li>
              <li><a className="dropdown-item" href="#">Community Forums</a></li>
            </ul>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Volunteering Near You</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Contact</a>
          </li>
        </ul>
        </div>
              <a type="button" className="btn custom-btn-outline" href="/login">Login</a>
              <a type="button" className="btn custom-btn-fill" href="/signup">Sign Up</a>
            </>
          ) : (
            // This if if you're authenticated
            <>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="#">Volunteering Projects</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Featured</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Community Forums</a>
              </li>
            </ul>
            </div>
              <Image src={session?.user?.image! || ""} onClick={handleButtonClick} className="mx-1 my-auto profile-picture" width={60} height={60} alt="Profile" />
              {isMenuOpen && (
        <div className="menu">
            <div className="user-name">{session?.user?.name}</div>
            <div className="user-email">{session?.user?.email}</div>
            <a href="#">Account Settings</a>
            <a href="#">Send Feedback</a>
            <a href="#">Report a Bug</a>
            <hr></hr>
            <button onClick={() => signOut()} className="signout-btn">Sign Out</button>
        </div>
      )}
            </>
          )}
    </nav>
  );
}
