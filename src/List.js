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
import classnames from 'classnames'
import '@material/list/dist/mdc.list.css'

/**
 * List
 * @see https://material.io/components/web/catalog/input-controls/list-itemes/
 * @extends PureComponent
 * @prop {string} id
 * @prop {boolean} dense
 * @prop {boolean} twoLine
 * @prop {string} maxWidth
 */
export default class List extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    dense: PropTypes.bool,
    twoLine: PropTypes.bool,
    bordered: PropTypes.bool,
    maxWidth: PropTypes.string
  }

  static defaultProps = {
    dense: false,
    twoLine: false,
    bordered: false
  }

  state = {
  }

  render() {
    const borderCSS =
    `.list-border {
      /* remove the side padding. we'll be placing it around the item instead. */
      padding-right: 0;
      padding-left: 0;
    }
    .list-border .mdc-list-item {
      /* Add the list side padding padding to the list item. */
      padding: 0 16px;
      /* Add a border around each element. */
      border: 1px solid rgba(0, 0, 0, .12);
    }
    /* Ensure adjacent borders don't collide with one another. */
    .list-border .mdc-list-item:not(:first-child) {
      border-top: none;
    }`
    return (
      <ul className={classnames("mdc-list", {
        "mdc-list--dense": this.props.dense,
        "mdc-list--two-line": this.props.twoLine,
        "list-border": this.props.bordered
      })} style={this.props.maxWidth && {maxWidth: this.props.maxWidth}}>
        {this.props.bordered && <style>{borderCSS}</style>}
        {this.props.children}
      </ul>
    )
  }
}
