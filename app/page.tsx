import { Button as ButtonSCN } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MailPlus, MailQuestion } from "lucide-react";
import Image from "next/image";
import PlaceholderImage from "@/public/placeholder-500-300.svg";
import PrototypeDashboard from "@/public/prototype-dashboard.png";
import PrototypeManageProject from "@/public/prototype-manage-project.png";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { TracingBeam } from "@/components/ui/tracing-beam";

export default function Home() {
  return (
    <>
    <TracingBeam className="xl:ml-20 xl:mr-40 md:ml-0 sm:ml-0">
      <div className="xl:p-10 md:p-10 sm:p-7 p-5">
        <h1 className="xl:text-8xl md:text-7xl sm:text-6xl text-5xl font-black pb-5">Give back to <span className="text-success">your<br />community, your way</span></h1>
        <p className="text-lg pb-5">Find local volunteering opportunities today with Let&apos;s Assist, and give back to your community.</p>
        <div className="flex">
          <Input className="mb-2 w-1/4 mr-5" type="email" placeholder="enter@email.here" />
          <ButtonSCN>
            <MailPlus className="pr-1" />
            Join The Waitlist
          </ButtonSCN>
        </div>
      </div>
      <Separator />
      <div className="text-center">
        <h1 className="text-3xl m-5 font-bold" id="features">Features</h1>
        <div className="grid grid-cols-2 m-5 justify-items-center space-y-5">
          <Image src={PrototypeDashboard} alt="A demo user-interface for the dashboard page" width={500} height={300} className="rounded-md" />
          <div>
            <h1 className="text-xl font-bold">Find Volunteering Opportunities</h1>
            <p className="text-sm">Finding volunteering opportunities has never been easier than using Let&apos;s Assist&apos;s easy-to-use dashboard! Use tags and location matching to sort through opportunities and retrieve the ones that fit you.</p>
          </div>
          <div>
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
      </TracingBeam>
    </>
  );
}
