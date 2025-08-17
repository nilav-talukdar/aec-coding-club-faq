"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username is too short" })
    .max(50, { message: "Username is too long" }),
  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(50, { message: "Password is too long" }),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <section>
      <h1>Login</h1>
    </section>
  );
}
