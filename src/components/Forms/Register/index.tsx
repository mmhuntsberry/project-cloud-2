import React, { useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { Form, TextInput } from "carbon-components-react";
import { CustomButton } from "../../Buttons";
import styles from "./index.module.scss";

const initialState = {
  email: "",
  password: "",
  error: "",
  isLoading: false,
  isLoggedIn: false,
};

interface LoginState {
  email: string;
  password: string;
  error: string;
  isLoading: boolean;
  isLoggedIn: boolean;
}

type LoginAction =
  | { type: "login" | "success" | "error" }
  | { type: "UPDATE_INPUT"; field: string; payload: string };

const reducer = (state: LoginState, action: LoginAction) => {
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

export const Register = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  const { email, password, error } = state;

  useEffect(() => {
    console.log(state);
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <Form onSubmit={onSubmit} className={styles.formContainer}>
      <TextInput
        id="email"
        labelText="Email"
        name="email"
        size="xl"
        placeholder="Enter email"
        // invalid={true}
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
    </Form>
  );
};
