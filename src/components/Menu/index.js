import React from "react";
// import styles from './styles.scss';



function Menu({ itemCount }) {
  return (
    <div className="slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open">
      <button className="slds-button slds-button_icon slds-button_icon-border-filled" aria-haspopup="true" title="Show More">
        <svg className="slds-button__icon" aria-hidden="true">
          <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"></use>
        </svg>
        <span className="slds-assistive-text">Show More</span>
      </button>
      <div className="slds-dropdown slds-dropdown_right">
        <ul className="slds-dropdown__list" role="menu" aria-label="Show More">
          {`${itemCount} Items`}
        </ul>
      </div>
    </div>
  );
}

export default Menu;
