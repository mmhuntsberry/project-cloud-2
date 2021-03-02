import React from "react";

import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  SkipToContent,
} from "carbon-components-react/lib/components/UIShell";

import "./overrides.scss";

const GlobalHeader = () => (
  <Header aria-label="IBM Cloud">
    <SkipToContent />
    <HeaderName href="/" prefix="IBM">
      Cloud
    </HeaderName>
    <HeaderGlobalBar>
      <HeaderNavigation className="header__menu-item" aria-label="Catalog">
        <HeaderMenuItem href="#">Catalog</HeaderMenuItem>
      </HeaderNavigation>
      <HeaderNavigation className="header__menu-item" aria-label="Catalog">
        <HeaderMenuItem href="#">Cost estimator</HeaderMenuItem>
      </HeaderNavigation>
      <HeaderNavigation className="header__menu-item" aria-label="Docs">
        <HeaderMenuItem href="#">Docs</HeaderMenuItem>
      </HeaderNavigation>
    </HeaderGlobalBar>
  </Header>
);

export default GlobalHeader;
