import React from "react";

class Canvas extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedComponent: 0,
      durationValues: [0.2, 0.3, 0.5, 1],
      easeValues: ["ease-in", "ease-out", "ease-in-out"],
      componentProps: [{
        property: "height",
        duration: 0.2,
        value: 0,
        finalValue: 300,
        ease: "ease-in"
      },
      {
        property: "height",
        duration: 0.2,
        value: 0,
        finalValue: 300,
        ease: "ease-in"
      }]
    };
  }

  animate() {
    this.setState({
      value: this.state.finalValue
    });
    setTimeout(() => {
      this.reset();
    }, this.state.duration * 1000 + 2000);
  }

  reset() {
    this.setState({
      value: 0
    });
  }

  render() {
    const comp1Props = this.state.componentProps[0]
    const comp2Props = this.state.componentProps[1]
    return (
      <div>
        <div style={{ width: 800, height: 600, background: "red" }}>
          <h2>Component 1</h2>
          <div
            style={{
              width: 40,
              background: "blue",
              transition: comp1Props.value === comp1Props.finalValue ? `${comp1Props.property} ${comp1Props.duration}s ${comp1Props.ease}` : null,
              height: comp1Props.value
            }}
          />
          <h2>Component 2</h2>
          <div
            style={{
              width: 80,
              background: "blue",
              transition: comp2Props.value === comp2Props.finalValue ? `${comp2Props.property} ${comp2Props.duration}s ${comp2Props.ease}` : null,
              height: comp2Props.value
            }}
          />
        </div>
        <label>Component to animate</label>
        <select
          value={this.state.selectedComponent}
          onChange={e =>
            this.setState({
              selectedComponent: e.target.value
            })
          }
        >
          {[0, 1].map(v => (
            <option value={v}>{v}</option>
          ))}
        </select>
        <label>Ease curve</label>
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
        </select>
        <button onClick={this.animate.bind(this)}>Animate</button>
      </div>
    );
  }
}

export default Canvas;
