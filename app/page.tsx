import { Button } from "@nextui-org/react";
import { Button as ButtonSCN } from "@/components/ui/button";
import { redirect } from "next/navigation";

/*
* Basic IDEA:
* If the user is not signed in, the user will be redirected to the url with the /home extention.
* If the user is signed in, the dashboard will be displayed.
*/

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
