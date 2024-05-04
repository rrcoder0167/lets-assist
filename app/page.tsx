import { Button as ButtonSCN } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MailPlus, MailQuestion } from "lucide-react";
import Image from "next/image";
import PlaceholderImage from "@/public/placeholder-500-300.svg";
import PrototypeDashboard from "@/public/prototype-dashboard.png";
import PrototypeManageProject from "@/public/prototype-manage-project.png";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input as InputSCN} from "@/components/ui/input";
import { Input } from "@nextui-org/react";

export default function Home() {
  return (
    <>
      <div className="xl:p-10 md:p-10 sm:p-7 p-5">
        <h1 className="xl:text-8xl md:text-7xl sm:text-6xl text-5xl font-black pb-5">Give back to <span className="text-success">your<br />community, your way</span></h1>
        <p className="text-lg pb-5">Find local volunteering opportunities today with Let&apos;s Assist, and give back to your community.</p>
        <Alert variant="default" className="my-10">
          <AlertTitle>Note From Developers</AlertTitle>
          <AlertDescription>Let&apos;s Assist is still in development! Everything you see is a work in progress, is not final, and may not even function! If you want to receive updates on development, join the waitlist by clicking the button below. This also lets us know how many people are intrested in this software.</AlertDescription>
        </Alert>
        <InputSCN className="md-2" />
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
              <Input type="email" placeholder="enter@email.here" />
              <AlertDialogAction className="bg-success-500 hover:bg-success-700">Sign Me Up!</AlertDialogAction>
              <AlertDialogCancel>Nevermind</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Separator />
      <div>
        <h1 className="text-3xl flex justify-center m-5 font-bold" id="features">Features</h1>
        <div className="grid grid-cols-2 justify-center m-5 p-1 space-y-10">
          <Image src={PrototypeDashboard} alt="A demo user-interface for the dashboard page" width={500} height={300} className="rounded-md" />
          <div>
            <h1 className="text-xl font-bold">Find Volunteering Opportunities</h1>
            <p className="text-sm">Finding volunteering opportunities has never been easier than using Let&apos;s Assist&apos;s easy-to-use dashboard! Use tags and location matching to sort through opportunities and retrieve the ones that fit you.</p>
          </div>
          <div className="mr-5">
            <h1 className="text-xl font-bold">Manage Volunteering Opportunities</h1>
            <p className="text-sm">The event manager page allows you update your event information and post updates about these events. You can update project information, download participant sheets, and post updates for participants to see.</p>
          </div>
          <Image src={PrototypeManageProject} alt="A demo user-interface for the manage project page" width={500} height={300} className="rounded-md" />
        </div>
      </div>
      <Separator />
      <div className="text-center">
        <h1 className="text-3xl m-5 font-bold" id="contact-us">Contact Us</h1>
        <p>We know you may have questions we did not answer with this page, so feel free to <span className="font-semibold">reach us at</span></p>
        <ButtonSCN variant="ghost" className="m-7">
          <MailQuestion className="mr-1" />
          riddhiman.please.put@email.here
        </ButtonSCN>
      </div>
    </>
  );
}
