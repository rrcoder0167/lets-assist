"use client";
import "./page.css"; // Import your CSS module here
export default function dashboard() {
    return (
<div className="container">
    <h1 className="text-center">Settings</h1>

    <div className="row mt-5">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">Display Name</div>
          <div className="card-body">
            <input type="text" className="form-control" id="displayName" placeholder="Enter your display name"/>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card">
          <div className="card-header">Username</div>
          <div className="card-body">
            <input type="text" className="form-control" id="username" placeholder="Enter your username"/>
          </div>
        </div>
      </div>
    </div>

    <div className="row mt-5">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">Email Address</div>
          <div className="card-body">
            <input type="email" className="form-control" id="email" placeholder="Enter your email address"/>
          </div>
        </div>
      </div>
    </div>

    <div className="row mt-5">
      <div className="col-md-12">
        <button type="button" className="btn btn-primary btn-block">Save Changes</button>
      </div>
    </div>
  </div>
    )}

