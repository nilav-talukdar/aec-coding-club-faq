import { TriangleAlert } from "lucide-react";

export default function Error({ message }: { message: string }) {
  return (
    <div
      className="p-4 max-w-2xl flex justify-start items-center gap-x-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <span className="font-medium max-sm:hidden">
        <TriangleAlert />
      </span>{" "}
      {message}
    </div>
  );
}
