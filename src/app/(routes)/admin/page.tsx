"use client";
import LogoutButton from "@/components/auth/logout-button";
import Card from "@/components/shared/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "lucide-react";

export default function AdminPage() {
  const query = useQuery({
    queryKey: ["message"],
    queryFn: async () => {
      const result = await axios.get("/api/message/get-messages");
      return result.data;
    },
  });

  return (
    <section>
      <h1>Admin</h1>
      <LogoutButton />
      <div className="my-6">
        <p className="text-2xl font-medium text-neutral-600">FAQs</p>
        {query.isLoading ? (
          <div className="my-6">
            <Loader className="text-blue-500 animate-spin" size={24} />
          </div>
        ) : (
          <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(query.data ?? []).map(
              (item: { _id: string; message: string }, index: number) => (
                <Card
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
