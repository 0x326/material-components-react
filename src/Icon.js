// @flow

import React, { PureComponent } from 'react'
import classnames from 'classnames'
import 'material-design-icons/iconfont/material-icons.css'


/**
 * Icon
 * @extends PureComponent
 * @prop {string} id
 * @prop {string} iconName
 * @prop {string} className
 */
export default class Icon extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    iconName: PropTypes.string,
    className: PropTypes.string
  }

  static defaultProps = {
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
