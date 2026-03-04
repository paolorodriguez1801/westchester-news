import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 text-center">
      <h1 className="text-6xl font-extrabold text-navy mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block bg-accent text-white font-semibold px-6 py-3 rounded-md hover:bg-accent-dark transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
