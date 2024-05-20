"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import React from "react";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();
  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("Please passwords be match");
    }
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      router.push("/auth/login");
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form action="" onSubmit={handleSubmit(onSubmit)} className="lg:w-1/4 w-3/4">
        <h1 className="  font-bold text-4xl mb-4">Register</h1>
        <label htmlFor="username" className="text-slate-500 mb-2 block">
          username
        </label>
        <input
          type="text"
          {...register("username", {
            required: "Your username is required",
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
        <label htmlFor="email" className="text-slate-500 mb-2 block">
          email
        </label>
        <input
          type="email"
          {...register("email", {
            required: "Your email is required",
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <label htmlFor="password" className="text-slate-500 mb-2 block">
          password
        </label>
        <input
          type="password"
          {...register("password", {
            required: "Your password is required",
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <label htmlFor="confirmPassword" className="text-slate-500 mb-2 block">
          confirmPassword
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
        <Button className="w-full bg-blue-500 text-white p-3 rounded-lg">Register</Button>
      </form>
    </div>
  );
}

export default RegisterPage;
