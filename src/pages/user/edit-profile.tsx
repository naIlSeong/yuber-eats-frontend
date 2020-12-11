import { gql, useApolloClient, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { isLoggedInVar } from "../../apollo";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { LOCALSTORAGE_TOKEN } from "../../constant";
import { useMe } from "../../hooks/useMe";
import {
  editProfile,
  editProfileVariables,
} from "../../__generated__/editProfile";

const EDIT_PROFILE = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IForm {
  email?: string;
  password?: string;
}

export const EditProfile = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const history = useHistory();

  const {
    register,
    getValues,
    handleSubmit,
    formState,
    errors,
  } = useForm<IForm>({
    mode: "onChange",
    defaultValues: {
      email: userData?.me.email,
    },
  });

  const onCompleted = (data: editProfile) => {
    const {
      editProfile: { ok },
    } = data;

    if (ok && userData) {
      const {
        me: { email: prevEmail, id },
      } = userData;
      const { email: newEmail, password: newPassword } = getValues();

      if (ok && prevEmail !== newEmail) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment UpdatedUser on User {
              verified
              email
            }
          `,
          data: {
            verified: false,
            email: newEmail,
          },
        });
      }

      if (ok && newPassword) {
        localStorage.removeItem(LOCALSTORAGE_TOKEN);
        console.log(isLoggedInVar());
        isLoggedInVar(false);
        console.log(isLoggedInVar());
        history.push("/");
        window.location.reload(true);
      }
    }
  };

  const [editProfile, { loading, data: editProfileOutput }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE, { onCompleted });

  const onSubmit = () => {
    const { email, password } = getValues();
    if (userData?.me.email === email && !password) {
      return;
    }
    editProfile({
      variables: {
        input: {
          email,
          ...(password !== "" && { password }),
        },
      },
    });
  };

  return (
    <div className="mt-52 mx-auto max-w-screen-sm flex flex-col justify-center items-center">
      <Helmet>
        <title>Edit Profile | Yuber Eats</title>
      </Helmet>
      <h1 className="text-gray-800 text-3xl w-full">Edit Profile</h1>
      <form
        className=" grid gap-3 mt-7 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          ref={register({
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          className="input"
          type="email"
          name="email"
          placeholder="email"
        />
        {errors.email?.type === "pattern" && (
          <FormError errorMessage={"Invalid email"} />
        )}
        <input
          ref={register({
            minLength: 8,
          })}
          className="input"
          type="password"
          name="password"
          placeholder="password"
        />
        {errors.password?.type === "minLength" && (
          <FormError
            errorMessage={"Password can be more than or equal 8 chars"}
          />
        )}
        <Button
          canClick={formState.isValid}
          loading={loading}
          actionText={"Update"}
        />
        {editProfileOutput?.editProfile.error && (
          <FormError errorMessage={editProfileOutput.editProfile.error} />
        )}
      </form>
    </div>
  );
};
