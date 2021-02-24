import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./index.module.scss";

export const Accordion = ({ children }) => {
  const [isToggled, setIsToggled] = useState(false);
  const {
    accordionButtonIcon,
    accordionButtonIconComplete,
    accordionButton,
  } = styles;

  useEffect(() => {});

  return (
    <>
      <button
        className={`${accordionButton}`}
        onClick={() => setIsToggled(!isToggled)}
      >
        <svg className={`${accordionButtonIcon}`} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" />
        </svg>
        <h4 className={styles.accordionButtonText}>Account information</h4>
      </button>
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
    </>
  );
};
