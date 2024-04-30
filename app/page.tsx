import { Button as ButtonSCN } from "@/components/ui/button";
import { UserPlus } from "lucide-react";


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
        <ButtonSCN variant="default">
          <UserPlus className="pr-1" />
          Get Started
        </ButtonSCN>
      </div>
    </>
  );
}
