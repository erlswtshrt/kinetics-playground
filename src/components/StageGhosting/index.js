import React, { PropTypes } from "react";
import Menu from "../Menu";
import MenuItem from "../MenuItem";
import styles from './styles.scss';

function StageGhosting({ children }) {
  return (
    <Menu itemCount="0">
      <MenuItem key="Button 1" label="Button 1" />
      <MenuItem key="Button 2" label="Button 2" />
      <MenuItem key="Button 3" label="Button 3" />
    </Menu>
  );
}

export default StageGhosting;