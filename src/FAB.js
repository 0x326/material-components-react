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
import '@material/fab/dist/mdc.fab.css'
import 'material-design-icons/iconfont/material-icons.css'

function getMatchesProperty(HTMLElementPrototype) {
  return [
    'webkitMatchesSelector', 'msMatchesSelector', 'matches',
  ].filter((p) => p in HTMLElementPrototype).pop()
}

const MATCHES = getMatchesProperty(HTMLElement.prototype)

/**
 * @see https://material.io/components/web/catalog/buttons/floating-action-buttons/
 */
export default class FAB extends PureComponent {
  static propTypes = {
    /** The name of a Material Design Icon */
    iconName: PropTypes.string,
    /** An ID for this FAB */
    id: PropTypes.string,
    /** Whether this FAB should be mini; see MDC documentation */
    mini: PropTypes.bool,
    /** Whether this FAB should be plain; see MDC documentation*/
    plain: PropTypes.bool,
    /**
     * An object detailing where this FAB is to be absolutely positioned.
     *
     * Define any of the following properties with a string representing a CSS value:
     *
     * - `bottom`
     * - `right`
     * - `left`
     * - `top`
     *
     * In addition, you can define the following properties for a CSS `@media` conditional:
     *
     * - `condition`
     * - `condBottom`
     * - `condRight`
     * - `condLeft`
     * - `condTop`
     *
     * If you wish to specify more than one @media condition, use the following longhand form.
     * Pass an array of objects with any of the following properties:
     *
     * - `mediaCondition`
     * - `bottom`
     * - `right`
     * - `left`
     * - `top`
     */
    position: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.object)
    ]),
    ariaLabel: PropTypes.string,
    onChange: PropTypes.func
  }

  static defaultProps = {
    id: "",
    iconName: "",
    mini: false,
    plain: false,
    position: undefined,
    ariaLabel: "",
    onChange: () => {}
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
      return this.refs.root.getBoundingClientRect()
      /*const {left, top} = this.refs.root.getBoundingClientRect()
      const DIM = 40
      return {
        top,
        left,
        right: left + DIM,
        bottom: top + DIM,
        width: DIM,
        height: DIM,
      }*/
    },
  }))

  render() {
    // Compute CSS for absolute styling
    let absoluteCSS = ""
    const absolutePosition = this.props.position;
    if (absolutePosition instanceof Object) {
      // Convert prop shorthand to full array structure
      let Criteria: Object[]
      if (absolutePosition instanceof Array)
        // prop is already in longhand
        Criteria = absolutePosition
      else {
        Criteria = [{
          mediaCondition: '',
          bottom: absolutePosition.bottom || '',
          right: absolutePosition.right || '',
          left: absolutePosition.left || '',
          top: absolutePosition.top || ''
        }, {
          mediaCondition: absolutePosition.condition || '',
          bottom: absolutePosition.condBottom || '',
          right: absolutePosition.condRight || '',
          left: absolutePosition.condLeft || '',
          top: absolutePosition.condTop || ''
        }]
      }
      // Construct CSS rules
      for (let Criterion of Criteria) {
        let cssProperties = [
          'mediaCondition',
          'bottom',
          'right',
          'left',
          'top'
        ]
        // Ensure every property value is
        for (let property of cssProperties) {
          Criterion[property] = typeof Criterion[property] === 'string' ? Criterion[property] : ''
        }

        if (Criterion.mediaCondition !== '')
          absoluteCSS += `@media(${Criterion.mediaCondition}) {` + '\n'
        absoluteCSS += this.props.id !== '' ? '#' + this.props.id : ''
        absoluteCSS += `.app-fab--absolute.app-fab--absolute {
          position: absolute;` + '\n'

        if (Criterion.bottom !== '')
          absoluteCSS += `bottom: ${Criterion.bottom};` + '\n'
        if (Criterion.right !== '')
          absoluteCSS += `right: ${Criterion.right};` + '\n'
        if (Criterion.left !== '')
          absoluteCSS += `left: ${Criterion.left};` + '\n'
        if (Criterion.top !== '')
          absoluteCSS += `top: ${Criterion.top};` + '\n'

        absoluteCSS += '}\n'
        if (Criterion.mediaCondition !== '')
          absoluteCSS += '}\n'
      }
    }
    return (
      <button ref="root" id={this.props.id}
        className={classnames("mdc-fab", "material-icons", {
          "mdc-fab--mini": this.props.mini,
          "mdc-fab--plain": this.props.plain,
          "app-fab--absolute": absoluteCSS !== ''
        })}
        aria-label={this.props.ariaLabel}>
        <style>{absoluteCSS}</style>
        <span className="mdc-fab__icon">
          {this.props.iconName}
          {this.props.iconName.length === 0 && this.props.children}
        </span>
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
  }

  // Since we cannot set an indeterminate attribute on a native fab, we use componentDidUpdate to update
  // the indeterminate value of the native fab whenever a change occurs (as opposed to doing so within
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
