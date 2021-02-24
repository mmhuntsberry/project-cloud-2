// import { Accordion, AccordionItem } from "carbon-components-react";
import "./App.scss";
import { Register } from "./components/Forms/Register";
import styles from "./app.module.scss";
import { Accordion } from "./components/Accordion";
import { Header } from "./components/Forms/Header";
import { RegisterContextProvider } from "./contexts/RegisterContext";

function App() {
  return (
    <RegisterContextProvider>
      <div className="App">
        <div className="bx--grid">
          <Header />
          <div className="bx--row">
            {/* Treated as flex items need to contain to one div*/}
            <div className="bx--col-lg-9 bx--col-md-8 bx--col-sm-8">
              <div className={styles.accordionContainer}>
                <Accordion>
                  <Register />
                </Accordion>
              </div>
              <div className={styles.accordionContainer}>
                <Accordion>
                  <Register />
                </Accordion>
              </div>
              <Accordion>
                <Register />
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </RegisterContextProvider>
  );
}

export default App;
