import React, { createContext, useReducer } from "react";

const initialState = {
  name: "payment",
  creditCard: {
    value: "",
    hasError: false,
    error: "",
    loading: false,
    success: false,
  },
  expiration: {
    value: "",
    hasError: false,
    error: "",
    loading: false,
    success: false,
  },
  cvv: {
    value: "",
    hasError: false,
    error: "",
    loading: false,
    success: false,
  },
  companyName: {
    value: "",
    hasError: false,
    error: "",
    loading: false,
    success: false,
  },
  firstname: {
    value: "",
    hasError: false,
    error: "",
    loading: false,
    success: false,
  },
  lastname: {
    value: "",
    hasError: false,
    error: "",
    loading: false,
    success: false,
  },
  address01: {
    value: "",
    hasError: false,
    error: "",
    loading: false,
    success: false,
  },
  address02: {
    value: "",
    hasError: false,
    error: "",
    loading: false,
    success: false,
  },
  city: {
    value: "",
    hasError: false,
    error: "",
    loading: false,
    success: false,
  },
  zipcode: {
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
  fieldError: (evt: React.ChangeEvent<HTMLInputElement>): void => {},
  setLoading: (evt: React.ChangeEvent<HTMLInputElement>): void => {},
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
    case "FIELD_ERROR":
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
      type: "FIELD_ERROR";
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
  creditCard: {
    value: string;
    hasError: boolean;
    error: string;
    loading: boolean;
    success: boolean;
  };
  expiration: {
    value: string;
    hasError: boolean;
    error: string;
    loading: boolean;
    success: boolean;
  };
  cvv: {
    value: string;
    hasError: boolean;
    error: string;
    loading: boolean;
    success: boolean;
  };
  companyName: {
    value: string;
    hasError: boolean;
    error: string;
    loading: boolean;
    success: boolean;
  };
  firstname: {
    value: string;
    hasError: boolean;
    error: string;
    loading: boolean;
    success: boolean;
  };
  lastname: {
    value: string;
    hasError: boolean;
    error: string;
    loading: boolean;
    success: boolean;
  };
  address01: {
    value: string;
    hasError: boolean;
    error: string;
    loading: boolean;
    success: boolean;
  };
  address02: {
    value: string;
    hasError: boolean;
    error: string;
    loading: boolean;
    success: boolean;
  };
  city: {
    value: string;
    hasError: boolean;
    error: string;
    loading: boolean;
    success: boolean;
  };
  zipcode: {
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

export const PaymentContext = createContext(initialState);

export const PaymentContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <PaymentContext.Provider
      value={{
        name: state.name,
        creditCard: {
          value: state.creditCard.value,
          hasError: state.creditCard.hasError,
          error: state.creditCard.error,
          loading: state.creditCard.loading,
          success: state.creditCard.success,
        },
        expiration: {
          value: state.expiration.value,
          hasError: state.expiration.hasError,
          error: state.expiration.error,
          loading: state.expiration.loading,
          success: state.expiration.success,
        },
        cvv: {
          value: state.cvv.value,
          hasError: state.cvv.hasError,
          error: state.cvv.error,
          loading: state.cvv.loading,
          success: state.cvv.success,
        },
        companyName: {
          value: state.companyName.value,
          hasError: state.companyName.hasError,
          error: state.companyName.error,
          loading: state.companyName.loading,
          success: state.companyName.success,
        },
        firstname: {
          value: state.firstname.value,
          hasError: state.firstname.hasError,
          error: state.firstname.error,
          loading: state.firstname.loading,
          success: state.firstname.success,
        },
        lastname: {
          value: state.lastname.value,
          hasError: state.lastname.hasError,
          error: state.lastname.error,
          loading: state.lastname.loading,
          success: state.lastname.success,
        },
        address01: {
          value: state.address01.value,
          hasError: state.address01.hasError,
          error: state.address01.error,
          loading: state.address01.loading,
          success: state.address01.success,
        },
        address02: {
          value: state.address02.value,
          hasError: state.address02.hasError,
          error: state.address02.error,
          loading: state.address02.loading,
          success: state.address02.success,
        },
        city: {
          value: state.city.value,
          hasError: state.city.hasError,
          error: state.city.error,
          loading: state.city.loading,
          success: state.city.success,
        },
        zipcode: {
          value: state.zipcode.value,
          hasError: state.zipcode.hasError,
          error: state.zipcode.error,
          loading: state.zipcode.loading,
          success: state.zipcode.success,
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
            error: "Must be a valid credit card number.",
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
        fieldError: (evt): void =>
          dispatch({
            type: "FIELD_ERROR",
            field: evt.target.name,
            payload: evt.target.value,
            hasError: false,
            error: "",
            loading: false,
            success: false,
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
    </PaymentContext.Provider>
  );
};
