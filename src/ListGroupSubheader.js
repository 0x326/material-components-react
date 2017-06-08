// @flow

import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import '@material/list/dist/mdc.list.css'

/**
 * @see https://material.io/components/web/catalog/input-controls/list-itemes/
 */
export default class ListGroupSubheader extends PureComponent {
  static propTypes = {
    /** Optional HTML id */
    id: PropTypes.string,
    /** Header text */
    text: PropTypes.string
  }

  static defaultProps = {
    id: ""
  }

  render() {
    return (
      <h3 className="mdc-list-group__subheader">{this.props.text}</h3>
    )
  }
}
