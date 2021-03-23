import { useEffect, useState } from "react";
import GlobalHeader from "./components/GlobalHeader";
import { Register } from "./components/Forms/Register";
import { Verify } from "./components/Forms/Verify";
import { Payment } from "./components/Forms/Payment";
import { Accordion } from "./components/Accordion";
import { Header } from "./components/Forms/Header";
import { Sidebar } from "./components/Sidebar";
import { FormContextProvider } from "./contexts/FormContext";
import { RegisterContextProvider } from "./contexts/RegisterContext";
import { VerifyContextProvider } from "./contexts/VerifyContext";
import { PaymentContextProvider } from "./contexts/PaymentContext";
import { RegisterContext } from "./contexts/RegisterContext";
import { VerifyContext } from "./contexts/VerifyContext";
import { PaymentContext } from "./contexts/PaymentContext";
import { Button, Link, Loading } from "carbon-components-react";
import { ArrowRight32 } from "@carbon/icons-react";
import "./App.scss";
import styles from "./app.module.scss";

const App = () => {
  const [isFormComplete, setIsFormComplete] = useState({
    register: false,
    verify: false,
    payment: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const isButtonDisabled =
    isFormComplete.payment && isFormComplete.register && isFormComplete.verify;

  useEffect(() => {}, [isFormComplete]);

  const handleOnClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      window.location.href =
        "https://ibm.invisionapp.com/share/62O0ZSD387Q#/screens/319905086_walkme";
    }, 1000);
  };

  return (
    <FormContextProvider>
      <RegisterContextProvider>
        <VerifyContextProvider>
          <PaymentContextProvider>
            <Loading withOverlay active={isLoading} />
            <div className={`${styles.app}`}>
              <GlobalHeader />

              <div className="bx--grid bx--grid--full-width">
                <Header />
                <div className={`bx--row`}>
                  {/* Treated as flex items need to contain to one div*/}
                  <div
                    className={`${styles.formContainer} bx--col-lg-16 bx--col-md-6 bx--col-sm-4`}
                  >
                    <Accordion
                      title="Account information"
                      context={RegisterContext}
                    >
                      <Register
                        isFormComplete={isFormComplete}
                        setIsFormComplete={setIsFormComplete}
                      />
                    </Accordion>

                    <Accordion title="Verify email" context={VerifyContext}>
                      <Verify
                        isFormComplete={isFormComplete}
                        setIsFormComplete={setIsFormComplete}
                      />
                    </Accordion>

                    <Accordion
                      title="Payment information"
                      context={PaymentContext}
                    >
                      <Payment
                        isFormComplete={isFormComplete}
                        setIsFormComplete={setIsFormComplete}
                      />
                    </Accordion>
                  </div>

                  <Sidebar />
                  <div
                    className={`${styles.formContainer} u-margin-t-05 bx--col-lg-16 bx--col-md-6 bx--col-sm-4`}
                  >
                    {isFormComplete.verify && (
                      <>
                        <p className={styles.terms}>
                          By submitting this form, you acknowledge that you have
                          read and understand both the{" "}
                          <Link href="#" className={styles.termsLink}>
                            IBM Privacy Statement{" "}
                          </Link>
                          and{" "}
                          <Link href="#" className={styles.termsLink}>
                            Terms and Conditions
                          </Link>
                          , and that you grant IBM permission to contact you to
                          facilitate a successful experience.
                        </p>
                        <p className={styles.unsubscribe}>
                          You may unsubscribe from communications at any time by
                          clicking the unsubscribe link within any email.
                        </p>
                      </>
                    )}

                    <Button
                      className={`${styles.formButton} u-margin-b-09`}
                      renderIcon={ArrowRight32}
                      disabled={isButtonDisabled ? false : true}
                      onClick={handleOnClick}
                    >
                      Create
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </PaymentContextProvider>
        </VerifyContextProvider>
      </RegisterContextProvider>
    </FormContextProvider>
  );
};

export default App;
