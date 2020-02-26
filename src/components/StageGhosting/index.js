import React, { PropTypes } from "react";
import Menu from "../Menu";
import MenuItem from "../MenuItem";
import styles from './styles.scss';

function StageGhosting({ children }) {
  const renderGhostedMenu = level =>
    <Menu itemCount="0" ghostingLevel={level}>
      <MenuItem key="Button 1" label="Button 1" />
      <MenuItem key="Button 2" label="Button 2" />
      <MenuItem key="Button 3" label="Button 3" />
    </Menu>;

  return (
    <div className={styles.stage}>
      {[5, 4, 3, 2, 1].map(level => renderGhostedMenu(level))}
    </div>
  );
}

export default StageGhosting;