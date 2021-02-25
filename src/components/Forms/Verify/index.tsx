import React, { useState, useEffect } from "react";
import { Form, TextInput, Button, Link } from "carbon-components-react";
import { ArrowRight32 } from "@carbon/icons-react";

export const Verify = () => {
  const [code, setCode] = useState("");
  const SECRET: string = "1234567";

  useEffect(() => {}, [code]);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setCode(evt.target.value);
  };

  return (
    <Form className="form form--register">
      <TextInput
        className="u-margin-b-05"
        id="verify-email"
        invalidText="Invalid error message."
        labelText="Verification code"
        placeholder="Enter code"
        type="text"
        onChange={handleChange}
      />

      <Button
        disabled={code !== SECRET}
        className="form__button"
        renderIcon={ArrowRight32}
      >
        Next
      </Button>
      <div className="form-header__label-container form-header__label-container--verify">
        <p className={`form-header__label u-margin-0 u-margin-r-02`}>
          Didn't get an email?
        </p>
        <Link href="#" className="bx--link">
          Resend email
        </Link>
      </div>
    </Form>
  );
};
