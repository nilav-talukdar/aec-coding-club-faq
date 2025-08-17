export default function Loading() {
  return (
    <div
      className="animate-spin inline-block size-12 border-4 border-current border-t-transparent text-blue-600 rounded-full"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
