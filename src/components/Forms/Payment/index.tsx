import { useContext, useEffect } from "react";
import {
  Form,
  TextInput,
  Button,
  Select,
  SelectItem,
  SelectItemGroup,
  Checkbox,
  DatePicker,
  DatePickerInput,
} from "carbon-components-react";
import styles from "./index.module.scss";
import { PaymentContext } from "../../../contexts/PaymentContext";
import { FormContext, FORMSTATUS } from "../../../contexts/FormContext";

import "./overrides.scss";
import { formatCard, creditCardExpiresFormat } from "../../../utils";

const CREDIT_CARD_REGEX = RegExp(
  /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|62[0-9]{14})$/
);

const EXPIRATION_REGEX = RegExp(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/);
const CVV_REGEX = RegExp(/^[0-9]{3,4}$/);

export const Payment = ({
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
  const paymentContext = useContext(PaymentContext);
  const formContext = useContext(FormContext);

  const isButtonDisabled =
    paymentContext.creditCard.success &&
    paymentContext.cvv.success &&
    paymentContext.expiration.success &&
    paymentContext.firstname.success &&
    paymentContext.lastname.success &&
    paymentContext.address01.success &&
    paymentContext.city.success &&
    paymentContext.zipcode.success;

  useEffect(() => {
    console.log("TOGGLED", paymentContext.isFormToggled);
  });
  return (
    <Form className={`${styles.formContainer} ${styles.formContainerGrid}`}>
      <div className={styles.gridSpanAll}>
        <TextInput
          name="creditCard"
          className={styles.textIput}
          id="creditcard"
          invalidText="Invalid error message."
          labelText="Credit card"
          placeholder="Enter number"
          type="text"
          size="xl"
          light
          value={formatCard(paymentContext.creditCard.value)}
          onChange={paymentContext.updateInput}
          onBlur={(evt) => {
            const cleanStr = paymentContext.creditCard.value.replaceAll(
              " ",
              ""
            );
            if (!CREDIT_CARD_REGEX.test(cleanStr)) {
              return paymentContext.checkError(evt);
            }

            paymentContext.fieldSuccess(evt);
          }}
          invalid={paymentContext.creditCard.hasError}
        />
      </div>
      {/* <TextInput
        name="expiration"
        className={styles.textInput}
        size="xl"
        light
        id="expiration"
        invalidText="Invalid error message."
        labelText="Expiration date"
        placeholder="mm/yy"
        type="text"
        value={paymentContext.expiration.value}
        onChange={paymentContext.updateInput}
        onBlur={(evt) => {
          if (!EXPIRATION_REGEX.test(paymentContext.expiration.value)) {
            return paymentContext.checkError(evt);
          }
          paymentContext.fieldSuccess(evt);
        }}
        invalid={paymentContext.expiration.hasError}
      /> */}
      <DatePicker
        dateFormat="m/Y"
        datePickerType="simple"
        className="form__input"
        id="expiration"
        light
      >
        <DatePickerInput
          invalid={paymentContext.expiration.hasError}
          invalidText="Invalid error message."
          labelText="Expiration date"
          id="date-picker-default-id"
          placeholder="mm/yy"
          type="text"
          size="xl"
          name="expiration"
          value={creditCardExpiresFormat(paymentContext.expiration.value)}
          onChange={paymentContext.updateInput}
          onBlur={(evt) => {
            if (!EXPIRATION_REGEX.test(paymentContext.expiration.value)) {
              return paymentContext.checkError(evt);
            }
            paymentContext.fieldSuccess(evt);
          }}
        />
      </DatePicker>

      <TextInput
        name="cvv"
        className={styles.textInput}
        size="xl"
        light
        id="cvv"
        invalidText="Invalid error message."
        labelText="Security code"
        placeholder="Enter code"
        type="text"
        value={paymentContext.cvv.value}
        onChange={paymentContext.updateInput}
        onBlur={(evt) => {
          if (!CVV_REGEX.test(paymentContext.cvv.value)) {
            return paymentContext.checkError(evt);
          }
          paymentContext.fieldSuccess(evt);
        }}
        invalid={paymentContext.cvv.hasError}
      />
      <TextInput
        name="firstname"
        className={styles.textInput}
        size="xl"
        light
        id="firstname"
        invalidText="Invalid error message."
        labelText="First name"
        placeholder="Enter name"
        type="text"
        value={paymentContext.firstname.value}
        onChange={paymentContext.updateInput}
        onBlur={(evt) => paymentContext.fieldSuccess(evt)}
      />
      <TextInput
        name="lastname"
        className={styles.textInput}
        size="xl"
        light
        id="lastname"
        invalidText="Invalid error message."
        labelText="Last name"
        placeholder="Enter last name"
        type="text"
        value={paymentContext.lastname.value}
        onChange={paymentContext.updateInput}
        onBlur={(evt) => paymentContext.fieldSuccess(evt)}
      />
      <div className={styles.gridSpanAll}>
        <TextInput
          name="address01"
          className={styles.textIput}
          id="address01"
          invalidText="Invalid error message."
          labelText="Address line 1"
          placeholder="Enter address line 1"
          type="text"
          size="xl"
          light
          value={paymentContext.address01.value}
          onChange={paymentContext.updateInput}
          onBlur={(evt) => paymentContext.fieldSuccess(evt)}
        />
      </div>
      <div className={styles.gridSpanAll}>
        <TextInput
          name="address02"
          className={styles.textIput}
          id="address02"
          invalidText="Invalid error message."
          labelText="Address line 2"
          placeholder="Enter address line 2"
          type="text"
          size="xl"
          light
          value={paymentContext.address02.value}
          onChange={paymentContext.updateInput}
          onBlur={(evt) => paymentContext.fieldSuccess(evt)}
        />
      </div>
      <div className={styles.gridSpanAll}>
        <TextInput
          name="city"
          className={styles.textIput}
          id="city"
          invalidText="Invalid error message."
          labelText="City"
          placeholder="Enter city"
          type="text"
          size="xl"
          light
          value={paymentContext.city.value}
          onChange={paymentContext.updateInput}
          onBlur={(evt) => paymentContext.fieldSuccess(evt)}
        />
      </div>
      <Select
        defaultValue="placeholder-item"
        id="select-1"
        invalidText="A valid value is required"
        labelText="Region"
        light
        size="xl"
      >
        <SelectItem
          className="form__input"
          text="Choose an option"
          value="placeholder-item"
        />
        <SelectItemGroup label="Regions">
          <SelectItem text="Option 1" value="option-1" />
          <SelectItem text="Option 2" value="option-2" />
          <SelectItem text="Option 3" value="option-3" />
          <SelectItem text="Option 4" value="option-4" />
        </SelectItemGroup>
      </Select>
      <TextInput
        name="zipcode"
        className="form__input form__input--full-line"
        id="zipcode"
        invalidText="Invalid error message."
        labelText="Zip code"
        placeholder="Enter zip code"
        type="text"
        value={paymentContext.zipcode.value}
        onChange={paymentContext.updateInput}
        onBlur={(evt) => paymentContext.fieldSuccess(evt)}
        size="xl"
        light
      />
      <div className={`${styles.gridSpanAll} u-margin-t-02`}>
        <fieldset className="bx--fieldset">
          <Checkbox
            defaultChecked
            className={styles.formCheckbox}
            labelText="My billing address is the same as my company address"
            id="checked-label-1"
          />
        </fieldset>
        <Button
          disabled={!isButtonDisabled}
          className={styles.formButton}
          onClick={() => {
            paymentContext.formSuccess();
            paymentContext.setIsToggled(false);
            formContext.setActiveForm(FORMSTATUS.COMPLETE);
            setIsFormComplete({ ...isFormComplete, payment: true });
          }}
        >
          Next
        </Button>
      </div>
    </Form>
  );
};
