import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import yuberLogo from "../images/logo.svg";
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
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    formState,
  } = useForm<IForm>({
    mode: "onChange",
  });

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
    <div className=" h-screen flex flex-col items-center mt-8 lg:mt-24">
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={yuberLogo} alt="logo" className="w-48 mb-10 lg:mb-16" />
        <h4 className="text-gray-800 text-3xl w-full ">Welcome Back</h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-7 w-full"
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
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"Login"}
          />
          {loginMutationOutput?.login.error && (
            <FormError errorMessage={loginMutationOutput.login.error} />
          )}
        </form>
        <div>
          <h5 className="pt-4 font-light">
            New to Nuber?{" "}
            <Link
              to="/create-account"
              className="text-lime-600  hover:underline"
            >
              Create an account
            </Link>{" "}
          </h5>
        </div>
      </div>
    </div>
  );
};
