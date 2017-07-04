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
import {MDCTextfieldFoundation} from '@material/textfield/dist/mdc.textfield'
import '@material/textfield/dist/mdc.textfield.css'

function getMatchesProperty(HTMLElementPrototype) {
  return [
    'webkitMatchesSelector', 'msMatchesSelector', 'matches',
  ].filter((p) => p in HTMLElementPrototype).pop()
}

const {ANIM_END_EVENT_NAME} = MDCTextfieldFoundation.strings

const MATCHES = getMatchesProperty(HTMLElement.prototype)

/**
 * @see https://material.io/components/web/catalog/input-controls/text-fields/
 */
export default class Textfield extends PureComponent {
  static propTypes = {
    /** Optional HTML id */
    id: PropTypes.string,
    /** Text for aria-labelledby attribute */
    ariaLabelId: PropTypes.string,
    /** Value for input-type HTML5 attribute */
    inputType: PropTypes.string,
    /** Field label text */
    hintText: PropTypes.string,
    /** Regular expression for input-pattern HTML5 attribute */
    matchPattern: PropTypes.instanceOf(RegExp),
    /** Marks whether the field is required */
    required: PropTypes.bool,
    /** Defines a value for this field before user input */
    prefilledValue: PropTypes.string,
    /** Assistant text to appear underneath the field */
    helpText: PropTypes.string,
    /** Determines whether the helper text persists when losing focus */
    helpTextPinned: PropTypes.bool,
    /** Modifies the helper texts default behavior.
     * Will only be shown when the field is invalid (due to the matchPattern
     * or a failure to fill a required field) */
    useHelpTextForValidationMessage: PropTypes.bool,
    /** Specifies whether this field is dense */
    dense: PropTypes.bool,
    /** Specifies whether this textfield is disabled or not */
    disabled: PropTypes.bool,
    /** A listener for the `change` event */
    onChange: PropTypes.func
  }

  static defaultProps = {
    id: "",
    ariaLabelId: "",
    inputType: "text",
    matchPattern: /.+/,
    required: false,
    prefilledValue: "",
    helpText: "",
    helpTextPinned: false,
    useHelpTextForValidationMessage: false,
    dense: false,
    disabled: false,
    onChange: (event: Event) => {}
  }

  state = {
    classes: new ImmutableSet(),
    rippleCss: new ImmutableMap(),
    text: this.props.prefilledValue,
    isFocused: false,
    isInputValid: true
  }

  // Here we initialize a foundation class, passing it an adapter which tells it how to
  // work with the React component in an idiomatic way.
  foundation = new MDCTextfieldFoundation({
    addClass: className => this.setState(prevState => ({
      classes: prevState.classes.add(className)
    })),
    removeClass: className => this.setState(prevState => ({
      classes: prevState.classes.remove(className)
    })),
    registerAnimationEndHandler: handler => {
      if (this.refs.root)
        this.refs.root.addEventListener(getCorrectEventName(window, 'animationend'), handler)
    },
    deregisterAnimationEndHandler: handler => {
      if (this.refs.root)
        this.refs.root.removeEventListener(getCorrectEventName(window, 'animationend'), handler)
    },
    registerChangeHandler: handler => {
      // Note that this could also be handled outside of using the native DOM API.
      // For example, onChange within render could delegate to a function which calls
      // the handler passed here, as well as performs the other business logic. The point
      // being our foundations are designed to be adaptable enough to fit the needs of the host
      // platform.
      if (this.refs.nativeCb)
        this.refs.nativeCb.addEventListener('change', handler)
    },
    deregisterChangeHandler: handler => {
      if (this.refs.nativeCb)
        this.refs.nativeCb.removeEventListener('change', handler)
    },
    getNativeControl: () => {
      if (!this.refs.nativeCb)
        throw new Error('Invalid state for operation')
      return this.refs.nativeCb
    },
    forceLayout: () => {
      if (this.refs.nativeCb)
        this.refs.nativeCb.offsetWidth
    },
    isAttachedToDOM: () => Boolean(this.refs.nativeCb),
  })

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
    // Within render, we generate the html needed to render a proper MDC-Web textfield.
    return (
      <div>
        <div ref="root" className={classnames("mdc-textfield","mdc-textfield--upgraded", {
          "mdc-textfield--disabled": this.props.disabled,
          "mdc-textfield--dense": this.props.dense,
          "mdc-textfield--focused": this.state.isFocused,
          "mdc-textfield--invalid": !this.state.isInputValid
        }, this.state.classes.toJS().join(' '))}>
          <input ref="nativeCb" id={this.props.id}
            type={this.props.inputType}
            className="mdc-textfield__input"
            pattern={this.props.matchPattern}
            required={this.props.required}
            disabled={this.props.disabled}
            value={this.state.text}
            onChange={event => {
              this.setState({
                text: this.refs.nativeCb.value
              })
            }}
            onFocus={event => {
              this.setState({
                isFocused: true
              })
            }}
            onBlur={event => {
              this.setState(prevState => ({
                isFocused: false,
                isInputValid: this.props.required ? this.props.matchPattern.test(prevState.text) : true
              }))
            }}
          />
          <label for={this.props.id} className={classnames("mdc-textfield__label", {
            "mdc-textfield__label--float-above": this.state.text !== '' || this.state.isFocused
          })}>
            {this.props.hintText}
          </label>
        </div>
        {this.props.helpText !== '' &&
          <p id={this.props.id + '-helptext'} className={classnames("mdc-textfield-helptext", {
            "mdc-textfield-helptext--persistent": this.props.helpTextPinned,
            "mdc-textfield-helptext--validation-msg": this.props.useHelpTextForValidationMessage
          })} aria-hidden="true">
            {this.props.helpText}
          </p>
        }
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
  }

  // Since we cannot set an indeterminate attribute on a native textfield, we use componentDidUpdate to update
  // the indeterminate value of the native textfield whenever a change occurs (as opposed to doing so within
  // render()).
  componentDidUpdate() {
    // To make the ripple animation work we update the css properties after React finished building the DOM.
    if (this.refs.root)
      this.state.rippleCss.forEach((v, k) => {
        this.refs.root.style.setProperty(k, v)
      })
  }
}
