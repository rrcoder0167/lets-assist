"use client";
import "./page.css"
import React, { useRef } from 'react';
import Image from "next/image";
import { useSession} from "next-auth/react";

export default function LoginPage() {
    const fileInput = useRef<HTMLInputElement | null>(null);
    const { status, data: session } = useSession();

    const handleProfilePictureClick = () => {
        fileInput.current.click();
    };

    return (
        <>
        <div className="container">
            <h1>Settings</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Name</label>
                    <input type="text" className="form-control" id="username" placeholder="Enter your name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                </div>
                <div className="mb-3 profilepic">
                    <input type='file' id='file' ref={fileInput} style={{display: 'none'}}/>
                    <Image src={session?.user?.image! || ""} alt="Profile" width={100} height={100} className="profilepic-image"/><i className="fas fa-camera"></i>
                    <div className="profilepic-content" onClick={handleProfilePictureClick}>
                    <span className="profilepic-icon"><i className="fas fa-camera"></i></span>
                    <span className="profilepic-text">Edit Profile</span>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
        </>
    );
};