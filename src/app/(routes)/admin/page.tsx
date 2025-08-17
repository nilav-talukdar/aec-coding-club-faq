import LogoutButton from "@/components/auth/logout-button";
import Card from "@/components/shared/card";

export default function AdminPage() {
  return (
    <section>
      <h1>Admin</h1>
      <LogoutButton />
      <div className="my-6">
        <p className="text-2xl font-medium text-neutral-600">FAQs</p>
        <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </section>
  );
}
