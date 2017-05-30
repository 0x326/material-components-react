// @flow

import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import '@material/list/dist/mdc.list.css'

/**
 * ListGroupSubheader
 * @see https://material.io/components/web/catalog/input-controls/list-itemes/
 * @extends PureComponent
 * @prop {string} id
 * @prop {string} text
 */
export default class ListGroupSubheader extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    text: PropTypes.string
  }

  static defaultProps = {
  }

  render() {
    return (
      <h3 class="mdc-list-group__subheader">{this.props.text}</h3>
    )
  }
}
