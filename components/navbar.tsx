import React from 'react';
import Image from 'next/image';
import "./navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar px-4" data-bs-theme="dark">
      <a className="navbar-brand" href="#">
        <Image src="/letsassist-logo.svg" width={30} height={30} alt="logo" />
        Let&apos;s Assist
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <a className="nav-link custom-link" href="#">Features</a>
      </li>
      <li className="nav-item">
        <a className="nav-link custom-link" href="#">Volunteering Near You</a>
      </li>
      <li className="nav-item">
        <a className="nav-link custom-link" href="#">Contact</a>
      </li>
    </ul>
      </div>
      <div className="button-array">
      <a type="button" className="btn custom-btn-outline" href="#">Login</a>
      <a type="button" className="btn custom-btn-fill" href="#">Sign Up</a>
    </div>
    </nav>
  );
}

export default Navbar;