import React from "react";
import { Link } from "carbon-components-react";

import { IbmCloud32 } from "@carbon/icons-react";
import IbmCloud from "../../../assets/ibmcloudlogo.png";

import styles from "./index.module.scss";

export const Header = () => {
  return (
    <div className={`${styles.formHeaderContainer} u-pad-t-layout-06`}>
      <img className={styles.formHeaderIcon} src={IbmCloud} alt="IBM Cloud" />
      <h2 className="u-pad-t-layout-03">Create an IBM account</h2>
      <div className={styles.formHeaderLabelContainer}>
        <p className={`${styles.formHeaderLabel} u-margin-r-02`}>
          Already have a IBM Cloud account?
        </p>
        <Link className={styles.formHeaderLabelLink} href="/">
          Log in
        </Link>
      </div>
    </div>
  );
};
