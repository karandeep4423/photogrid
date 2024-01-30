import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-screen-2xl m-auto">
      <div className=" flex flex-col items-center justify-center h-screen">
        <h1 className="mb-4 text-6xl font-semibold text-sky-600">404</h1>
        <p className="mb-4 text-lg text-gray-600">
          Oops! Looks like you are lost.
        </p>
        <div className="animate-bounce">
          <svg
            className="mx-auto h-16 w-16 text-sky-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </div>
        <p className="mt-4 text-gray-600">
          Let&#39;s get you back{" "}
          <Link href="/" className="text-sky-600 font-semibold">
            home
          </Link>
        </p>
      </div>
    </div>
  );
}
