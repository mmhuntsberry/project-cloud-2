import React, { useState, useEffect, useReducer } from "react";
import { TextInput } from "carbon-components-react";
import { CustomButton } from "../../Buttons";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_INPUT":
      return {
        ...state,
        [action.field]: action.payload,
      };
    case "login":
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case "success":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "error":
      return {
        ...state,
        error: "Incorrect email or password!",
        isLoading: false,
        email: "",
        password: "",
      };
    default:
      return state;
  }
};

const initialState = {
  email: "",
  password: "",
  error: "",
  isLoading: false,
  isLoggedIn: false,
};

export const Register = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { email, password, login, success, error } = state;

  useEffect(() => {
    console.log(state);
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "login" });

    try {
      dispatch({ type: "success" });
    } catch (err) {
      dispatch({ type: "error" });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <TextInput
        id="email"
        labelText="Email"
        name="email"
        onChange={(evt) =>
          dispatch({
            type: "UPDATE_INPUT",
            field: evt.target.name,
            payload: evt.target.value,
          })
        }
        value={email}
      />
      <TextInput.PasswordInput
        id="password"
        labelText="Password"
        name="password"
        onChange={(evt) =>
          dispatch({
            type: "UPDATE_INPUT",
            field: evt.target.name,
            payload: evt.target.value,
          })
        }
        value={password}
      />
      <CustomButton
        onClick={(evt) => {
          evt.preventDefault();
          console.log("text");
        }}
      />
    </form>
  );
};
