import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";

const LOGIN_MUTATION = gql`
  mutation loginMutation($LoginInput: LoginInput!) {
    login(input: $LoginInput) {
      ok
      error
      token
    }
  }
`;

interface IForm {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, getValues, errors, handleSubmit } = useForm<IForm>();

  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      console.log(token);
    }
  };

  const [loginMutation, { data: loginMutationOutput, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, { onCompleted });

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          LoginInput: {
            email,
            password,
          },
        },
      });
    }
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
            <FormError errorMessage={errors.email.message} />
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
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError
              errorMessage={"Password can be more than or equal 8 chars"}
            />
          )}
          <button className="btn">{loading ? "Loading..." : "Log In"}</button>
          {loginMutationOutput?.login.error && (
            <FormError errorMessage={loginMutationOutput.login.error} />
          )}
        </form>
      </div>
    </div>
  );
};
