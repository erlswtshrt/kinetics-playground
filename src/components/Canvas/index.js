import React from "react";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    const initialProps = {
      property: "opacity",
      duration: 0.2,
      initialValue: 1,
      finalValue: 1,
      ease: "ease-in",
      delay: 0
    }

    this.state = {
      componentsAdded: 0,

      selectedComponent: 'menu',

      // tokenized properties
      durationValues: [0.2, 0.3, 0.5, 1],
      easeValues: ["ease-in", "ease-out", "ease-in-out"],
      properties: ['height', 'opacity'],

      menuValue: initialProps.initialValue,
      button1Value: initialProps.initialValue,
      button2Value: initialProps.initialValue,
      button3Value: initialProps.initialValue,

      menuProps: JSON.parse(JSON.stringify(initialProps)),
      button1Props: JSON.parse(JSON.stringify(initialProps)),
      button2Props: JSON.parse(JSON.stringify(initialProps)),
      button3Props: JSON.parse(JSON.stringify(initialProps)),
    };
  }

  getTotalDuration() {
    return Math.max(this.state.menuProps.duration,
      this.state.button1Props.duration,
      this.state.button2Props.duration,
      this.state.button3Props.duration) * 1000
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
    }, this.getTotalDuration() + 1000);
  }

  handleChangeProperty(property, value, component) {
    const newProps = this.state[`${component}Props`]
    newProps[property] = value
    this.setState({ [`${component}Props`]: Object.assign(newProps, {}) })
    if (property === 'initialValue') this.setState({
      [`${component}Value`]: value
    })
  }

  renderPropMenu() {
    const comp = this.state.selectedComponent
    const props = this.state[`${comp}Props`]

    return <div style={{ background: 'pink' }}>
      <h2 style={{ margin: '15px 5px', fontSize: 20 }}>{this.state.selectedComponent} Properties</h2>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ margin: 5 }}>Property</label>
          <select
            style={{ margin: 5 }}
            value={props.property}
            onChange={e => this.handleChangeProperty('property', e.target.value, comp)}
          >
            {this.state.properties.map(v => (<option value={v}>{v}</option>))}
          </select>
          <label style={{ margin: 5 }}>Inital Value</label>
          <input type="text"
            style={{ margin: 5 }}
            value={props.initialValue}
            onChange={v => this.handleChangeProperty('initialValue', v.target.value, comp)} />
          <label style={{ margin: 5 }}>Final Value</label>
          <input type="text"
            style={{ margin: 5 }}
            value={props.finalValue}
            onChange={v => this.handleChangeProperty('finalValue', v.target.value, comp)} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ margin: 5 }}>Duration</label>
          <select
            style={{ margin: 5 }}
            value={props.duration}
            onChange={e => this.handleChangeProperty('duration', e.target.value, comp)}
          >
            {this.state.durationValues.map(v => (<option value={v}>{v}</option>))}
          </select>
          <label style={{ margin: 5 }}>Ease</label>
          <select
            style={{ margin: 5 }}
            value={props.ease}
            onChange={e => this.handleChangeProperty('ease', e.target.value, comp)}
          >
            {this.state.easeValues.map(v => (<option value={v}>{v}</option>))}
          </select>
        </div>
      </div >
    </div>
  }

  changeSelectedComponent(selectedComponent) {
    this.setState({ selectedComponent })
  }

  renderComponentPanel() {
    const incComps = () => this.setState({
      componentsAdded: this.state.componentsAdded + 1,
      menuValue: this.state.menuProps.initialValue,
      button1Value: this.state.button1Props.initialValue,
      button2Value: this.state.button2Props.initialValue,
      button3Value: this.state.button3Props.initialValue
    })

    const reset = () => this.setState({
      componentsAdded: 0,
      menuValue: this.state.menuProps.initialValue,
      button1Value: this.state.button1Props.initialValue,
      button2Value: this.state.button2Props.initialValue,
      button3Value: this.state.button3Props.initialValue
    })

    return <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ margin: '10px 10px', fontSize: 20 }}>Add Components</h2>
      <button style={{ margin: 10, padding: 10, fontSize: 14 }} onClick={incComps}>Menu</button>
      <button style={{ margin: 10, padding: 10, fontSize: 14 }} onClick={incComps}>Button</button>
      <button style={{ margin: 10, padding: 10, fontSize: 14, background: 'black', color: 'white' }} onClick={reset}>Reset</button>
    </div>
  }

  renderTimeline() {
    const setSelectedComponent = selectedComponent => this.setState({
      selectedComponent
    })

    return <div style={{ color: 'white', background: 'white', padding: 2, display: 'flex', flexDirection: 'column' }}>
      {this.state.componentsAdded > 0 ? <button onClick={setSelectedComponent.bind('menu')} style={{ background: 'green', padding: 10, margin: 2, width: this.state.menuProps.duration * 1000 }}>Menu</button> : null}
      {this.state.componentsAdded > 1 ? <button onClick={setSelectedComponent.bind('button1')} style={{ background: 'green', padding: 10, margin: 2, width: this.state.button1Props.duration * 1000 }}>Button1</button> : null}
      {this.state.componentsAdded > 2 ? <button onClick={setSelectedComponent.bind('button2')} style={{ background: 'green', padding: 10, margin: 2, width: this.state.button2Props.duration * 1000 }}>Button2</button> : null}
      {this.state.componentsAdded > 3 ? <button onClick={setSelectedComponent.bind('button3')} style={{ background: 'green', padding: 10, margin: 2, width: this.state.button3Props.duration * 1000 }}>Button3</button> : null}
    </div>
  }

  render() {
    const compileTransition = (comp) =>
      this.state[`${comp}Value`] === this.state[`${comp}Props`].finalValue ? `${this.state[`${comp}Props`].property} ${this.state[`${comp}Props`].duration}s ${this.state[`${comp}Props`].ease}` : null

    const menuStyle = {
      overflow: 'hidden',
      width: 300,
      height: this.state.menuProps.property === 'height' ? this.state.menuValue : 300,
      opacity: this.state.menuProps.property === 'opacity' ? this.state.menuValue : 1,
      padding: 10,
      background: "grey",
      transition: compileTransition('menu')
    }

    const button1Style = {
      margin: 5,
      padding: 15,
      background: "yellow",
      transition: compileTransition('button1'),
      opacity: this.state.button1Value
    }

    const button2Style = {
      margin: 5,
      padding: 15,
      background: "orange",
      transition: compileTransition('button2'),
      opacity: this.state.button2Value
    }

    const button3Style = {
      margin: 5,
      padding: 15,
      background: "purple",
      transition: compileTransition('button3'),
      opacity: this.state.button3Value
    }

    return (
      <div>
        <div style={{ display: 'flex' }}>
          {this.renderComponentPanel()}
          <div style={{ width: 600, height: 400, background: "white", overflow: 'hidden', padding: 30 }}>
            {this.state.componentsAdded > 0 ? <div style={menuStyle}>
              {this.state.componentsAdded > 1 ? <div style={button1Style}>Button 1</div> : null}
              {this.state.componentsAdded > 2 ? <div style={button2Style}>Button 2</div> : null}
              {this.state.componentsAdded > 3 ? <div style={button3Style}>Button 3</div> : null}
            </div> : null}
          </div>
          {this.renderPropMenu()}
        </div>
        <button style={{ margin: 10, padding: 10, fontSize: 20 }} onClick={this.animate.bind(this)}>Animate</button>
        {this.renderTimeline()}
      </div>
    );
  }
}

export default Canvas;
