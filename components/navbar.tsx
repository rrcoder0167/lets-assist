import React from 'react';
import Image from 'next/image';
import "./navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar px-4"  data-bs-theme="dark">
      <a className="navbar-brand" href="#">
        <Image src="/letsassist-logo.svg" width={30} height={26} alt="Logo" className='navbar-brand-image'/>
        Let&apos;s Assist
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Features</a>
        <ul className='dropdown-menu'>
          <li><a className="dropdown-item" href="#">Your Privacy</a></li>
          <li><a className="dropdown-item" href="#">Easy to use UI</a></li>
          <li><a className="dropdown-item" href="#">Inspire Change within others</a></li>
        </ul>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Volunteering Near You</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Contact</a>
      </li>
    </ul>
      <div className="d-flex">
      <a type="button" className="btn custom-btn-outline" href="#">Login</a>
      <a type="button" className="btn custom-btn-fill" href="#">Sign Up</a>
    </div>
    </div>
    </nav>
  );
}

export default Navbar;