import React from "react";

class Canvas extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedComponent: 'menuProps',
      duration: 1,
      durationValues: [0.2, 0.3, 0.5, 1],
      easeValues: ["ease-in", "ease-out", "ease-in-out"],

      menuValue: 40,
      button1Value: 0,
      button2Value: 0,
      button3Value: 0,

      menuProps: {
        property: "height",
        duration: 0.2,
        initialValue: 40,
        finalValue: 300,
        ease: "ease-in"
      },
      button1Props: {
        property: "opacity",
        duration: 0.2,
        finalValue: 300,
        ease: "ease-in"
      },
      button2Props: {
        property: "opacity",
        duration: 0.2,
        finalValue: 300,
        ease: "ease-in"
      },
      button3Props: {
        property: "opacity",
        duration: 0.2,
        finalValue: 300,
        ease: "ease-in"
      },
    };
  }

  animate() {
    this.setState({
      menuValue: this.state.menuProps.finalValue,
      button1Value: this.state.button1Props.finalValue,
      button2Value: this.state.button2Props.finalValue,
      button3Value: this.state.button3Props.finalValue,
    });

    setTimeout(() => {
      this.setState({
        menuValue: this.state.menuProps.initialValue,
        button1Value: this.state.button1Props.initialValue,
        button2Value: this.state.button2Props.initialValue,
        button3Value: this.state.button3Props.initialValue,
      });
    }, this.state.duration * 1000 + 200);
  }

  renderPropMenu() {
    return <div><label>Ease curve</label>
      <select
        value={this.state.ease}
        onChange={e =>
          this.setState({
            ease: e.target.value
          })
        }
      >
        {this.state.easeValues.map(v => (
          <option value={v}>{v}</option>
        ))}
      </select>
      <label>Duration</label>
      <select
        value={this.state.duration}
        onChange={e =>
          this.setState({
            duration: e.target.value
          })
        }
      >
        {this.state.durationValues.map(v => (
          <option value={v}>{v}</option>
        ))}
      </select></div>
  }

  render() {
    const menuProps = this.state.menuProps
    const menuStyle = {
      width: 40,
      background: "blue",
      transition: this.state.menuValue === menuProps.finalValue ? `${menuProps.property} ${menuProps.duration}s ${menuProps.ease}` : null,
      height: this.state.menuValue
    }

    return (
      <div>
        <div style={{ width: 800, height: 600, background: "red" }}>
          <div style={menuStyle}>Menu</div>
        </div>
        {this.renderPropMenu()}
        <button onClick={this.animate.bind(this)}>Animate</button>
      </div>
    );
  }
}

export default Canvas;
