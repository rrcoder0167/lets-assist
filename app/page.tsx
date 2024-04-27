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
      {/* If the user is NOT signed in */}
      {redirect("/home")}

      {/* If the user IS signed in */}
      <div className="flex justify-center items-center h-screen">
        <div className="">
          <Button className="m-2" color="primary">NextUI Sign Up Button</Button>
          <ButtonSCN className="m-2 rounded-xl">ShadCN Button</ButtonSCN>
        </div>
      </div>
    </>
  );
}
