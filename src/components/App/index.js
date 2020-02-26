import React, { PropTypes } from "react";
import Canvas from '../Canvas';
import BackgroundMock from '../BackgroundMock';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentMode: 'animating', // "ghosting", "comparison"
    };
  }

  render() {
    const { currentMode } = this.state;
    return (
      <div>
        <Canvas currentMode={currentMode}/>
        <BackgroundMock currentMode={currentMode}/>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
