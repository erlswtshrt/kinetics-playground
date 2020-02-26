import React from "react";
// import styles from './styles.scss';

const imageMap = {
  1: "path/to/img",
  2: "path/to/img",
  3: "path/to/img",
  4: "path/to/img",
  5: "path/to/img",
  6: "path/to/img",
  7: "path/to/img",
  8: "path/to/img",
}

function BackgroundMock({ currentMode }) {
  return (
  <img src={imageMap[currentMode]} />
  );
}

export default BackgroundMock;