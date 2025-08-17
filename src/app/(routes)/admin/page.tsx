"use client";
import Card from "@/components/shared/card";
import ClearButton from "@/components/shared/clear";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import Pusher from "pusher-js";
import Error from "@/components/error/error";

export default function AdminPage() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["message"],
    queryFn: async () => {
      const result = await axios.get("/api/message/get-messages");
      return result.data;
    },
  });

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });
    const channel = pusher.subscribe("messages");
    channel.bind("new-message", () => {
      queryClient.invalidateQueries({ queryKey: ["message"] });
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [queryClient]);

  return (
    <section>
      <ClearButton />
      <div className="my-6">
        <p className="text-2xl font-medium text-neutral-600">FAQs</p>
        {query.isError && (
          <div className="my-6">
            <Error message="Failed to fetch messages" />
          </div>
        )}
        {query.isLoading ? (
          <div className="my-6">
            <Loader className="text-blue-500 animate-spin" size={24} />
          </div>
        ) : Array.isArray(query.data) && query.data.length === 0 ? (
          <div className="my-6 text-start text-neutral-500">
            Oops, no messages are present at this moment
          </div>
        ) : (
          <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(query.data ?? []).map(
              (item: { _id: string; message: string }, index: number) => (
                <Card
                  messageId={item._id.toString()}
                  key={item._id}
                  message={item.message}
                  serial={index + 1}
                />
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
