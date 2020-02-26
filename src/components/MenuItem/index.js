import React from "react";
import classnames from 'classnames';

// import styles from './styles.scss';



function MenuItem({ canvasStyles, isHidden, label }) {
  return (
    <li className={classnames(
      'slds-dropdown__item',
      { 'slds-hidden' : isHidden})
      }
      role="presentation"
      style={canvasStyles}>
      <a href="javascript:void(0);" role="menuitem" tabIndex="0">
        <span className="slds-truncate" title={"Menu Item ${label"}>
          <svg className="slds-icon slds-icon_x-small slds-icon-text-default slds-m-right_x-small" aria-hidden="true">
            <use xlinkHref="/icons/utility-sprite/svg/symbols.svg#user"></use>
          </svg>Menu Item {label}</span>
      </a>
    </li>
  );
}

export default MenuItem;
