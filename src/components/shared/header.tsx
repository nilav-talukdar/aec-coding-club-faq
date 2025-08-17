import LogoutButton from "../auth/logout-button";

export default function Header() {
  return (
    <header className="w-full flex justify-between p-4 items-center">
      <h2 className="text-xl text-neutral-600">Admin</h2>
      <LogoutButton />
    </header>
  );
}
