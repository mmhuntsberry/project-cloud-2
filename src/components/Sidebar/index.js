import React from "react";
import styles from "./index.module.scss";

export const Sidebar = () => {
  return (
    <ul className={`${styles.sidebar} bx--offset-lg-3 bx--col-lg-5`}>
      <li>
        <h3 className={`${styles.sidebarHeading} u-margin-b-03`}>
          No up-front changes
        </h3>
        <p
          className={`${styles.sidebarSubheading} u-margin-b-05 sidebar__body--long`}
        >
          You will not be charged unless you manually upgrade to a paid account.
        </p>
      </li>
      <li>
        <h3 className={`${styles.sidebarHeading} u-margin-b-03`}>
          Security first
        </h3>
        <p
          className={`${styles.sidebarSubheading} u-margin-b-05 sidebar__body--long`}
        >
          To make our platform more secure and prevent fraud, we verify everyone
          upfront.
        </p>
      </li>
      <li>
        <h3 className={`${styles.sidebarHeading} u-margin-b-03`}>
          $200 credit when you upgrade
        </h3>
        <p className={`${styles.sidebarSubheading}`}>
          Receive a crediit for you first $200 of apps and services on us!
        </p>
      </li>
    </ul>
  );
};
