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
import classnames from 'classnames'
import '@material/list/dist/mdc.list.css'

function getMatchesProperty(HTMLElementPrototype) {
  return [
    'webkitMatchesSelector', 'msMatchesSelector', 'matches',
  ].filter((p) => p in HTMLElementPrototype).pop()
}

const MATCHES = getMatchesProperty(HTMLElement.prototype)

/**
 * @see https://material.io/components/web/catalog/input-controls/list-itemes/
 */
export default class ListItem extends PureComponent {
  static propTypes = {
    /** Optional HTML id */
    id: PropTypes.string,
    /** Item text */
    text: PropTypes.string,
    /** Optional second-line text */
    secondaryText: PropTypes.string,
    /** Optional start MDC detail. Use an Icon */
    startDetail: PropTypes.element,
    /** Optional end MDC detail Use an Icon */
    endDetail: PropTypes.element
  }

  static defaultProps = {
    id: "",
    text: "",
    secondaryText: "",
    startDetail: undefined,
    endDetail: undefined
  }

  state = {
    classes: new ImmutableSet(),
    rippleCss: new ImmutableMap()
  }

  // For browser compatibility we extend the default adapter which checks for css variable support.
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
      //TODO: Figure out why ripple does not vary with touch location
      return this.refs.root.getBoundingClientRect()
    },
  }))

  render() {
    // Within render, we generate the html needed to render a proper MDC-Web list-item.
    //TODO: Add support for controlling the location of detail items
    return (
      <li ref="root" className={classnames("mdc-list-item", this.state.classes.toJS().join(' '))}
        id={this.props.id}>
        {this.props.startDetail && <div className="mdc-list-item__start-detail" aria-hidden="true">
          {this.props.startDetail}
        </div>}
        {this.props.secondaryText.length === 0 ? this.props.text :
          <span className="mdc-list-item__text">
            {this.props.text}
            <span className="mdc-list-item__text__secondary">{this.props.secondaryText}</span>
          </span>}
        {this.props.endDetail && <div className="mdc-list-item__end-detail" aria-hidden="true">
          {this.props.endDetail}
        </div>}
      </li>
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
  }

  // Since we cannot set an indeterminate attribute on a native list-item, we use componentDidUpdate to update
  // the indeterminate value of the native list-item whenever a change occurs (as opposed to doing so within
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
