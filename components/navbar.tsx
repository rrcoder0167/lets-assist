import React from 'react';
import Image from 'next/image'; // Make sure to import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <a className="navbar-brand" href="#">
        <Image src="/letsassist-logo.svg" width={30} height={30} alt="Let's Assist" />
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
        <button className="btn btn-primary ml-3">Sign Up</button>
      </div>
    </nav>
  );
}

export default Navbar;