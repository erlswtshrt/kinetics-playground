import React from "react";
import classnames from 'classnames';
import styles from './styles.scss';

function Stage({ children }) {
  return (
    <div className={classnames(styles.stage)}>
      {children}
    </div>
  );
}

export default Stage;
