import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { Lock } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/admin");
  }
  return (
    <div className="max-w-sm p-4 mx-auto my-24">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex justify-center items-center gap-4">
          <Button className="pointer-events-none" size="sm" variant="secondary">
            <Lock />
          </Button>
          <p className="text-2xl font-medium text-neutral-700 mb-1">
            Admin Panel
          </p>
        </div>
        <p className="text-sm text-center font-light text-neutral-500">
          Enter the admin credentials to continue
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
}
