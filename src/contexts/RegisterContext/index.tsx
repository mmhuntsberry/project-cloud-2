import React, { createContext, useReducer, useEffect } from "react";

const initialState = {
  name: "register",
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
  accountType: {
    value: "company",
  },
  isFormValid: {
    success: false,
  },
  isFormToggled: false,
  updateInput: (evt: React.ChangeEvent<HTMLInputElement>): void => {},
  checkError: (evt: React.ChangeEvent<HTMLInputElement>): void => {},
  fieldSuccess: (evt: React.ChangeEvent<HTMLInputElement>): void => {},
  setLoading: (evt: React.ChangeEvent<HTMLInputElement>): void => {},
  updateAccountType: (val: number | string): void => {},
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
    case "ACCOUNT_TYPE":
      return {
        ...state,
        [action.field]: {
          field: action.field,
          value: action.payload,
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
      type: "LOADING";
      field: string;
      payload: string;
      hasError: boolean;
      error: string;
      loading: boolean;
      success: boolean;
    }
  | {
      type: "ACCOUNT_TYPE";
      field: string;
      payload: string;
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
  name: string;
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
  accountType: {
    value: string;
  };
  isFormValid: {
    success: boolean;
  };
  isFormToggled: boolean;
}

export const RegisterContext = createContext(initialState);

export const RegisterContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log("INSIDE OF REGISTER CONTEXT", state.isFormValid);
  }, [state]);
  return (
    <RegisterContext.Provider
      value={{
        name: state.name,
        email: {
          value: state.email.value,
          hasError: state.email.hasError,
          error: state.email.error,
          loading: state.email.loading,
          success: state.email.success,
        },
        password: {
          value: state.password.value,
          hasError: state.password.hasError,
          error: state.password.error,
          loading: state.password.loading,
          success: state.password.success,
        },
        accountType: {
          value: state.accountType.value,
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
        setLoading: (evt): void =>
          dispatch({
            type: "LOADING",
            field: evt.target.name,
            payload: evt.target.value,
            hasError: false,
            error: "",
            loading: true,
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
        updateAccountType: (evt): void =>
          dispatch({
            type: "ACCOUNT_TYPE",
            field: "accountType",
            payload: String(evt),
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
    </RegisterContext.Provider>
  );
};
