import React, {
  PropTypes
} from "react";
import Canvas from '../Canvas'

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      curSlide: 1;
    }
  }

  render() {
    <div>
      <Canvas curSlide={curSlide}/>
      <BackgroundMock curSlide={curSlide}/>
    </div>
  }
}

export default App;
