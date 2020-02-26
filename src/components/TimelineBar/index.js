import React from "react";
import styles from './styles.scss';

function TimelineBar({ duration, label, onHandleClick }) {
  return (
    <button
      className={styles.bar}
      style={{ width: duration * 1000 }}
      title={`Timeline: ${label}`}
      onClick={ onHandleClick }
    >{label}</button>
  );
}

export default TimelineBar;
