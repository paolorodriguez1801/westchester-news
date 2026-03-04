import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "ellipsis")[] = [];

  pages.push(1);
  if (currentPage > 3) pages.push("ellipsis");
  for (
    let i = Math.max(2, currentPage - 1);
    i <= Math.min(totalPages - 1, currentPage + 1);
    i++
  ) {
    pages.push(i);
  }
  if (currentPage < totalPages - 2) pages.push("ellipsis");
  if (totalPages > 1) pages.push(totalPages);

  function pageUrl(page: number) {
    return page === 1 ? basePath : `${basePath}?page=${page}`;
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-10" aria-label="Pagination">
      {currentPage > 1 && (
        <Link
          href={pageUrl(currentPage - 1)}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Previous
        </Link>
      )}

      <div className="hidden sm:flex items-center gap-1">
        {pages.map((page, i) =>
          page === "ellipsis" ? (
            <span key={`e-${i}`} className="px-2 text-gray-400">
              &hellip;
            </span>
          ) : (
            <Link
              key={page}
              href={pageUrl(page)}
              className={`rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
                page === currentPage
                  ? "bg-navy text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </Link>
          )
        )}
      </div>

      <span className="sm:hidden text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages && (
        <Link
          href={pageUrl(currentPage + 1)}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Next
        </Link>
      )}
    </nav>
  );
}
