"use client"

import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="text-center">
        <h1 className="animate-bounce text-8xl font-extrabold text-red-600">
          404
        </h1>

        <p className="mt-3 max-w-md text-gray-500">
          يبدو أن الصفحة التي تبحث عنها تم حذفها أو نقلها أو أن الرابط غير
          صحيح.
        </p>

        <div className="mt-4">
          <svg
            className="mx-auto h-72 w-72 animate-pulse"
            viewBox="0 0 512 512"
            fill="none"
          >
            <circle
              cx="256"
              cy="256"
              r="200"
              fill="#FDE68A"
            />

            <path
              d="M180 170L140 240H220L180 170Z"
              fill="#DC2626"
            />

            <path
              d="M332 170L292 240H372L332 170Z"
              fill="#DC2626"
            />

            <circle
              cx="180"
              cy="270"
              r="20"
              fill="#111827"
            />

            <circle
              cx="332"
              cy="270"
              r="20"
              fill="#111827"
            />

            <path
              d="M190 360C210 330 300 330 322 360"
              stroke="#111827"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          العودة للرئيسية
        </Link>
      </div>
    </main>
  );
}