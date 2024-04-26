import { Button } from "@nextui-org/react";
import { Button as Button2 } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="">
        <Button className="mr-4" color="primary">NextUI Sign Up Button</Button>
        <Button2>ShadCN Button</Button2>
      </div>
    </div>
  );
}
