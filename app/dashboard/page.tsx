import React from 'react';
import Image from 'next/image';
import "./page.css"

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar px-4"  data-bs-theme="dark">
      <a className="navbar-brand" href="/">
        <Image src="/letsassist-logo.svg" width={30} height={26} alt="Logo" className='navbar-brand-image'/>
        Let&apos;s Assist
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <a className="nav-link" href="#">Random Stuff</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">More Random Stuff</a>
      </li>
    </ul>
      <div className="d-flex">
        <img src="https://placehold.co/35x35" className="profile-picture" alt="Profile" />
    </div>
    </div>
    </nav>
  );
}

export default Navbar;