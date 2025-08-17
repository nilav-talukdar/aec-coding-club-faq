import { Trash } from "lucide-react";

export default function Card() {
  return (
    <div className="p-4 text-base sm:text-lg rounded-lg shadow-sm border">
      <div className="w-full flex justify-between items-center text-sm font-light text-neutral-400">
        <p>Question 1</p>
        <Trash size={16} className="text-red-500" />
      </div>
      <div className="text-lg text-neutral-600 my-2">
        <p>is AI/ML really that difficult</p>
      </div>
    </div>
  );
}
