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

  renderCanvas(mode) {
    switch(mode) {
      case "ghosting":
        return <div className="ghosting"></div>
      case "comparison":
        return <div className="comparison"></div>
      default:
        return <Canvas currentMode={mode}/>
    }
  }

  render() {
    const { currentMode } = this.state;
    return (
      <div>

        {this.renderCanvas(currentMode)}
        <BackgroundMock currentMode={currentMode} />
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
