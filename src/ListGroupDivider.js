// @flow

import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import '@material/list/dist/mdc.list.css'

/**
 * @see https://material.io/components/web/catalog/input-controls/list-itemes/
 */
export default class ListGroupDivider extends PureComponent {
  static propTypes = {
    /** Optional HTML id */
    id: PropTypes.string
  }

  static defaultProps = {
    id: ""
  }

  render() {
    return (
      <hr id={this.props.id} className="mdc-list-divider" />
    )
  }
}
