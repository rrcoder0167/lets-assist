import Image from "next/image";
import LetsAssistIcon from "@/public/lets-assist.svg"

export default function LetsAssistLogo() {
    return (
        <Image 
            priority
            src={LetsAssistIcon}
            alt="Let's Assist Logo"
        />
    )
}