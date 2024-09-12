"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import "../globals.css"

const formSchema = z.object({
    first_name: z.string().min(2, {
        message: "Minimum field length not achieved"
    }).max(100, {
        message: "Maximum field length achieved"
    }),
    last_name: z.string().min(2, {
        message: "Minimum field length not achieved"
    }).max(100, {
        message: "Maximum field length achieved"
    })
})

export default function Signup() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: "",
            last_name: ""
        }
    })

    // Handles submitting
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center mx-96 gap-y-5">
                <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel><b>First Name</b></FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your first name here" {...field} />
                            </FormControl>
                            <FormDescription>
                                Use your real name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel><b>Last Name / Initial</b></FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your last name or last initial here" {...field} />
                            </FormControl>
                            <FormDescription>
                                If you don{"'"}t want to use your full last name, you can use your last initial.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Create Account</Button>
            </form>
        </Form>
    )
}