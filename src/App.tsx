// import { Accordion, AccordionItem } from "carbon-components-react";
import React from "react";
import "./App.scss";
import { Register } from "./components/Forms/Register";
import { Verify } from "./components/Forms/Verify";
import { Payment } from "./components/Forms/Payment";
import { Accordion } from "./components/Accordion";
import { Header } from "./components/Forms/Header";
import { FormContextProvider } from "./contexts/FormContext";
import { RegisterContextProvider } from "./contexts/RegisterContext";
import { VerifyContextProvider } from "./contexts/VerifyContext";
import { PaymentContextProvider } from "./contexts/PaymentContext";
import { RegisterContext } from "./contexts/RegisterContext";
import { VerifyContext } from "./contexts/VerifyContext";
import { PaymentContext } from "./contexts/PaymentContext";

const App = () => {
  return (
    <FormContextProvider>
      <RegisterContextProvider>
        <VerifyContextProvider>
          <PaymentContextProvider>
            <div className="App">
              <div className="bx--grid">
                <Header />
                <div className="bx--row">
                  {/* Treated as flex items need to contain to one div*/}
                  <div className="bx--col-lg-9 bx--col-md-8 bx--col-sm-8">
                    <Accordion
                      title="Account information"
                      context={RegisterContext}
                    >
                      <Register />
                    </Accordion>

                    <Accordion title="Verify email" context={VerifyContext}>
                      <Verify />
                    </Accordion>

                    <Accordion
                      title="Payment information"
                      context={PaymentContext}
                    >
                      <Payment />
                    </Accordion>
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
