// import { Accordion, AccordionItem } from "carbon-components-react";
import "./App.scss";
import { Register } from "./components/Forms/Register";
import styles from "./app.module.scss";
import { Accordion } from "./components/Accordion";

function App() {
  return (
    <div className="App">
      <div className="bx--grid">
        <div className="bx--row">
          {/* Treated as flex items need to contain to one div*/}
          <div className="bx--col-lg-9 bx--col-md-8 bx--col-sm-8">
            <Accordion>
              <Register />
            </Accordion>
            <Accordion>
              <Register />
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
