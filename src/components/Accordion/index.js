import React, { useEffect, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Carbon imports
import { Edit16 } from "@carbon/icons-react";

// Contexts
import { FormContext } from "../../contexts/FormContext";

// Styles
import styles from "./index.module.scss";

export const Accordion: React.FC<Props> = ({ children, title, context }) => {
  const {
    isFormValid,
    formEdit,
    isFormToggled,
    setIsToggled,
    name,
  } = useContext(context);
  const formContext = useContext(FormContext);

  // Destructure from styles object
  const {
    accordionButtonIcon,
    accordionButtonIconIdle,
    accordionButtonIconActive,
    accordionButtonIconComplete,
    accordionButton,
  } = styles;

  useEffect(() => {
    if (name === formContext.activeForm) {
      setIsToggled(true);
    }
    /* eslint-disable */
  }, [isFormToggled, formContext, name]);
  /* eslint-enable */

  // Get completed state
  const isCompleted = isFormValid.success;

  return (
    <div className={styles.accordionContainer}>
      <button className={`${accordionButton}`}>
        {/* Swap icons if isFormValid  is successful */}
        {isCompleted ? (
          <svg
            className={`${accordionButtonIcon} ${accordionButtonIconComplete}`}
            data-name="Layer 1"
            viewBox="0 0 32 32"
          >
            <defs />
            <path d="M14 21.414l-5-5.001L10.413 15 14 18.586 21.585 11 23 12.415l-9 8.999z" />
            <path d="M16 2a14 14 0 1014 14A14 14 0 0016 2zm0 26a12 12 0 1112-12 12 12 0 01-12 12z" />
            <path
              fill="none"
              d="M0 0h32v32H0z"
              data-name="&lt;Transparent Rectangle&gt;"
            />
          </svg>
        ) : (
          <svg
            className={
              // Swap styles if the accordion is in an open state or not
              !isFormToggled
                ? `
              ${accordionButtonIcon} ${accordionButtonIconIdle}`
                : `${accordionButtonIcon} ${accordionButtonIconActive}
            }`
            }
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="40" />
          </svg>
        )}
        <h4 className={styles.accordionButtonText}>{title}</h4>
      </button>

      {/* Only show the edit button in state of success is true */}
      {isFormValid.success === true && name !== "verify" && (
        <button
          className={styles.formSuccessEditButton}
          onClick={() => {
            formEdit();
            setIsToggled(true);
          }}
        >
          <Edit16 />
        </button>
      )}
      <AnimatePresence>
        {isFormToggled && (
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
