import React from "react";
import { Tooltip } from "carbon-components-react";
import styles from "./index.module.scss";

export const ValidationTooltip = ({
  constraints,
  direction = "bottom",
  open = true,
}) => {
  return (
    <div className={styles.passwordTooltip}>
      <Tooltip
        className="tooltip"
        direction={direction}
        open={open}
        tabIndex={0}
        showIcon={false}
        focusTrap={false}
        onChange={() => {}}
      >
        {constraints &&
          constraints.map(
            ({
              id,
              constraint,
              text,
              className,
              successIcon: Success,
              errorIcon: Error,
            }) => {
              return (
                <div className={styles.passwordRequirementContainer} key={id}>
                  {constraint === true || constraint === undefined ? (
                    <>
                      <Success
                        className={
                          constraint === undefined
                            ? ""
                            : styles[className.success]
                        }
                      />
                      <p>{text}</p>
                    </>
                  ) : (
                    <>
                      <Error
                        className={
                          constraint === undefined
                            ? ""
                            : styles[className.error]
                        }
                      />
                      <p>{text}</p>
                    </>
                  )}
                </div>
              );
            }
          )}
      </Tooltip>
    </div>
  );
};
