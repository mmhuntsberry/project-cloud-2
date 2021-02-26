// import { Accordion, AccordionItem } from "carbon-components-react";
import React from "react";
import "./App.scss";
import { Register } from "./components/Forms/Register";
import { Verify } from "./components/Forms/Verify";
import { Accordion } from "./components/Accordion";
import { Header } from "./components/Forms/Header";
import { FormContextProvider } from "./contexts/FormContext";
import { RegisterContextProvider } from "./contexts/RegisterContext";
import { VerifyContextProvider } from "./contexts/VerifyContext";
import { RegisterContext } from "./contexts/RegisterContext";
import { VerifyContext } from "./contexts/VerifyContext";

const App = () => {
  return (
    <FormContextProvider>
      <RegisterContextProvider>
        <VerifyContextProvider>
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

                  {/*<Accordion>
                <Register />
              </Accordion> */}
                </div>
              </div>
            </div>
          </div>
        </VerifyContextProvider>
      </RegisterContextProvider>
    </FormContextProvider>
  );
};

export default App;
