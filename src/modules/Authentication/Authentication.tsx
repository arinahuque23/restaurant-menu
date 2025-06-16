"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Authentication() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); 
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login successful!");
        setTimeout(() => router.push(redirectPath), 1000);
      } else {
        // Register
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Optional: Save phone number in user profile displayName or via Firestore (this is simple demo)
        if (userCredential.user) {
          await updateProfile(userCredential.user, { 
            displayName: phone || "" 
          });
        }

        toast.success("Registration successful!");
        setIsLogin(true); 
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-yellow-100 to-red-100 px-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-yellow-300">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          {isLogin ? "Restaurant Login" : "Create an Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 placeholder:text-black"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Show phone input only in registration mode */}
          {!isLogin && (
            <input
              type="tel"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 placeholder:text-black"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          )}

          <input
            type="password"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 placeholder:text-black"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-semibold transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-700">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-red-500 hover:underline font-medium"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
