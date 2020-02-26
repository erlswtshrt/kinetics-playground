import React from "react";
// import styles from './styles.scss';



function Menu({ label }) {
  return (
    <li className="slds-dropdown__item" role="presentation">
      <a href="javascript:void(0);" role="menuitem" tabindex="0">
        <span className="slds-truncate" title={"Menu Item ${label"}>Menu Item {label}</span>
      </a>
    </li>
  );
}

export default Menu;
