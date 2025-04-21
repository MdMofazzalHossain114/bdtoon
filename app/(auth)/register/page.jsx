"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { signUpSchema } from "@/lib/schema/signUpSchema";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    console.log("submitting", data);

    setSubmitting(true);
    try {
      const res = await axios.post("/api/auth/sign-up", data);
      alert("✅ Registration successful!");
      console.log(res);

      router.push(`/verify?q=${res.data.userId}`);
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      alert(`❌ ${msg}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {["username", "email", "firstname", "lastname", "password"].map(
          (field, i) => (
            <div key={i} className="mb-4">
              <label className="block text-sm font-medium capitalize mb-1">
                {field}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                {...register(field)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
              {errors[field] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field]?.message}
                </p>
              )}
            </div>
          )
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full disabled:bg-gray-500 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {submitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
