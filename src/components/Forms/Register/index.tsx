import React, { useEffect, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  Form,
  TextInput,
  InlineLoading,
  Button,
  FormGroup,
  RadioButtonGroup,
  RadioButton,
  ProgressIndicator,
  ProgressStep,
} from "carbon-components-react";
import { CustomButton } from "../../Buttons";
import styles from "./index.module.scss";
import isEmail from "validator/es/lib/isEmail";
import { Validation } from "../../Validation";
import { ValidationTooltip } from "../../ValidationTooltip";

import { buildPasswordConstraints } from "../../../utils";

const initialState = {
  email: {
    value: "",
    hasError: false,
    error: "",
    loading: false,
    success: false,
  },
  password: {
    value: "",
    hasError: false,
    error: "",
    loading: false,
    success: false,
  },
  // error: "",
  // isLoading: false,
  // isLoggedIn: false,
};

interface LoginState {
  email: {
    value: string;
    hasError: boolean;
    error: string;
    loading: boolean;
    success: boolean;
  };
  password: {
    value: string;
    hasError: boolean;
    error: string;
    loading: boolean;
    success: boolean;
  };
  // error: string;
  // isLoading: boolean;
  // isLoggedIn: boolean;
}

type LoginAction =
  | {
      type: "UPDATE_INPUT";
      field: string;
      payload: string;
      hasError: boolean;
      error: string;
      loading: boolean;
      success: boolean;
    }
  | {
      type: "LOADING";
      field: string;
      payload: string;
      hasError: boolean;
      error: string;
      loading: boolean;
      success: boolean;
    }
  | {
      type: "SUCCESS";
      field: string;
      payload: string;
      hasError: boolean;
      error: string;
      loading: boolean;
      success: boolean;
    }
  | {
      type: "ERROR";
      field: string;
      payload: string;
      hasError: boolean;
      error: string;
      loading: boolean;
      success: boolean;
    };

// type LoginAction = {
//   type: "UPDATE_INPUT";
//   field: string;
//   payload: string;
//   hasError: boolean;
//   error: string;
// };

// type ErrorAction = {
//   type: "Error";
//   field: string;
//   payload: string;
//   hasError: boolean;
//   error: string;
// }

const reducer = (state: LoginState, action: LoginAction) => {
  switch (action.type) {
    case "UPDATE_INPUT":
      return {
        ...state,
        [action.field]: {
          value: action.payload,
          hasError: action.hasError,
          error: action.error,
          loading: action.loading,
          success: action.success,
        },
      };
    case "LOADING":
      return {
        ...state,
        [action.field]: {
          field: action.field,
          value: action.payload,
          hasError: action.hasError,
          error: action.error,
          loading: action.loading,
          success: action.success,
        },
      };
    case "SUCCESS":
      return {
        ...state,
        [action.field]: {
          field: action.field,
          value: action.payload,
          hasError: action.hasError,
          error: action.error,
          loading: action.loading,
          success: action.success,
        },
      };
    case "ERROR":
      return {
        ...state,
        [action.field]: {
          field: action.field,
          value: action.payload,
          hasError: action.hasError,
          error: action.error,
          loading: action.loading,
          success: action.success,
        },
      };
    // case "login":
    //   return {
    //     ...state,
    //     isLoading: true,
    //     error: "",
    //   };
    // case "success":
    //   return {
    //     ...state,
    //     isLoggedIn: true,
    //   };
    // case "error":
    //   return {
    //     ...state,
    //     error: "Incorrect email or password!",
    //     isLoading: false,
    //     email: "",
    //     password: "",
    //   };
    default:
      return state;
  }
};

export const Register = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const passwordConstraints = buildPasswordConstraints(state.password.value);
  const [isOpen, setIsOpen] = useState(false);

  const history = useHistory();

  const { email } = state;
  // const { email, password, error } = state;

  useEffect(() => {
    // console.log(state.email);
    console.log(state.password);
    console.log("p constraints", passwordConstraints);
    // console.log(JSON.stringify(state, null, 4));
  }, [state]);

  const renderStatus = () => {
    const { loading, success } = state.email;

    if (loading) {
      return <InlineLoading className={`${styles.inlineLoading}`} />;
      // return <InlineLoading className="inline-loading" />;
    }
    if (!loading && success) {
      return (
        <InlineLoading
          className={`${styles.inlineLoading}`}
          status="finished"
        />
      );
    }
    if (!loading) {
      return null;
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <Form onSubmit={onSubmit} className={styles.formContainer}>
      <div className={styles.formInputContainer}>
        <TextInput
          id="email"
          className={styles.textInput}
          labelText="Email"
          name="email"
          size="xl"
          light={true}
          placeholder="Enter email"
          invalid={state.email.hasError}
          onChange={(evt) =>
            dispatch({
              type: "UPDATE_INPUT",
              field: evt.target.name,
              payload: evt.target.value,
              hasError: false,
              error: "",
              loading: false,
              success: false,
            })
          }
          onBlur={(evt) => {
            if (!isEmail(state.email.value)) {
              return dispatch({
                type: "ERROR",
                field: "email",
                payload: evt.target.value,
                hasError: true,
                error: "Must be a valid email addresss.",
                loading: false,
                success: false,
              });
            }
            setTimeout(() => {
              dispatch({
                type: "UPDATE_INPUT",
                field: "email",
                payload: evt.target.value,
                hasError: false,
                error: "",
                loading: false,
                success: true,
              });
            }, 1000);
            dispatch({
              type: "LOADING",
              field: "email",
              payload: evt.target.value,
              hasError: false,
              error: "",
              loading: true,
              success: false,
            });
          }}
          value={email.value}
        />
        {renderStatus()}
      </div>
      <div
        className={`${styles.passwordInputContainer} u-margin-t-06 u-margin-b-04`}
      >
        <TextInput.PasswordInput
          id="password"
          labelText="Password"
          name="password"
          light
          size="xl"
          placeholder="Enter password"
          onFocus={() => setIsOpen(true)}
          onBlur={(evt) => {
            setIsOpen(false);
            // TODO GOAL TO TOGGLE NEXT BUTTON if both email and password don't have errors
            // if (
            //   state.password.value.length > 0 &&
            //   passwordConstraints.forEach(
            //     ({ constraint }) => constraint === false
            //   )
            // ) {
            //   console.log("INSIDE OF IT");
            //   return dispatch({
            //     type: "ERROR",
            //     field: "password",
            //     payload: evt.target.value,
            //     hasError: true,
            //     error: "",
            //     loading: false,
            //     success: false,
            //   });
            // }
          }}
          onChange={(evt) =>
            dispatch({
              type: "UPDATE_INPUT",
              field: evt.target.name,
              payload: evt.target.value,
              hasError: false,
              error: "",
              loading: false,
              success: false,
            })
          }
          value={state.password.value}
        />
        <Validation
          constraints={passwordConstraints}
          password={state.password.value}
        />
        <ValidationTooltip constraints={passwordConstraints} open={isOpen} />
      </div>
      <div className="u-margin-b-06"></div>
      <FormGroup legendText="">
        <RadioButtonGroup
          className={styles.radioButtonGroup}
          defaultSelected="company"
          name="account-type"
          valueSelected="company"
          orientation="horizontal"
        >
          <RadioButton
            id="radio-1"
            labelText="Company account"
            value="company"
          />
          <RadioButton
            id="radio-2"
            labelText="Personal account"
            value="personal"
          />
        </RadioButtonGroup>
      </FormGroup>

      <Button
        disabled={
          state.email.success === true && state.password.success === true
            ? false
            : true
        }
        className={styles.formButton}
      >
        Next
      </Button>
      {/* <CustomButton
        onClick={(evt) => {
          evt.preventDefault();
          console.log("text");
        }}
      /> */}
    </Form>
  );
};
