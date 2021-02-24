import React, { useState, useEffect, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./index.module.scss";
import { RegisterContext } from "../../contexts/RegisterContext";
import { Edit20 } from "@carbon/icons-react";

export const Accordion = ({ children }) => {
  const [isToggled, setIsToggled] = useState(false);
  const context = useContext(RegisterContext);
  const { formEdit, isFormValid } = context;
  const {
    accordionButtonIcon,
    accordionButtonIconComplete,
    accordionButton,
  } = styles;

  useEffect(() => {
    console.log(isFormValid);
  }, [isFormValid]);

  return (
    <div className={styles.accordionContainer}>
      <button
        className={`${accordionButton}`}
        onClick={() => setIsToggled(!isToggled)}
      >
        <svg className={`${accordionButtonIcon}`} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" />
        </svg>
        <h4 className={styles.accordionButtonText}>Account information</h4>
      </button>
      {isFormValid.success === true && (
        <button
          className={styles.formSuccessEditButton}
          onClick={() => {
            formEdit();
          }}
        >
          <Edit20 />
        </button>
      )}
      <AnimatePresence>
        {isToggled && (
          <motion.div
            className={styles.accordionBody}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
