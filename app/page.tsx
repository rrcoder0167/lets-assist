import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import ImportBsJS from "@/components/importBsJs";

export default function Home() {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand font-weight-bold" href="#">Let's Assist</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">Volunteering Opportunities</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Contact</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Features</a>
          </li>
        </ul>
      </div>
    </nav>
    </>
  );
}