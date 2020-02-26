import React, { PropTypes } from "react";
import Menu from "../Menu";
import MenuItem from "../MenuItem";
import GhostingPanel from "../GhostingPanel";
import StageGhosting from "../StageGhosting";
import Stage from "../Stage";
import TimelineBar from "../TimelineBar";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    const initialProps = {
      property: "opacity",
      duration: 0.2,
      initialValue: 1,
      finalValue: 1,
      value: 1,
      ease: "ease-in",
      delay: 0
    }

    this.state = {
      componentProps: [],
      componentsAdded: 0,
      initialProps: JSON.parse(JSON.stringify(initialProps)),
      selectedComponent: 0,
      durationValues: [0.2, 0.3, 0.5, 1],
      easeValues: ["ease-in", "ease-out", "ease-in-out"],
      properties: ['max-height', 'height', 'opacity'],
    };
  }

  componentDidMount() {
    this.animate()
  }

  getTotalDuration() {
    return Math.max(...this.state.componentProps.map(p => p.duration * 1000 + p.delay * 1000))
  }

  modifyProp(i, property, value) {
    let newArr = this.state.componentProps
    const newProps = newArr[i]
    newProps[property] = value
    newArr.splice(i, 1, newProps)
    this.setState({ componentProps: newArr })
  }

  animate() {
    this.state.componentProps.forEach((c, i) =>
      this.modifyProp(i, 'value', c.finalValue)
    )

    setTimeout(() => {
      this.state.componentProps.forEach((c, i) => {
        this.modifyProp(i, 'value', c.initialValue)
      })

      setTimeout(() => { this.animate() }, 500)
    }, this.getTotalDuration() + 1000);
  }

  getDurationToken(v) {
    switch (v) {
      case 1:
        return 'speed-very-slow'
      case 0.5:
        return 'speed-slow'
      case 0.3:
        return 'speed-fast'
      case 0.2:
        return 'speed-very-fast'
      default:
        return 'speed-very-fast'
    }
  }

  renderPropMenu() {
    const comp = this.state.selectedComponent
    const props = this.state.componentProps[comp]

    return <div style={{ background: 'pink' }}>
      <h2 style={{ margin: '15px 5px', fontSize: 20 }}>{this.getNameForComponent(this.state.selectedComponent)} Properties</h2>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ margin: 5 }}>Property</label>
          <select
            style={{ margin: 5 }}
            value={props.property}
            onChange={e => this.modifyProp(comp, 'property', e.target.value)}
          >
            {this.state.properties.map(v => (<option value={v}>{v}</option>))}
          </select>
          <label style={{ margin: 5 }}>Inital Value</label>
          <input type="text"
            style={{ margin: 5 }}
            value={props.initialValue}
            onChange={v => this.modifyProp(comp, 'initialValue', v.target.value)} />
          <label style={{ margin: 5 }}>Final Value</label>
          <input type="text"
            style={{ margin: 5 }}
            value={props.finalValue}
            onChange={v => this.modifyProp(comp, 'finalValue', v.target.value)} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ margin: 5 }}>Speed</label>
          <select
            style={{ margin: 5 }}
            value={props.duration}
            onChange={e => this.modifyProp(comp, 'duration', e.target.value)}
          >
            {this.state.durationValues.map(v => (<option value={v}>{this.getDurationToken(v)}</option>))}
          </select>
          <label style={{ margin: 5 }}>Delay</label>
          <input type="text"
            style={{ margin: 5 }}
            value={props.delay}
            onChange={v => this.modifyProp(comp, 'delay', v.target.value)} />
          <label style={{ margin: 5 }}>Ease</label>
          <select
            style={{ margin: 5 }}
            value={props.ease}
            onChange={e => this.modifyProp(comp, 'ease', e.target.value)}
          >
            {this.state.easeValues.map(v => (<option value={v}>{v}</option>))}
          </select>
        </div>
      </div >
      {/* <button onClick={this.resetPropsForComponent.bind(this)} style={{ margin: 5, padding: 10, fontSize: 14 }}>Reset All</button> */}
      <GhostingPanel />
    </div>
  }

  changeSelectedComponent(selectedComponent) {
    this.setState({ selectedComponent })
  }

  addNewComponent() {
    let newArr = this.state.componentProps
    newArr.push(JSON.parse(JSON.stringify(this.state.initialProps)))
    this.setState({ componentProps: newArr })
  }

  renderComponentPanel() {
    return <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ margin: '10px 10px', fontSize: 20 }}>Add Components</h2>
      <ul className="slds-p-around_medium">
        <li>
          <button className="slds-button slds-button_neutral slds-button_stretch slds-m-bottom_medium" onClick={this.addNewComponent.bind(this)}>Menu</button>
        </li>
        <li>
          <button className="slds-button slds-button_neutral slds-button_stretch slds-m-bottom_medium" onClick={this.addNewComponent.bind(this)}>Button</button>
        </li>
        <li>
          {/* <button className="slds-button slds-button_brand slds-button_stretch slds-m-bottom_medium" onClick={reset}>Reset</button> */}
        </li>
      </ul>
    </div>
  }

  renderButton(i) {
    let props = this.state.componentProps[i]

    const style = {
      height: props.property === 'height' ? props.value : null,
      maxHeight: props.property === 'max-height' ? props.value : null,
      opacity: props.property === 'opacity' ? props.value : 1,
      transition: this.compileTransition(i)
    }

    // {/* to smoothly animate things, we might need the menu button items already in the menu, but just have them hidden at first */}
    // {/* taking out isHidden={this.state.componentsAdded <= 1} attribute for now */}

    return (
      <MenuItem isHidden={false} key={`Button ${i}`} canvasStyles={style} label={`Button ${i}`} />
    )
  }

  getNameForComponent(i) {
    return i === 0 ? 'Menu' : `Button ${i}`
  }

  renderMenu() {
    const numberOfComps = this.state.componentProps.length
    if (numberOfComps === 0) return null
    const menuProps = this.state.componentProps[0]
    const style = {
      overflow: 'hidden',
      height: menuProps.property === 'height' ? menuProps.value : menuProps === 'max-height' ? null : 200,
      maxHeight: menuProps.property === 'max-height' ? menuProps.value : null,
      opacity: menuProps.property === 'opacity' ? menuProps.value : 1,
      transition: this.compileTransition(0)
    }

    return (

        numberOfComps > 0 &&
        <Menu itemCount={numberOfComps} canvasStyles={style}>
          {this.state.componentProps.slice(1).map((_, i) => this.renderButton(i + 1))}
        </Menu>

    )
  }

  setSelectedComponent(selectedComponent) {
    this.setState({
      selectedComponent
    })
  }

  renderTimeline() {
    return <div style={{ color: 'white', background: 'white', padding: 2, display: 'flex', flexDirection: 'column' }}>
      {
        this.state.componentProps.map((comp, i) => <button key={i} onClick={this.setSelectedComponent.bind(this, i)} style={{ background: this.state.selectedComponent === i ? 'green' : 'blue', padding: 10, margin: 2, width: comp.duration * 500, marginLeft: comp.delay * 500 }}>{this.getNameForComponent(i)}</button>)
      }
    </div>
  }

  compileTransition(comp) {
    let props = this.state.componentProps[comp]
    let property = this.state.componentProps[comp].property
    return props.finalValue === props.value ? `${property} ${props.duration}s ${props.ease} ${props.delay}s` : null
  }

  render() {
    return (
      <div>
        <div style={{ display: 'flex', borderBottom: '2px black solid' }}>
          {this.renderComponentPanel()}
          <Stage>
            {this.context.currentMode === "ghosting" && <StageGhosting />}
            {this.context.currentMode === "animating" && this.renderMenu()}
          </Stage>
          {this.state.componentProps.length > 0 ? this.renderPropMenu() : null}
        </div>
        {/* <button style={{ margin: 10, padding: 10, fontSize: 20 }} onClick={this.animate.bind(this)}>Animate</button> */}
        {this.renderTimeline()}
      </div >
    );
  }
}

Canvas.contextTypes = {
  currentMode: PropTypes.string,
};

export default Canvas;
