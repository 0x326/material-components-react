// @flow

import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import '@material/list/dist/mdc.list.css'

/**
 * ListGroupDivider
 * @see https://material.io/components/web/catalog/input-controls/list-itemes/
 * @extends PureComponent
 * @prop {string} id
 */
export default class ListGroupDivider extends PureComponent {
  static propTypes = {
    id: PropTypes.string
  }

  static defaultProps = {
  }

  render() {
    return (
      <hr id={this.props.id} className="mdc-list-divider" />
    )
  }
}
