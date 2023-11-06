import React from 'react';
import Image from 'next/image';
import "./page.css"

export default function dashboard() {
  return (
    <>
    <nav className="navbar navbar-expand-lg custom-navbar px-2"  data-bs-theme="dark">
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
        <a className="nav-link active" href="#">Volunteering Projects</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Initiatives</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Community Feed</a>
      </li>
    </ul>
    </div>
    <div className="d-flex">
        <img src="https://placehold.co/35x35" className="profile-picture" alt="Profile" />
    </div>
    </nav>
    <div className='projects-container'>
    <a href="#" className="btn btn-success createbtn">
    <i className="bi bi-plus-lg"></i>
      Create Opportunity
      </a>
    </div>
    </>
  );
}