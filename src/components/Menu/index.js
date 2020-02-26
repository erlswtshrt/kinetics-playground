import React from "react";
import styles from './styles.scss';

function Menu({ children, canvasStyles, itemCount }) {
  return (
    <div className={`slds-align_absolute-center ${styles.container}`}>
      <div className={styles.wrapper}>
        <div className="slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open">
          <button className="slds-button slds-button_icon slds-button_icon-border-filled" aria-haspopup="true" title="Show More">
            <svg className="slds-button__icon" aria-hidden="true">
              <use xlinkHref="/icons/utility-sprite/svg/symbols.svg#down"></use>
            </svg>
            <span className="slds-assistive-text">Show More</span>
          </button>
          <div className="slds-dropdown slds-dropdown_right" style={canvasStyles}>
            <ul className="slds-dropdown__list" role="menu" aria-label="Show More">
              {children}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
