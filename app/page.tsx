import { Button as ButtonSCN } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MailPlus, OctagonAlert, UserPlus } from "lucide-react";
import Image from "next/image";
import PlaceholderImage from "@/public/placeholder-500-300.svg";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";


export default function Home() {
  return (
    <>
      {/* If the user IS signed in */}
      {/* <div className="flex justify-center items-center h-screen">
        <div className="">
          <Button className="m-2" color="primary">NextUI Sign Up Button</Button>
          <ButtonSCN className="m-2 rounded-xl">ShadCN Button</ButtonSCN>
        </div>
      </div> */}

      {/* If the user is NOT signed in */}
      <div className="text-center align-middle p-10">
        <h1 className="text-7xl font-bold pb-5">Give back to your<br />community, your way</h1>
        <p className="text-lg pb-5">Find local volunteering opportunities today with Let&apos;s Assist, and give back to your community.</p>
        <Alert variant="default" className="my-10">
          <AlertTitle>Note From Developers</AlertTitle>
          <AlertDescription>Let&apos;s Assist is still in development! Everything you see is a work in progress and may not even function! If you want to receive updates on development join the waitlist by clicking the button below. This lets us know how many people are intrested in this software, as well as lets you know what major development changes have happened.</AlertDescription>
        </Alert>
        {/* <ButtonSCN variant="default">
          <UserPlus className="pr-1" />
          Get Started
        </ButtonSCN> */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <ButtonSCN>
              <MailPlus className="pr-1" />
              Join The Waitlist
            </ButtonSCN>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Join Our Waitlist!</AlertDialogTitle>
              <AlertDialogDescription>
                Joining our waitlist means you know our progress with developing this software. It also lets us know how many people are interested in this handy-dandy piece of software. You can unsubscribe from this anytime.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Nevermind</AlertDialogCancel>
              <AlertDialogAction className="bg-success-500 hover:bg-success-700">Sign Me Up!</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Separator />
      <div className="grid grid-cols-2 justify-center m-5 p-1">
        <Image src={PlaceholderImage} alt="Placeholder" width={500} height={300} className="rounded-md" />
        <div>
          <h1 className="text-xl">Find & Manage Volunteering Opportunities With Ease.</h1>
          <p className="text-sm">Finding and managing volunteering opportunities has never been easier than using Let&apos;s Assist&apos;s easy-to-use dashboard!</p>
        </div>
      </div>
    </>
  );
}
