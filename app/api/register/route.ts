import { NextResponse } from "next/server"

export async function POST(req:any) {
    try {
        const {username, email, password} = await req.json();
        console.log("Name: ", username);
        console.log("Email: ", email);
        console.log("Password: ", password);
        return NextResponse.json({message: "User registered."}, {status: 201});
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred while registering the user."}, { status: 500 }
        )
    }
}