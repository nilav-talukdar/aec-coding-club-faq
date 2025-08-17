import { Trash } from "lucide-react";

interface CardProps {
  message: string;
  serial: number;
}

export default function Card({ message, serial }: CardProps) {
  return (
    <div className="p-4 text-base sm:text-lg rounded-lg shadow-sm border">
      <div className="w-full flex justify-between items-center text-sm font-light text-neutral-400">
        <p>Question: {serial}</p>
        <Trash size={16} className="text-red-500 cursor-pointer" />
      </div>
      <div className="text-lg text-neutral-600 my-2">
        <p>{message}</p>
      </div>
    </div>
  );
}
