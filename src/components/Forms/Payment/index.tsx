import React, { useContext, useState, useEffect } from "react";

// Carbon imports
import {
  Form,
  TextInput,
  Select,
  SelectItem,
  SelectItemGroup,
  Checkbox,
  DatePicker,
  DatePickerInput,
} from "carbon-components-react";

// Contexts
import { PaymentContext } from "../../../contexts/PaymentContext";
import { RegisterContext } from "../../../contexts/RegisterContext";
import { FormContext, FORMSTATUS } from "../../../contexts/FormContext";

// Utils
import states from "./utils/states";
import { formatCard, creditCardExpiresFormat } from "../../../utils";
import { CREDIT_CARD_REGEX, EXPIRATION_REGEX, CVV_REGEX } from "./utils";

// Styles
import styles from "./index.module.scss";
import "./overrides.scss";

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
  const [isAddressChecked, setIsAddressChecked] = useState(true);
  /**
   * Contexts
   */
  const paymentContext = useContext(PaymentContext);
  const formContext = useContext(FormContext);
  const registerContext = useContext(RegisterContext);

  useEffect(() => {
    if (
      paymentContext.creditCard.success &&
      paymentContext.cvv.success &&
      paymentContext.expiration.success &&
      paymentContext.address01.success &&
      paymentContext.city.success &&
      paymentContext.zipcode.success
      // (paymentContext.companyName.success ||
      //   (paymentContext.firstname.success && paymentContext.lastname.success))
    ) {
      formContext.setActiveForm(FORMSTATUS.COMPLETE);
      setIsFormComplete({ ...isFormComplete, payment: true });
    } else {
      setIsFormComplete({ ...isFormComplete, payment: false });
    }
    /* eslint-disable */
  }, [
    isAddressChecked,
    paymentContext.creditCard.success,
    paymentContext.cvv.success,
    paymentContext.expiration.success,
    paymentContext.address01.success,
    paymentContext.city.success,
    paymentContext.zipcode.success,
  ]);
  /* eslint-enable */

  const handleCreditCardBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    /**
     * String needs all spaces removed in order to be tested.
     */
    const cleanStr = paymentContext.creditCard.value.replaceAll(" ", "");
    if (!CREDIT_CARD_REGEX.test(cleanStr)) {
      return paymentContext.checkError(evt);
    }
    paymentContext.fieldSuccess(evt);
  };

  const handleExpiresBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    if (!EXPIRATION_REGEX.test(paymentContext.expiration.value)) {
      return paymentContext.checkError(evt);
    }
    paymentContext.fieldSuccess(evt);
  };

  const handleCvvBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    if (!CVV_REGEX.test(paymentContext.cvv.value)) {
      return paymentContext.checkError(evt);
    }
    paymentContext.fieldSuccess(evt);
  };

  return (
    <Form className={`${styles.formContainer} ${styles.formContainerGrid}`}>
      <div className={styles.gridSpanAll}>
        <h3 className={`${styles.formHeading}  u-margin-t-05  u-margin-b-03`}>
          You will not be charged until you upgrade.
        </h3>
        <p className={`${styles.formSubheading} u-margin-b-05`}>
          We are asking for this information to ensure you're not a robot.
        </p>
      </div>
      <div className={styles.gridSpanAll}>
        <TextInput
          name="creditCard"
          className={styles.textInput}
          id="creditcard"
          invalidText="Invalid error message."
          labelText="Credit card"
          placeholder="Enter number"
          type="text"
          size="xl"
          light
          value={formatCard(paymentContext.creditCard.value)}
          onChange={(evt) => {
            paymentContext.updateInput(evt);
          }}
          onBlur={handleCreditCardBlur}
          invalid={
            paymentContext.creditCard.hasError &&
            paymentContext.creditCard.value.length > 0
          }
        />
      </div>
      <DatePicker
        dateFormat="m/Y"
        datePickerType="simple"
        className={styles.textInput}
        id="expiration"
        light
      >
        <DatePickerInput
          invalid={
            paymentContext.expiration.hasError &&
            paymentContext.expiration.value.length > 0
          }
          invalidText="Invalid error message."
          labelText="Expiration date"
          id="date-picker-default-id"
          placeholder="mm/yy"
          type="text"
          size="xl"
          name="expiration"
          value={creditCardExpiresFormat(paymentContext.expiration.value)}
          onChange={paymentContext.updateInput}
          onBlur={handleExpiresBlur}
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
        onBlur={handleCvvBlur}
        invalid={
          paymentContext.cvv.hasError && paymentContext.cvv.value.length > 0
        }
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
      {/* 
        Toggle between inputs depending on if user
        choose "company" or "personal" account in 
        step one.
      */}
      {registerContext.accountType.value === "company" && (
        <TextInput
          name="companyName"
          className={styles.textInput}
          id="companyName"
          invalidText="Invalid error message."
          labelText="Company name"
          placeholder="Enter company name"
          type="text"
          size="xl"
          light
          value={paymentContext.companyName.value}
          onChange={paymentContext.updateInput}
          onBlur={(evt) => paymentContext.fieldSuccess(evt)}
        />
      )}
      {registerContext.accountType.value === "company" ? (
        <Select
          defaultValue="USA"
          id="select-1"
          light
          invalidText="A valid value is required"
          labelText="Country and Region"
          size="xl"
          className="select__input"
        >
          <SelectItem className="form__input" text="USA" value="USA" />
        </Select>
      ) : (
        <div className={styles.gridSpanAll}>
          <Select
            defaultValue="USA"
            id="select-1"
            light
            invalidText="A valid value is required"
            labelText="Country and Region"
            size="xl"
            className={styles.selectInput}
          >
            <SelectItem className="form__input" text="USA" value="USA" />
          </Select>
        </div>
      )}
      <div className={styles.gridSpanAll}>
        <TextInput
          name="address01"
          className={styles.textInput}
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
          className={styles.textInput}
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
          className={styles.textInput}
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
        className={styles.textInput}
        defaultValue="placeholder-item"
        id="select-1"
        invalidText="A valid value is required"
        labelText="State"
        light
        size="xl"
      >
        <SelectItem
          className={styles.textInput}
          text="Choose an option"
          value="placeholder-item"
        />
        <SelectItemGroup label="States">
          {states.map((state) => (
            <SelectItem text={state} value={state} />
          ))}
        </SelectItemGroup>
      </Select>
      <TextInput
        name="zipcode"
        className={styles.textInputZip}
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

      {registerContext.accountType.value === "company" && (
        <div className={`${styles.gridSpanAll} u-margin-t-02`}>
          <Checkbox
            defaultChecked
            className={styles.formCheckbox}
            labelText={
              registerContext.accountType.value === "company"
                ? "My billing address is the same as my company address"
                : "My billing address is the same as my home address"
            }
            id="checked-label-1"
            onChange={() => setIsAddressChecked(!isAddressChecked)}
          />
          {!isAddressChecked && (
            <>
              <h3 className={styles.companyInformation}>Company Information</h3>

              <div className={`${styles.formContainerGrid}`}>
                <div className={styles.gridSpanAll}>
                  <TextInput
                    autoFocus
                    name="address01"
                    className={styles.textInput}
                    id="address01"
                    invalidText="Invalid error message."
                    labelText="Address line 1"
                    placeholder="Enter address line 1"
                    type="text"
                    size="xl"
                    light
                    // value={paymentContext.address01.value}
                    onChange={paymentContext.updateInput}
                    onBlur={(evt) => paymentContext.fieldSuccess(evt)}
                  />
                </div>
                <div className={styles.gridSpanAll}>
                  <TextInput
                    name="address02"
                    className={styles.textInput}
                    id="address02"
                    invalidText="Invalid error message."
                    labelText="Address line 2"
                    placeholder="Enter address line 2"
                    type="text"
                    size="xl"
                    light
                    // value={paymentContext.address02.value}
                    onChange={paymentContext.updateInput}
                    onBlur={(evt) => paymentContext.fieldSuccess(evt)}
                  />
                </div>
                <div className={styles.gridSpanAll}>
                  <TextInput
                    name="city"
                    className={styles.textInput}
                    id="city"
                    invalidText="Invalid error message."
                    labelText="City"
                    placeholder="Enter city"
                    type="text"
                    size="xl"
                    light
                    // value={paymentContext.city.value}
                    onChange={paymentContext.updateInput}
                    onBlur={(evt) => paymentContext.fieldSuccess(evt)}
                  />
                </div>

                <Select
                  className={styles.textInput}
                  defaultValue="placeholder-item"
                  id="select-1"
                  invalidText="A valid value is required"
                  labelText="State"
                  light
                  size="xl"
                >
                  <SelectItem
                    className="form__input"
                    text="Choose an option"
                    value="placeholder-item"
                  />
                  <SelectItemGroup label="States">
                    {states.map((state) => (
                      <SelectItem text={state} value={state} />
                    ))}
                  </SelectItemGroup>
                </Select>
                <TextInput
                  name="zipcode"
                  className={styles.textInputZip}
                  id="zipcode"
                  invalidText="Invalid error message."
                  labelText="Zip code"
                  placeholder="Enter zip code"
                  type="text"
                  // value={paymentContext.zipcode.value}
                  onChange={paymentContext.updateInput}
                  onBlur={(evt) => paymentContext.fieldSuccess(evt)}
                  size="xl"
                  light
                />
              </div>
            </>
          )}
        </div>
      )}
    </Form>
  );
};
