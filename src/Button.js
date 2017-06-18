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
import '@material/button/dist/mdc.button.css'

function getMatchesProperty(HTMLElementPrototype) {
  return [
    'webkitMatchesSelector', 'msMatchesSelector', 'matches',
  ].filter((p) => p in HTMLElementPrototype).pop()
}

const MATCHES = getMatchesProperty(HTMLElement.prototype)

/**
 * @see https://material.io/components/web/catalog/input-controls/buttons/
 */
export default class Button extends PureComponent {
  static propTypes = {
    /** Optional HTML id */
    id: PropTypes.string,
    /** Button-text */
    text: PropTypes.string,
    /** Specifies whether this is an MDC dense button */
    dense: PropTypes.bool,
    /** Specifies whether this is a MDC raised button */
    raised: PropTypes.bool,
    /** Specifies whether this is a MDC compact button */
    compact: PropTypes.bool,
    /** Specifies this button is colored with the Material primary color */
    colorWithPrimary: PropTypes.bool,
    /** Specifies this button is colored with the Material accent color */
    colorWithAccent: PropTypes.bool,
    onChange: PropTypes.func
  }

  static defaultProps = {
    id: "",
    dense: false,
    raised: false,
    compact: false,
    colorWithPrimary: false,
    colorWithAccent: false,
    onChange: (event: Event) => {}
  }

  state = {
    classes: new ImmutableSet(),
    rippleCss: new ImmutableMap()
  }

  // For browser compatibility we extend the default adapter which checks for css variable support.
  //rippleFoundation = new MDCRipple.attachTo(this)
  rippleFoundation = new MDCRippleFoundation(Object.assign(MDCRipple.createAdapter(this), {
    isUnbounded: () => true,
    isSurfaceActive: () => this.refs.root[MATCHES](':active'),
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
      this.refs.root.addEventListener(evtType, handler)
    },
    deregisterInteractionHandler: (evtType, handler) => {
      this.refs.root.removeEventListener(evtType, handler)
    },
    updateCssVariable: (varName, value) => {
      this.setState(prevState => ({
        rippleCss: prevState.rippleCss.set(varName, value)
      }))
    },
    computeBoundingRect: () => {
      //TODO: Figure out why ripple does not vary when the user clicks on the button in in different locations
      return this.refs.root.getBoundingClientRect()
    },
  }))

  render() {
    // Within render, we generate the html needed to render a proper MDC-Web button.
    return (
      <button ref="root" className={classnames('mdc-button', {
        'mdc-button--dense': this.props.dense,
        'mdc-button--raised': this.props.raised,
        'mdc-button--compact': this.props.compact,
        'mdc-button--primary': this.props.primary,
        'mdc-button--accent': this.props.accent
      }, this.state.classes.toJS().join(' '))} >
        {this.props.text}
      </button>
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
    // Nothing to do
  }

  componentDidUpdate() {
    // To make the ripple animation work we update the css properties after React finished building the DOM.
    if (this.refs.root) {
      this.state.rippleCss.forEach((v, k) => {
        this.refs.root.style.setProperty(k, v)
      })
    }
  }
}
