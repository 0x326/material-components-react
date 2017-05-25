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
// Temporarily using relative reference until we publish on npm.
import {getCorrectEventName} from '@material/animation/dist/mdc.animation'
import {MDCRipple, MDCRippleFoundation} from '@material/ripple/dist/mdc.ripple'
import {MDCRadioFoundation} from '@material/radio/dist/mdc.radio'
import '@material/radio/dist/mdc.radio.css'

function getMatchesProperty(HTMLElementPrototype) {
  return [
    'webkitMatchesSelector', 'msMatchesSelector', 'matches',
  ].filter((p) => p in HTMLElementPrototype).pop()
}

const {ANIM_END_EVENT_NAME} = MDCRadioFoundation.strings

const MATCHES = getMatchesProperty(HTMLElement.prototype)


/**
 * Radio Button
 * @see https://material.io/components/web/catalog/input-controls/radio-buttons/
 * @extends PureComponent
 * @prop {string} id
 * @prop {string} groupName
 * @prop {boolean} checked
 * @prop {boolean} disabled
 * @prop {function} onChange
 */
export default class Radio extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    groupName: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
  }

  static defaultProps = {
    checked: false,
    disabled: false,
    onChange: () => {}
  }

  state = {
    classes: new ImmutableSet(),
    rippleCss: new ImmutableMap(),
    checkedInternal: this.props.checked,
    disabledInternal: this.props.disabled
  }

  // Here we initialize a foundation class, passing it an adapter which tells it how to
  // work with the React component in an idiomatic way.
  foundation = new MDCRadioFoundation({
    addClass: className => this.setState(prevState => ({
      classes: prevState.classes.add(className)
    })),
    removeClass: className => this.setState(prevState => ({
      classes: prevState.classes.remove(className)
    })),
    getNativeControl: () => {
      if (!this.refs.nativeCb) {
        throw new Error('Invalid state for operation')
      }
      return this.refs.nativeCb
    }
  })

  // For browser compatibility we extend the default adapter which checks for css variable support.
  rippleFoundation = new MDCRippleFoundation(Object.assign(MDCRipple.createAdapter(this), {
    isUnbounded: () => true,
    isSurfaceActive: () => this.refs.nativeCb[MATCHES](':active'),
    addClass: className => {
      this.setState(prevState => ({
        classes: prevState.classes.add(className)
      }))
    },
    removeClass: className => {
      this.setState(prevState => ({
        classes: prevState.classes.remove(className)
      }))
    },
    registerInteractionHandler: (evtType, handler) => {
      this.refs.nativeCb.addEventListener(evtType, handler)
    },
    deregisterInteractionHandler: (evtType, handler) => {
      this.refs.nativeCb.removeEventListener(evtType, handler)
    },
    updateCssVariable: (varName, value) => {
      this.setState(prevState => ({
        rippleCss: prevState.rippleCss.set(varName, value)
      }))
    },
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
    // Within render, we generate the html needed to render a proper MDC-Web checkbox.
    return (
      <div ref="root" className={`mdc-radio ${this.state.classes.toJS().join(' ')}`}>
        <input ref="nativeCb"
          className="mdc-radio__native-control"
          type="radio"
          id={this.props.id}
          name={this.props.groupName}
          checked={this.state.checkedInternal}
          onChange={evt => {
            this.setState({
              checkedInternal: this.refs.nativeCb.checked
            })
            this.props.onChange(evt)
          }}/>
        <div className="mdc-radio__background">
          <div className="mdc-radio__outer-circle"></div>
          <div className="mdc-radio__inner-circle"></div>
        </div>
      </div>
    )
  }

  // Within the two component lifecycle methods below, we invoke the foundation's lifecycle hooks
  // so that proper work can be performed.
  componentDidMount() {
    this.foundation.init()
    this.rippleFoundation.init()
  }
  componentWillUnmount() {
    this.rippleFoundation.destroy()
    this.foundation.destroy()
  }

  // Here we synchronize the internal state of the UI component based on what the user has specified.
  componentWillReceiveProps(props) {
    if (props.checked !== this.props.checked) {
      this.setState({checkedInternal: props.checked, indeterminateInternal: false})
    }
    if (props.disabled !== this.props.disabled) {
      this.setState({disabledInternal: props.disabled})
    }
  }

  // Since we cannot set an indeterminate attribute on a native checkbox, we use componentDidUpdate to update
  // the indeterminate value of the native checkbox whenever a change occurs (as opposed to doing so within
  // render()).
  componentDidUpdate() {
    // To make the ripple animation work we update the css properties after React finished building the DOM.
    if (this.refs.root) {
      this.state.rippleCss.forEach((v, k) => {
        this.refs.root.style.setProperty(k, v)
      })
    }
  }
}
