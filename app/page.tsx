import { Button } from "@nextui-org/react";
import { Button as ButtonSCN } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="">
        <Button className="m-2" color="primary">NextUI Sign Up Button</Button>
        <ButtonSCN className="m-2 rounded-xl">ShadCN Button</ButtonSCN>
      </div>
    </div>
  );
}
