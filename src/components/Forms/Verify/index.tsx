import React, { useState, useEffect, useContext } from "react";
import { Form, TextInput, Button, Link } from "carbon-components-react";
import { RegisterContext } from "../../../contexts/RegisterContext";

import styles from "./index.module.scss";
import { VerifyContext } from "../../../contexts/VerifyContext";

export const Verify = () => {
  const context = useContext(RegisterContext);
  const { email } = context;
  const verifyContext = useContext(VerifyContext);
  const SECRET: string = "1234567";

  useEffect(() => {}, [email, verifyContext]);

  return (
    <>
      <p className={styles.formDetails}>
        For security we need to verify your identity. We sent a 7-digit code to{" "}
        <strong>{email.value}</strong>. This code is valid for 30 minutes.
      </p>
      <Form className={`${styles.formContainer}`}>
        <TextInput
          className="u-margin-b-05"
          id="verify-email"
          invalidText="Invalid error message."
          labelText="Verification code"
          placeholder="ex. 1234567"
          type="text"
          size="xl"
          name="code"
          light
          value={verifyContext.code.value}
          onChange={verifyContext.updateInput}
        />

        <Button
          disabled={verifyContext.code.value !== SECRET}
          className={styles.formButton}
          onClick={() => {
            verifyContext.formSuccess();
            verifyContext.setIsToggled(false);
          }}
        >
          Next
        </Button>
        <div className={`${styles.formLabelContainer} u-margin-t-05`}>
          <p className={`${styles.formLabel} u-margin-0 u-margin-r-02`}>
            Didn't get an email?
          </p>
          <Link href="#" className="bx--link">
            Resend code
          </Link>
        </div>
      </Form>
    </>
  );
};
