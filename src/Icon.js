// @flow

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import 'material-design-icons/iconfont/material-icons.css'

/**
 * @see https://material.io/icons/
 */
export default class Icon extends PureComponent {
  static propTypes = {
    /** Optional HTML id */
    id: PropTypes.string,
    /** Material Design Icon name */
    iconName: PropTypes.string,
    /** Optional placeholder for additional class names */
    className: PropTypes.string
  }

  static defaultProps = {
    id: "",
    className: ""
  }

  state = {
  }

  render() {
    return (
      <i id={this.props.id}
        className={classnames("material-icons", this.props.className)}
        aria-hidden="true">
        {this.props.iconName}
      </i>
    )
  }
}
