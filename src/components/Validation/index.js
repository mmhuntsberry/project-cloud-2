/* eslint-disable */
import React, { useEffect, useState } from "react";
import { isStrongPassword } from "validator";
import {
  hasUpperCase,
  hasLowerCase,
  hasNumber,
  hasLengthBetween8and32,
  hasSpecialCharacters,
} from "../../utils";
import styles from "./index.module.scss";

export const Validation = ({ constraints, password }) => {
  const [score, setScore] = useState(0);
  const [progressStrengthClassName, setProgressStrengthClassName] = useState(
    "idle"
  );

  const { idle, weak, good, better, strong, strongest } = styles;

  const checkScoreAndSetClassName = () => {
    if (score === 0) {
      setProgressStrengthClassName("idle");
    }
    if (score > 5) {
      setProgressStrengthClassName("weak");
    }
    if (score > 10) {
      setProgressStrengthClassName("good");
    }
    if (score > 20) {
      setProgressStrengthClassName("better");
    }
    if (score > 25) {
      setProgressStrengthClassName("strong");
    }

    if (score > 30) {
      setProgressStrengthClassName("strongest");
    }
  };

  const buildValidationProgressBar = (constraints) => {
    return constraints.map((constraint, i) => {
      return (
        // Look in to adding a key to remove warning.
        <>
          {i < constraints.length - 1 && (
            <div
              className={
                checkScoreAndSetClassName &&
                `${styles[progressStrengthClassName]} ${styles.validationNode}`
              }
            ></div>
          )}
        </>
      );
    });
  };

  useEffect(() => {
    setScore(
      isStrongPassword(password, {
        returnScore: true,
        pointsForContainingSymbol: 0,
        pointsPerUnique: 0,
      })
    );
    checkScoreAndSetClassName();
  }, [score, password, progressStrengthClassName, constraints]);

  return (
    <div className={`${styles.passwordIndicator} u-margin-t-01`}>
      {constraints && buildValidationProgressBar(constraints)}
    </div>
  );
};
