"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { editProfile, resetProfileData } from "./actions";

export default function ProfileForm() {
  const formSchema = z.object({
    fullName: z.string().trim().min(1, "Full name is required"),
    birthDate: z
      .string()
      .nonempty("Birthday is required")
      .refine(
        (value) => {
          // Check for valid date format
          const date = new Date(value);
          return !isNaN(date.getTime());
        },
        {
          message: "Invalid date format",
        },
      ),
    phoneNumber: z.string().min(1, "Phone number is required"),
    email: z.string().email({
      message: "Invalid email",
    }),
    address: z.string().min(1, "Address is required"),
    aboutMe: z.string().min(1, "About me is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      birthDate: "",
      phoneNumber: "",
      email: "",
      address: "",
      aboutMe: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key as keyof typeof values] as string);
      }

      const result = await editProfile(formData);

      if (result.ok) {
        alert("Profile updated successfully");
      } else {
        console.error(result);
        alert("An error occurred while updating the profile");
      }
    } catch (e) {
      console.error(e);
      alert("A network error occurred");
    }
  }

  async function handleReset() {
    try {
      const result = await resetProfileData();

      if (result.ok) {
        alert("Profile updated successfully");
      } else {
        console.error(result);
        alert("An error occurred while updating the profile");
      }
    } catch (e) {
      console.error(e);
      alert("A network error occured");
    }
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)} // Use handleSubmit from react-hook-form
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of</FormLabel>
              <FormControl>
                <Input type="date" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aboutMe"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About me</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update Profile</Button>
        <Button type="reset">Reset</Button>
      </form>
    </FormProvider>
  );
}
