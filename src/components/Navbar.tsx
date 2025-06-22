"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import userAvatar from "../../public/assests/img/review1.png";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [admin, setAdmin] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const res = await fetch(
            `http://localhost:5000/api/user/${currentUser.uid}`
          );

          const contentType = res.headers.get("content-type");
          if (!res.ok || !contentType?.includes("application/json")) {
            throw new Error("Invalid response");
          }

          const data = await res.json();
          setAdmin(data?.role === "admin");
        } catch (err) {
          console.error("Failed to fetch user role:", err);
          setAdmin(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setAdmin(false);
    setDropdownOpen(false);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-orange-600">
              Tasty Bites
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`${
                isActive("/") ? "text-orange-600" : "text-gray-700"
              } hover:text-orange-600`}
            >
              Home
            </Link>
            <Link
              href="/menu"
              className={`${
                isActive("/menu") ? "text-orange-600" : "text-gray-700"
              } hover:text-orange-600`}
            >
              Menu
            </Link>
            <Link
              href="/add-menu"
              className={`${
                isActive("/add-menu") ? "text-orange-600" : "text-gray-700"
              } hover:text-orange-600`}
            >
              Add Menu
            </Link>

            <div className="flex items-center space-x-4 relative">
              <Search size={20} className="text-orange-500" />

              {user ? (
                <div className="relative">
                  <Image
                    src={userAvatar}
                    alt="User"
                    width={32}
                    height={32}
                    className="rounded-full cursor-pointer border border-orange-500"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  />
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-md z-10">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-orange-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      {admin && (
                        <Link
                          href="/dashboard"
                          className="block px-4 py-2 text-gray-700 hover:bg-orange-100"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className="text-orange-500">
                  <User size={20} />
                </Link>
              )}
              {user && (
                <p className="text-gray-700 hover:text-orange-600">
                  {user.displayName || "Dashboard"}
                </p>
              )}

              <button className="relative text-orange-500">
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-orange-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
