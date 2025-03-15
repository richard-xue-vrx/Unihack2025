"use client"
import React from "react";
import { toast } from "sonner"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useUserData } from "@/context/UserDataContext";

import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  firstName: z.string().min(1, {
    message: "First name is required.",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required.",
  }),
  age: z.string().transform((value) => {
    const num = parseInt(value, 10);
    if (isNaN(num) || num < 0) {
      toast.error('Age must be positive')
    }
    return num;
  }),
  gender: z.enum(["m", "f"], {
    required_error: "Gender is required.",
  }),
  sexuality: z.string()
})

export default function Onboarding() {

  const router = useRouter();

  const context = useUserData();
  if (!context) return <div>Error: UserDataProvider is missing</div>;
  const { userData, setUserData } = context;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      // @ts-ignore
      age: "",
      gender: "m",
      sexuality: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    userData.email = values.email
    userData.first_name = values.firstName
    userData.last_name = values.lastName
    userData.age = values.age
    userData.gender = values.gender

    if (values.sexuality === "heterosexual") {
      // don't cancel us please, I just cant do conditional logic
      if (values.gender === "m") userData.sexuality = "f";
      if (values.gender === "f") userData.sexuality = "m";
    } else {
      userData.sexuality = values.gender
    }

    setUserData(userData);
    // This is our first set of questions
    router.push('/survey/personality');
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8">
      <div className="text-2xl">The boring stuff first 😴 ...</div>
      <Form {...form}>
        <form className="flex flex-col min-w-[360px] max-w-[480px] gap-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="off" placeholder="youre@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input autoComplete="off" placeholder="Super" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input autoComplete="off" placeholder="Cool" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input autoComplete="off" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <select {...field} className="border rounded-md p-2 ml-4">
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sexuality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Which one describes you best</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="heterosexual">heterosexual</SelectItem>
                    <SelectItem value="lesbian">lesbian</SelectItem>
                    <SelectItem value="gay">gay</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  This automatically places you in the relevant romantic pools, though any platonic matches will include all pools.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
