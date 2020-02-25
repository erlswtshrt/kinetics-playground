import React, { PropTypes } from "react";
import Canvas from '../Canvas'

function App() {
  return (
    <div>
      <Canvas />
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
