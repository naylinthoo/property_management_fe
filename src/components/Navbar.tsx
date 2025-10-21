"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-50 mb-4">
      <Link href="/" className="text-xl font-bold text-gray-800">
        NOSBAAN
      </Link>
    </nav>
  );
}
