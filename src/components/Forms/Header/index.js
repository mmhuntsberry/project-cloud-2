import React from "react";
import { Link } from "carbon-components-react";

import { IbmCloud32 } from "@carbon/icons-react";

import styles from "./index.module.scss";

export const Header = () => {
  return (
    <div className={`${styles.formHeaderContainer} u-margin-t-09`}>
      <IbmCloud32 className={styles.formHeaderIcon} />
      <h2
        class={`
      ${styles.formHeader} u-margin-t-09`}
      >
        Create an IBM account
      </h2>
      <div className={`${styles.formHeaderLabelContainer} u-margin-t-02`}>
        <p class={`u-margin-r-02`}>Already have a IBM Cloud account?</p>
        <Link className="bx--link" href="/">
          Log in
        </Link>
      </div>
    </div>
  );
};
