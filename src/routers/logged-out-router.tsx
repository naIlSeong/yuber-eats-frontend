import React from "react";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  password: string;
}

export const LoggedOutRouter = () => {
  const { register, watch, handleSubmit, errors } = useForm<IForm>();
  const onSubmit = () => {
    console.log(watch());
  };
  const onInvalid = () => {
    console.log("Can't create account");
  };

  return (
    <div>
      <h1>Logged out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          <input
            ref={register({
              required: "This is required",
              pattern: /^[A-Za-z0-9]+@gmail.com$/,
              validate: (email: string) => email.includes("@gmail.com"),
            })}
            name="email"
            type="email"
            placeholder="email"
          />
          {errors.email?.message && (
            <span className="text-red-600 font-bold">
              {errors.email?.message}{" "}
            </span>
          )}
          {errors.email?.type === "pattern" && (
            <span className="text-red-600 font-bold">Only Gmail Allowed</span>
          )}
        </div>
        <div>
          <input
            ref={register({
              required: "This is required",
              validate: (password: string) => password.length >= 8,
            })}
            name="password"
            type="password"
            placeholder="password"
          />
        </div>
        <button className=" bg-green-800 text-white">SUBMIT</button>
      </form>
    </div>
  );
};
