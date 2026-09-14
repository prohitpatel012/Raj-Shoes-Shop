
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-lg">
        <div className="mb-6 text-7xl font-extrabold text-gray-200">
          404
        </div>

        <h2 className="mb-3 text-2xl font-bold text-gray-900">
          Page Not Found
        </h2>

        <p className="mb-8 text-gray-500">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>

        <Link
          href="/"
          className="inline-flex rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 hover:shadow-md"
        >
          ← Return Home
        </Link>
      </div>
    </div>
  );
}

