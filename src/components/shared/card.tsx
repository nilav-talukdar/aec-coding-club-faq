"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Trash } from "lucide-react";
import { toast } from "sonner";

interface CardProps {
  message: string;
  serial: number;
  messageId: string;
}

export default function Card({ message, serial, messageId }: CardProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-one-message"],
    mutationFn: async () => {
      await axios.delete(`/api/message/delete-message?messageId=${messageId}`);
    },
    onSuccess: () => {
      toast.success("Message deleted successfully");
      queryClient.refetchQueries({
        queryKey: ["message"],
      });
    },
    onError: (error) => {
      toast.error("Failed to delete message");
      console.log(error);
    },
  });
  return (
    <div className="p-4 text-base sm:text-lg rounded-lg shadow-sm border">
      <div className="w-full flex justify-between items-center text-sm font-light text-neutral-400">
        <p>Question: {serial}</p>
        <button disabled={mutation.isPending} onClick={() => mutation.mutate()}>
          <Trash size={16} className="text-red-500 cursor-pointer" />
        </button>
      </div>
      <div className="text-lg text-neutral-600 my-2">
        <p>{message}</p>
      </div>
    </div>
  );
}
