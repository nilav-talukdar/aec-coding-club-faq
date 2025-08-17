"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, Command, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { AuroraText } from "@/components/magicui/aurora-text";
import { TextAnimate } from "@/components/magicui/text-animate";
import { motion } from "motion/react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export default function Home() {
  const [message, setMessage] = useState<string>("");

  const sendMessage = async (msg: string) => {
    const res = await axios.post("/api/send-message", { message: msg });
    return res;
  };

  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      setMessage("");
      toast.success("Message sent successfully");
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        toast.error("Too many requests");
      } else {
        toast.error("Failed to send message");
      }
    },
  });

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!message.trim() || mutation.isPending) return;
    mutation.mutate(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="p-4 bg-white relative min-h-screen max-w-screen overflow-x-hidden">
      <div className="max-w-4xl mx-auto my-24">
        <div className="mt-12 w-full flex flex-col justify-center items-center">
          <Image
            src="/cclogo.png"
            height={72}
            width={72}
            alt="logo"
            className="bg-white animate-in"
          />
          <h1 className="text-center text-3xl font-bold font-mono sm:text-5xl text-neutral-600">
            Welcome to <AuroraText>AEC Coding Club</AuroraText>
          </h1>
          <TextAnimate className="text-xl sm:text-2xl my-6 font-mono text-center text-neutral-500 font-medium">
            Post your doubts and questions here
          </TextAnimate>
        </div>
        <motion.div
          className="relative max-w-2xl mx-auto my-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div
            className="absolute inset-0 z-0 rounded-2xl pointer-events-none"
            style={{
              filter: "blur(16px)",
              background: "linear-gradient(135deg, #a5b4fc 0%, #f472b6 100%)",
              opacity: 0.7,
            }}
          />
          <form onSubmit={handleSend}>
            <Textarea
              className="min-h-[150px] rounded-xl relative z-10 bg-white backdrop-blur p-4 placeholder:font-extralight placeholder:text-base"
              placeholder="Drop your question here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              size="sm"
              className="rounded-lg absolute right-3 z-20 bottom-3"
              type="submit"
              disabled={mutation.isPending || !message.trim()}
            >
              {mutation.isPending ? (
                <Loader className="animate-spin text-white" size={16} />
              ) : (
                <ArrowUp />
              )}
            </Button>
          </form>
          {/* Enter to submit badge */}
          <div className="absolute left-3 bottom-3 z-20 flex items-center gap-1 backdrop-blur px-2 py-1 rounded-md border border-neutral-200 shadow-xs text-xs font-light text-neutral-500 bg-neutral-50">
            <Command className="w-3 h-3 mr-1 font-extralight" />
            Enter to submit
          </div>
        </motion.div>
      </div>
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />
    </section>
  );
}
