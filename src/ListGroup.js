// @flow

import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import '@material/list/dist/mdc.list.css'

/**
 * @see https://material.io/components/web/catalog/input-controls/list-itemes/
 */
export default class ListGroup extends PureComponent {
  static propTypes = {
    /** Optional HTML id */
    id: PropTypes.string,
    /** Specifies a maximum width for the children of this group. Usually this is left `undefined`. */
    maxWidth: PropTypes.string
  }

  static defaultProps = {
    id: "",
    maxWidth: undefined
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
