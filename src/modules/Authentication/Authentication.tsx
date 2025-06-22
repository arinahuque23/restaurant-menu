"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";

export default function Authentication() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirectTo, setRedirectTo] = useState("/");
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    const redirect = searchParams.get("redirect");
    if (redirect) {
      setRedirectTo(redirect);
    }
  }, [searchParams]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful");
      router.replace(redirectTo);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });

      await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: userCredential.user.uid,
          email,
          phone,
          firstName,
          lastName,
        }),
      });

      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => {
        setIsLogin(true);
      }, 1000);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white px-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-yellow-300">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          {isLogin ? "Restaurant Login" : "Create an Account"}
        </h2>

        <form
          onSubmit={isLogin ? handleLogin : handleRegister}
          className="space-y-4"
        >
          <input
            type="email"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 text-black"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {!isLogin && (
            <>
              <input
                type="text"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 text-black"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />

              <input
                type="text"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 text-black"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />

              <input
                type="tel"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 text-black"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </>
          )}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-3 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 text-black"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

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
