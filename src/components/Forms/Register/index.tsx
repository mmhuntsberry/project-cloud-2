import React, { useEffect, useReducer, useState, useContext } from "react";
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
import { Edit20 } from "@carbon/icons-react";
import { CustomButton } from "../../Buttons";
import styles from "./index.module.scss";
import isEmail from "validator/es/lib/isEmail";
import { Validation } from "../../Validation";
import { ValidationTooltip } from "../../ValidationTooltip";
import { RegisterContext } from "../../../contexts/RegisterContext";

import { buildPasswordConstraints } from "../../../utils";
import { strict } from "node:assert";

// const initialState = {
//   email: {
//     value: "",
//     hasError: false,
//     error: "",
//     loading: false,
//     success: false,
//   },
//   password: {
//     value: "",
//     hasError: false,
//     error: "",
//     loading: false,
//     success: false,
//   },
//   accountType: {
//     value: "company",
//   },
//   isFormValid: {
//     success: false,
//   },
//   // error: "",
//   // isLoading: false,
//   // isLoggedIn: false,
// };

// interface LoginState {
//   email: {
//     value: string;
//     hasError: boolean;
//     error: string;
//     loading: boolean;
//     success: boolean;
//   };
//   password: {
//     value: string;
//     hasError: boolean;
//     error: string;
//     loading: boolean;
//     success: boolean;
//   };
//   accountType: {
//     value: string;
//   };
//   isFormValid: {
//     success: boolean;
//   };
//   // error: string;
//   // isLoading: boolean;
//   // isLoggedIn: boolean;
// }

// type LoginAction =
//   | {
//       type: "UPDATE_INPUT";
//       field: string;
//       payload: string;
//       hasError: boolean;
//       error: string;
//       loading: boolean;
//       success: boolean;
//     }
//   | {
//       type: "LOADING";
//       field: string;
//       payload: string;
//       hasError: boolean;
//       error: string;
//       loading: boolean;
//       success: boolean;
//     }
//   | {
//       type: "ACCOUNT_TYPE";
//       field: string;
//       payload: string;
//     }
//   | {
//       type: "FIELD_SUCCESS";
//       field: string;
//       payload: string;
//       hasError: boolean;
//       error: string;
//       loading: boolean;
//       success: boolean;
//     }
//   | {
//       type: "FORM_SUCCESS";
//       field: string;
//       success: boolean;
//     }
//   | {
//       type: "ERROR";
//       field: string;
//       payload: string;
//       hasError: boolean;
//       error: string;
//       loading: boolean;
//       success: boolean;
//     };

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

// const reducer = (state: LoginState, action: LoginAction) => {
//   switch (action.type) {
//     case "UPDATE_INPUT":
//       return {
//         ...state,
//         [action.field]: {
//           value: action.payload,
//           hasError: action.hasError,
//           error: action.error,
//           loading: action.loading,
//           success: action.success,
//         },
//       };
//     case "LOADING":
//       return {
//         ...state,
//         [action.field]: {
//           field: action.field,
//           value: action.payload,
//           hasError: action.hasError,
//           error: action.error,
//           loading: action.loading,
//           success: action.success,
//         },
//       };
//     case "ACCOUNT_TYPE":
//       return {
//         ...state,
//         [action.field]: {
//           field: action.field,
//           value: action.payload,
//         },
//       };
//     case "FIELD_SUCCESS":
//       return {
//         ...state,
//         [action.field]: {
//           field: action.field,
//           value: action.payload,
//           hasError: action.hasError,
//           error: action.error,
//           loading: action.loading,
//           success: action.success,
//         },
//       };
//     case "FORM_SUCCESS":
//       return {
//         ...state,
//         [action.field]: {
//           success: action.success,
//         },
//       };
//     case "ERROR":
//       return {
//         ...state,
//         [action.field]: {
//           field: action.field,
//           value: action.payload,
//           hasError: action.hasError,
//           error: action.error,
//           loading: action.loading,
//           success: action.success,
//         },
//       };
//     // case "login":
//     //   return {
//     //     ...state,
//     //     isLoading: true,
//     //     error: "",
//     //   };
//     // case "success":
//     //   return {
//     //     ...state,
//     //     isLoggedIn: true,
//     //   };
//     // case "error":
//     //   return {
//     //     ...state,
//     //     error: "Incorrect email or password!",
//     //     isLoading: false,
//     //     email: "",
//     //     password: "",
//     //   };
//     default:
//       return state;
//   }
// };

export const Register = () => {
  const context = useContext(RegisterContext);
  const {
    email,
    password,
    isFormValid,
    accountType,
    updateInput,
    checkError,
    fieldSuccess,
    setLoading,
    updateAccountType,
    formSuccess,
    formEdit,
  } = context;
  // const [state, dispatch] = useReducer(reducer, initialState);
  const passwordConstraints = buildPasswordConstraints(password.value);
  const [isOpen, setIsOpen] = useState(false);

  const history = useHistory();

  // const { email, password, error } = state;

  useEffect(() => {
    console.log(email);
    console.log(password);
    console.log(context);
    // console.log(JSON.stringify(state, null, 4));
  }, [isOpen]);

  const renderStatus = () => {
    const { loading, success } = email;

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
    <>
      {!isFormValid.success ? (
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
              invalid={email.hasError}
              onChange={
                updateInput
                // dispatch({
                //   type: "UPDATE_INPUT",
                //   field: evt.target.name,
                //   payload: evt.target.value,
                //   hasError: false,
                //   error: "",
                //   loading: false,
                //   success: false,
                // })
              }
              onBlur={(evt) => {
                if (!isEmail(email.value)) {
                  return checkError(evt);
                  // return dispatch({
                  //   type: "ERROR",
                  //   field: "email",
                  //   payload: evt.target.value,
                  //   hasError: true,
                  //   error: "Must be a valid email addresss.",
                  //   loading: false,
                  //   success: false,
                  // });
                }
                setTimeout(() => {
                  fieldSuccess(evt);
                  // dispatch({
                  //   type: "FIELD_SUCCESS",
                  //   field: "email",
                  //   payload: evt.target.value,
                  //   hasError: false,
                  //   error: "",
                  //   loading: false,
                  //   success: true,
                  // });
                }, 1000);
                // dispatch({
                //   type: "LOADING",
                //   field: "email",
                //   payload: evt.target.value,
                //   hasError: false,
                //   error: "",
                //   loading: true,
                //   success: false,
                // });
                setLoading(evt);
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

                if (passwordConstraints.some(({ constraint }) => !constraint)) {
                  console.log("INSIDE OF IT");
                  // return dispatch({
                  //   type: "ERROR",
                  //   field: "password",
                  //   payload: evt.target.value,
                  //   hasError: true,
                  //   error: "",
                  //   loading: false,
                  //   success: false,
                  // });
                  return checkError(evt);
                }
                fieldSuccess(evt);
                // dispatch({
                //   type: "FIELD_SUCCESS",
                //   field: "password",
                //   payload: evt.target.value,
                //   hasError: false,
                //   error: "",
                //   loading: false,
                //   success: true,
                // });
              }}
              onChange={(evt) =>
                // dispatch({
                //   type: "UPDATE_INPUT",
                //   field: evt.target.name,
                //   payload: evt.target.value,
                //   hasError: false,
                //   error: "",
                //   loading: false,
                //   success: false,
                // })
                updateInput(evt)
              }
              value={password.value}
            />
            <Validation
              constraints={passwordConstraints}
              password={password.value}
            />
            <ValidationTooltip
              constraints={passwordConstraints}
              open={isOpen}
            />
          </div>
          <div className="u-margin-b-06"></div>
          <FormGroup legendText="">
            <RadioButtonGroup
              className={styles.radioButtonGroup}
              defaultSelected="company"
              name="accountType"
              valueSelected={accountType.value}
              orientation="horizontal"
              onChange={(evt) => {
                // dispatch({
                //   type: "ACCOUNT_TYPE",
                //   field: "accountType",
                //   payload: String(evt),
                // });
                // TODO FIX
                // updateAccountType(evt);
              }}
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
              email.success === true && password.success === true ? false : true
            }
            className={styles.formButton}
            onClick={() => {
              // dispatch({
              //   type: "FORM_SUCCESS",
              //   field: "isFormValid",
              //   success: true,
              // });
              formSuccess();
            }}
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
      ) : (
        <div className={styles.formSuccessDetails}>
          <button
            className={styles.formSuccessEditButton}
            onClick={() => {
              formEdit();
              // dispatch({
              //   type: "FORM_SUCCESS",
              //   field: "isFormValid",
              //   success: false,
              // });
            }}
          >
            <Edit20 />
          </button>
          <p>{email.value}</p>
          <p>
            {password.value.split("").map((char) => (
              <span>&bull;</span>
            ))}
          </p>
          <p>{accountType.value}</p>
        </div>
      )}
    </>
  );
};
