// import { Accordion, AccordionItem } from "carbon-components-react";
import "./App.scss";
import { Register } from "./components/Forms/Register";
import styles from "./app.module.scss";
import { Accordion } from "./components/Accordion";

function App() {
  return (
    <div className="App">
      <div className="u-margin-b-05">
        <Accordion>
          <Register />
        </Accordion>
      </div>
      <Accordion>
        <Register />
      </Accordion>
    </div>
  );
}

export default App;
