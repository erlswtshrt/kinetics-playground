import React, { PropTypes } from "react";
import Canvas from '../Canvas';
import BackgroundMock from '../BackgroundMock';
import styles from './styles.scss';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentMode: 'animating', // "ghosting", "comparison"
    };
  }

  handleModeChange(mode) {
    this.setState({
      currentMode: mode
    });
  }

  getChildContext() {
    return {
      currentMode: this.state.currentMode,
      handleModeChange: this.handleModeChange.bind(this)
    }
  }

  renderCanvas(mode) {
    switch(mode) {
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

App.childContextTypes = {
  currentMode: PropTypes.string,
  handleModeChange: PropTypes.func
};

export default App;
