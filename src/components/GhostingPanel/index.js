import React, { PropTypes } from 'react';
import styles from './styles.scss';

class GhostingPanel extends React.Component {
  render() {
    const { currentMode, handleModeChange } = this.context;
    return(
      <div>
        <div className="slds-form-element">
          <label className="slds-checkbox_toggle slds-grid">
            <span className="slds-form-element__label slds-m-bottom_none">Ghosting Mode</span>
            <input
              onChange={e => handleModeChange(e.target.checked ? "ghosting" : "animating")}
              type="checkbox"
              checked={currentMode === "ghosting"}
              name="ghosting-toggle"
              value="ghosting-toggle"
              aria-describedby="ghosting-toggle"
            />
            <span id="ghosting-toggle" className="slds-checkbox_faux_container" aria-live="assertive">
              <span className="slds-checkbox_faux"></span>
              <span className="slds-checkbox_on">Enabled</span>
              <span className="slds-checkbox_off">Disabled</span>
            </span>
          </label>
        </div>
      </div>
    );
  }
}

GhostingPanel.contextTypes = {
  currentMode: PropTypes.string,
  handleModeChange: PropTypes.func
};

export default GhostingPanel;
