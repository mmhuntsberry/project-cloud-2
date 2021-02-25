import React, { createContext, useReducer } from "react";

const initialState = {
  code: {
    value: "",
    hasError: false,
    error: "",
    loading: false,
    success: false,
  },
  isFormValid: {
    success: false,
  },
  isFormToggled: false,
  updateInput: (evt: React.ChangeEvent<HTMLInputElement>): void => {},
  checkError: (evt: React.ChangeEvent<HTMLInputElement>): void => {},
  fieldSuccess: (evt: React.ChangeEvent<HTMLInputElement>): void => {},
  formSuccess: (): void => {},
  formEdit: (): void => {},
  setIsToggled: (payload: boolean): void => {},
};

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
    case "FIELD_SUCCESS":
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
    case "FORM_SUCCESS":
      return {
        ...state,
        [action.field]: {
          success: action.success,
        },
      };
    case "FORM_EDIT":
      return {
        ...state,
        [action.field]: {
          success: action.success,
        },
      };
    case "TOGGLE_FORM":
      return {
        ...state,
        [action.field]: action.payload,
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
    default:
      return state;
  }
};

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
      type: "FIELD_SUCCESS";
      field: string;
      payload: string;
      hasError: boolean;
      error: string;
      loading: boolean;
      success: boolean;
    }
  | {
      type: "FORM_SUCCESS";
      field: string;
      success: boolean;
    }
  | {
      type: "FORM_EDIT";
      field: string;
      success: boolean;
    }
  | {
      type: "TOGGLE_FORM";
      field: string;
      payload: boolean;
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

interface LoginState {
  code: {
    value: string;
    hasError: boolean;
    error: string;
    loading: boolean;
    success: boolean;
  };
  isFormValid: {
    success: boolean;
  };
  isFormToggled: boolean;
}

export const VerifyContext = createContext(initialState);

export const VerifyContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <VerifyContext.Provider
      value={{
        code: {
          value: state.code.value,
          hasError: state.code.hasError,
          error: state.code.error,
          loading: state.code.loading,
          success: state.code.success,
        },
        isFormValid: {
          success: state.isFormValid.success,
        },
        isFormToggled: state.isFormToggled,

        updateInput: (evt): void =>
          dispatch({
            type: "UPDATE_INPUT",
            field: evt.target.name,
            payload: evt.target.value,
            hasError: false,
            error: "",
            loading: false,
            success: false,
          }),
        checkError: (evt): void =>
          dispatch({
            type: "ERROR",
            field: evt.target.name,
            payload: evt.target.value,
            hasError: true,
            error: "Must be a valid email address.",
            loading: false,
            success: false,
          }),
        fieldSuccess: (evt): void =>
          dispatch({
            type: "FIELD_SUCCESS",
            field: evt.target.name,
            payload: evt.target.value,
            hasError: false,
            error: "",
            loading: false,
            success: true,
          }),
        formSuccess: (): void =>
          dispatch({
            type: "FORM_SUCCESS",
            field: "isFormValid",
            success: true,
          }),
        formEdit: (): void =>
          dispatch({
            type: "FORM_EDIT",
            field: "isFormValid",
            success: false,
          }),
        setIsToggled: (payload): void =>
          dispatch({
            type: "TOGGLE_FORM",
            field: "isFormToggled",
            payload,
          }),
      }}
    >
      {children}
    </VerifyContext.Provider>
  );
};
