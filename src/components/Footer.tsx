import Link from "next/link";

const categories = [
  { name: "Public Safety", slug: "public-safety" },
  { name: "Local Government", slug: "local-government" },
  { name: "Education", slug: "education" },
  { name: "Business & Economy", slug: "business-economy" },
  { name: "Real Estate", slug: "real-estate" },
  { name: "Health", slug: "health" },
  { name: "Transportation", slug: "transportation" },
  { name: "Community", slug: "community" },
  { name: "Environment", slug: "environment" },
  { name: "Arts & Culture", slug: "arts-culture" },
  { name: "Sports", slug: "sports" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-gray-300 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">
              Westchester News Today
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted source for local news covering Westchester County,
              New York. Delivering the stories that matter to your community.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Categories
            </h4>
            <ul className="space-y-1.5">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              More
            </h4>
            <ul className="space-y-1.5">
              {categories.slice(6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Westchester News Today. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
