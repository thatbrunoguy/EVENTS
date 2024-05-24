"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-primaryPurple text-white flex  items-center justify-center">
        <div className="mt-12">
          <div className="w-[90vw] h-[50vh] md:w-[50vw] flex flex-col items-center gap-6">
            <h2>Oops!! Something went wrong!</h2>

            <div className="flex items-center gap-6">
              <button
                className="h-12 min-w-20 px-4 hover:bg-red-600 text-primaryPurple bg-white grid place-content-center"
                onClick={() => reset()}
              >
                <p>Try again</p>
              </button>

              <Link
                className=" h-12 min-w-20 px-4 hover:bg-green-500 text-primaryPurple bg-white grid place-content-center"
                href="/"
              >
                <p>Go home</p>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
