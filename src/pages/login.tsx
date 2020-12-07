import React from "react";
import { useForm } from "react-hook-form";

interface IForm {
  email?: string;
  password?: string;
}

export const Login = () => {
  const { register, getValues, errors, handleSubmit } = useForm<IForm>();
  const onSubmit = () => {
    console.log(getValues());
  };

  return (
    <div className=" h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-md py-8 text-center rounded">
        <h3 className="text-gray-800 text-2xl">Log In</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 px-5 mt-7"
        >
          <input
            ref={register({
              required: "Email is required",
            })}
            name="email"
            type="email"
            required
            placeholder="email"
            className="input"
          />
          {errors.email?.message && (
            <span className="font-medium text-red-600">
              {errors.email.message}
            </span>
          )}
          <input
            ref={register({
              required: "Password is required",
              minLength: 8,
            })}
            name="password"
            type="password"
            required
            placeholder="password"
            className="input"
          />
          {errors.password?.message && (
            <span className="font-medium text-red-600">
              {errors.password?.message}
            </span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="font-medium text-red-600">
              Password can be more than or equal 8 chars
            </span>
          )}
          <button className="btn">Log In</button>
        </form>
      </div>
    </div>
  );
};
