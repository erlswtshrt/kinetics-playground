import React from "react";
import styles from './styles.scss';

function Stage({ children }) {
  return (
    <div className={styles.stage}>
      {children}
    </div>
  );
}

export default Stage;
