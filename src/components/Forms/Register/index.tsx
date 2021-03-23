import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Form,
  TextInput,
  InlineLoading,
  Button,
  FormGroup,
  RadioButtonGroup,
  RadioButton,
} from "carbon-components-react";
import isEmail from "validator/es/lib/isEmail";
import { motion, AnimatePresence } from "framer-motion";

import { Validation } from "../../Validation";
import { ValidationTooltip } from "../../ValidationTooltip";
import { RegisterContext } from "../../../contexts/RegisterContext";
import { buildPasswordConstraints } from "../../../utils";

import styles from "./index.module.scss";
import { FormContext, FORMSTATUS } from "../../../contexts/FormContext";

export const Register = ({
  isFormComplete,
  setIsFormComplete,
}: {
  isFormComplete: { register: boolean; verify: boolean; payment: boolean };
  setIsFormComplete: (prevState: {
    register: boolean;
    verify: boolean;
    payment: boolean;
  }) => void;
}) => {
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
  } = context;
  const formContext = useContext(FormContext);
  const passwordConstraints = buildPasswordConstraints(password.value);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    console.log(formContext);
  });

  const renderStatus = () => {
    const { loading, success } = email;

    if (loading) {
      return <InlineLoading className={`${styles.inlineLoading}`} />;
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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  return (
    <>
      {!isFormValid.success ? (
        <AnimatePresence>
          <motion.div exit={{ height: 0 }}>
            <Form onSubmit={onSubmit} className={styles.formContainer}>
              <div className={styles.formInputContainer}>
                <TextInput
                  autoFocus
                  id="email"
                  className={styles.textInput}
                  labelText="Email"
                  name="email"
                  size="xl"
                  light={true}
                  placeholder="Enter email"
                  invalid={email.hasError && email.value.length > 0}
                  onChange={updateInput}
                  onBlur={(evt) => {
                    if (!isEmail(email.value)) {
                      return checkError(evt);
                    }
                    setTimeout(() => {
                      fieldSuccess(evt);
                    }, 1000);
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
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                  onBlur={(evt) => {
                    setIsOpen(false);
                    if (
                      passwordConstraints.some(({ constraint }) => !constraint)
                    ) {
                      return checkError(evt);
                    }
                    fieldSuccess(evt);
                  }}
                  onKeyDown={handleKeyPress}
                  onChange={(evt) => updateInput(evt)}
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
                    updateAccountType(evt);
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
                  email.success === true && password.success === true
                    ? false
                    : true
                }
                className={styles.formButton}
                onClick={() => {
                  formSuccess();
                  formContext.setActiveForm(FORMSTATUS.VERIFY);
                  setIsFormComplete({ ...isFormComplete, register: true });
                }}
              >
                Next
              </Button>
            </Form>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className={styles.formSuccessDetails}
        >
          <p className={styles.formSuccessEmail}>{email.value}</p>
          <p className={styles.formSuccessPassword}>
            {password.value.split("").map((char) => (
              <span>&bull;</span>
            ))}
          </p>
          <p className={styles.formSuccessAccount}>
            {accountType.value} <span>account</span>
          </p>
        </motion.div>
      )}
    </>
  );
};
