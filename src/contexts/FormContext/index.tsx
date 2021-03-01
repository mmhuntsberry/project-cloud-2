import React, { useReducer } from "react";

export enum FORMSTATUS {
  REGISTER = "register",
  VERIFY = "verify",
  PAYMENT = "payment",
  COMPLETE = "complete",
}

const initialState = {
  activeForm: FORMSTATUS.REGISTER,
  setActiveForm: (payload: FORMSTATUS): void => {},
};

export const FormContext = React.createContext(initialState);

interface FormState {
  activeForm: FORMSTATUS;
}

interface FormAction {
  type: "SET_ACTIVE_FORM";
  payload: FORMSTATUS;
}

const reducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case "SET_ACTIVE_FORM":
      return {
        ...state,
        activeForm: action.payload,
      };

    default:
      return state;
  }
};

export const FormContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FormContext.Provider
      value={{
        activeForm: state.activeForm,
        setActiveForm: (payload) =>
          dispatch({
            type: "SET_ACTIVE_FORM",
            payload,
          }),
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
