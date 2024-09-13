"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import "../globals.css";
import { KeyRound } from "lucide-react";

const formSchema = z
  .object({
    first_name: z
      .string()
      .max(100, {
        message: "Maximum field length achieved",
      })
      .trim(),
    last_name: z
      .string()
      .max(100, {
        message: "Maximum field length achieved",
      })
      .trim(),
    email: z
      .string()
      .email({
        message: "Invalid email",
      })
      .trim(),
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters long",
      })
      .regex(
        /^(?=.*[0-9])(?=.*[!@#$%^&*~`_=+;:-])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*~`_=+;:-]/,
        {
          message:
            "Password must contain: at least 1 lower case letter, at least 1 upper case letter, at least 1 number, and at least 1 of the following symbols: ! @ # $ % ^ & * ~ ` _ - = + ; :",
        }
      ),
    password2: z.string(),
    uid: z.string().uuid(),
  })
  .required();

export default function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  });

  // Handles submitting
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function googleProvider() {}

  function appleProvider() {}

  return (
    <>
      <title>Register</title>
      <div className="flex flex-col justify-center mx-96 gap-y-3 my-5">
        <Button onClick={googleProvider} variant="secondary">
          {" "}
          <KeyRound className="mr-2" /> Register With Google{" "}
        </Button>
        <Button onClick={appleProvider}>
          {" "}
          <KeyRound className="mr-2" /> Register With Apple{" "}
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center mx-96 gap-y-5"
        >
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <b>First Name</b>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Bob" {...field} />
                </FormControl>
                <FormDescription>Use your real name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <b>Last Name / Initial</b>
                </FormLabel>
                <FormControl>
                  <Input placeholder="B" {...field} />
                </FormControl>
                <FormDescription>
                  If you don{"'"}t want to use your full last name, you can use
                  your last initial
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <b>Email</b>
                </FormLabel>
                <FormControl>
                  <Input placeholder="bob@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <b>Password</b>
                </FormLabel>
                <FormControl>
                  <Input placeholder="****-****-****-****" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <b>Confirm Password</b>
                </FormLabel>
                <FormControl>
                  <Input placeholder="****-****-****-****" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="constructive">
            Register Account
          </Button>
        </form>
      </Form>
    </>
  );
}
