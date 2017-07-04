// This file contains modified code from the original version

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable */
// @flow

import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Set as ImmutableSet, Map as ImmutableMap} from 'immutable'
import classnames from 'classnames'
// Temporarily using relative reference until we publish on npm.
import {getCorrectEventName} from '@material/animation/dist/mdc.animation'
import {MDCRipple, MDCRippleFoundation} from '@material/ripple/dist/mdc.ripple'
import '@material/switch/dist/mdc.switch.css'

function getMatchesProperty(HTMLElementPrototype) {
  return [
    'webkitMatchesSelector', 'msMatchesSelector', 'matches',
  ].filter((p) => p in HTMLElementPrototype).pop()
}

const MATCHES = getMatchesProperty(HTMLElement.prototype)

/**
 * @see https://material.io/components/web/catalog/input-controls/switches/
 */
export default class Switch extends PureComponent {
  static propTypes = {
    /** Optional HTML id */
    id: PropTypes.string,
    /** Text for aria-labelledby attribute */
    ariaLabelId: PropTypes.string,
    /** Specifies whether this switch begins checked or not.
     * If this prop is changes, the switch will reflect the latest change */
    checked: PropTypes.bool,
    /** Specifies whether this switch is disabled or not */
    disabled: PropTypes.bool,
    /** The label text for this switch */
    labelText: PropTypes.string,
    /** A listener for the `change` event */
    onChange: PropTypes.func
  }

  static defaultProps = {
    id: "",
    ariaLabelId: "",
    checked: false,
    disabled: false,
    labelText: "",
    onChange: (event: Event) => {}
  }

  state = {
    classes: new ImmutableSet(),
    rippleCss: new ImmutableMap(),
    checkedInternal: this.props.checked,
    disabledInternal: this.props.disabled
  }

  // For browser compatibility we extend the default adapter which checks for css variable support.
  rippleFoundation = new MDCRippleFoundation(Object.assign(MDCRipple.createAdapter(this), {
    isUnbounded: () => true,
    isSurfaceActive: () => this.refs.nativeCb[MATCHES](':active'),
    addClass: className => this.setState(prevState => ({
      classes: prevState.classes.add(className)
    })),
    removeClass: className => this.setState(prevState => ({
      classes: prevState.classes.remove(className)
    })),
    registerInteractionHandler: (evtType, handler) => {
      this.refs.nativeCb.addEventListener(evtType, handler)
    },
    deregisterInteractionHandler: (evtType, handler) => {
      this.refs.nativeCb.removeEventListener(evtType, handler)
    },
    updateCssVariable: (varName, value) => this.setState(prevState => ({
      rippleCss: prevState.rippleCss.set(varName, value)
    })),
    computeBoundingRect: () => {
      const {left, top} = this.refs.root.getBoundingClientRect()
      const DIM = 40
      return {
        top,
        left,
        right: left + DIM,
        bottom: top + DIM,
        width: DIM,
        height: DIM,
      }
    },
  }))

  render() {
    // Within render, we generate the html needed to render a proper MDC-Web switch.
    return (
      <div>
        <div ref="root" className={classnames("mdc-switch", {
          "mdc-switch--disabled": this.state.disabledInternal
        })} >
          <input ref="nativeCb"
            type="checkbox"
            id="basic-switch"
            className="mdc-switch__native-control"
            checked={this.state.checkedInternal}
            disabled={this.state.disabledInternal}
            onChange={evt => {
              this.setState({
                checkedInternal: this.refs.nativeCb.checked
              })
              this.props.onChange(evt)
            }} />
          <div className="mdc-switch__background">
            <div className="mdc-switch__knob"></div>
          </div>
        </div>
        {this.props.labelText !== '' && <label for="basic-switch" className="mdc-switch-label">
          {this.props.labelText}
        </label>}
      </div>
    )
  }

  // Within the two component lifecycle methods below, we invoke the foundation's lifecycle hooks
  // so that proper work can be performed.
  componentDidMount() {
    this.rippleFoundation.init()
  }
  componentWillUnmount() {
    this.rippleFoundation.destroy()
  }

  // Here we synchronize the internal state of the UI component based on what the user has specified.
  componentWillReceiveProps(props) {
    if (props.checked !== this.props.checked)
      this.setState({checkedInternal: props.checked})
    if (props.disabled !== this.props.disabled)
      this.setState({disabledInternal: props.disabled})
  }

  componentDidUpdate() {
    // To make the ripple animation work we update the css properties after React finished building the DOM.
    if (this.refs.root)
      this.state.rippleCss.forEach((v, k) => {
        this.refs.root.style.setProperty(k, v)
      })
  }
}
