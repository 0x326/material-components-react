// @flow

import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import '@material/list/dist/mdc.list.css'

/**
 * ListGroup
 * @see https://material.io/components/web/catalog/input-controls/list-itemes/
 * @extends PureComponent
 * @prop {string} id
 * @prop {string} maxWidth
 */
export default class ListGroup extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    maxWidth: PropTypes.string
  }

  static defaultProps = {
  }

  render() {
    return (
      <div id={this.props.id}
        className="mdc-list-group"
        style={this.props.maxWidth && {maxWidth: this.props.maxWidth}}>
        {this.props.children}
      </div>
    )
  }
}
