import Spinner from "@/components/ui/loading";

export default function Loading() {
  return (
    <section className="min-h-screen max-w-screen overflow-x-hidden flex justify-center items-center relative">
      <Spinner />
    </section>
  );
}
