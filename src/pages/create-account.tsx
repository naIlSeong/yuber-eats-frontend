import React from "react";
import { Helmet } from "react-helmet-async";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import yuberLogo from "../images/logo.svg";
import { UserRole } from "../__generated__/globalTypes";
import {
  createAccount,
  createAccountVariables,
} from "../__generated__/createAccount";

const CREATE_ACCOUNT = gql`
  mutation createAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
      ok
      error
    }
  }
`;

interface IForm {
  email: string;
  password: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    formState,
  } = useForm<IForm>({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Client,
    },
  });

  const history = useHistory();

  const onCompleted = (data: createAccount) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      history.push("/");
    }
  };

  const [
    createAccountMutation,
    { data: createAccountOutput, loading },
  ] = useMutation<createAccount, createAccountVariables>(CREATE_ACCOUNT, {
    onCompleted,
  });

  const onSubmit = () => {
    const { email, password, role } = getValues();
    if (!loading) {
      createAccountMutation({
        variables: {
          input: {
            email,
            password,
            role,
          },
        },
      });
    }
  };

  return (
    <div className=" h-screen flex flex-col items-center mt-8 lg:mt-24">
      <Helmet>
        <title>Create Account | Yuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={yuberLogo} alt="logo" className="w-48 mb-10 lg:mb-16" />
        <h4 className="text-gray-800 text-3xl w-full ">Let's get started</h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-7 w-full"
        >
          <input
            ref={register({
              required: "Email is required",
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
          {errors.email?.type === "pattern" && (
            <FormError errorMessage={"Invalid email"} />
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
          <select
            ref={register({ required: true })}
            name="role"
            className="input"
          >
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"Create Account"}
          />
          {createAccountOutput?.createAccount.error && (
            <FormError errorMessage={createAccountOutput.createAccount.error} />
          )}
        </form>
        <div>
          <h5 className="pt-4 font-light">
            Already use Nuber?{" "}
            <Link to="/" className="text-lime-600  hover:underline">
              Log in
            </Link>{" "}
          </h5>
        </div>
      </div>
    </div>
  );
};
