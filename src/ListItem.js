// @flow

import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import '@material/list/dist/mdc.list.css'

export default class ListItem extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
    secondaryText: PropTypes.string,
    startDetail: PropTypes.element,
    endDetail: PropTypes.element,
    dense: PropTypes.bool
  }

  static defaultProps = {
    id: "",
    text: "",
    secondaryText: "",
    dense: false
  }

  state = {
  }

  render() {
    //TODO: Add support for controlling the location of detail items
    return (
      <li className="mdc-list-item"
        id={this.props.id}>
        {this.props.startDetail && <div className="mdc-list-item__start-detail" aria-hidden="true">
          {this.props.startDetail}
        </div>}
        {this.props.secondaryText.length === 0 ? this.props.text :
          <span className="mdc-list-item__text">
            {this.props.text}
            <span className="mdc-list-item__text__secondary">{this.props.secondaryText}</span>
          </span>}
        {this.props.endDetail && <div className="mdc-list-item__end-detail" aria-hidden="true">
          {this.props.endDetail}
        </div>}
      </li>
    )
  }
}
