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

  useEffect(() => {
    console.log(isToggled);
  });

  return (
    <>
      <button
        className={`${accordionButton}`}
        onClick={() => setIsToggled(!isToggled)}
      >
        <svg className={`${accordionButtonIcon}`} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" />
        </svg>
        Account information
      </button>
      <AnimatePresence>
        {isToggled && (
          <motion.div
            style={{
              backgroundColor: "#262626",
              overflow: "hidden",
              width: "600px",
            }}
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
