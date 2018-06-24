import React, { Fragment } from "react";
import "./forms.css";
import ReactTooltip from "react-tooltip";

export default class Input extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.meta.active && this.props.meta.active) {
      this.input.focus();
    }
  }

  render() {
    let error;
    if (this.props.meta.touched && this.props.meta.error) {
      error = this.props.meta.error;
    }

    return (
      <Fragment>
        <div className="form-input">
          <label htmlFor={this.props.input.name}>{this.props.label}</label>
          <input
            {...this.props.input}
            id={this.props.input.name}
            type={this.props.type}
            ref={input => (this.input = input)}
          />
        </div>
        <div className="warning">
          {error ? (
            <i
              className="fas fa-exclamation-circle error"
              data-tip
              data-for="error"
            >
              <ReactTooltip id="error" type="error">
                <span>{error}</span>
              </ReactTooltip>
            </i>
          ) : null}
        </div>
      </Fragment>
    );
  }
}
