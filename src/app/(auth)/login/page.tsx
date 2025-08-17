"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

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
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const result = await signIn("credentials", {
        redirect: false,
        username: values.username,
        password: values.password,
      });
      if (result?.ok) {
        form.reset();
        router.push("/admin");
      }
      if (result?.error) {
        toast(result.error);
      }
    },
    onError: (error) => {
      console.log(error);
      toast("Failed to login");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  };

  return (
    <section className="my-6 mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Admin Username" {...field} type="text" />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Admin Password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="secondary"
            className="bg-blue-500 w-full"
            disabled={mutation.isPending}
          >
            {mutation?.isPending ? (
              <Loader className="animate-spin" size={16} color="white" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
}
