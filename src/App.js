// This file has been modified from its original version

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

import React, {PureComponent, PropTypes} from 'react'

import Checkbox from './Checkbox'
import CheckboxLabel from './CheckboxLabel'
import FormField from './FormField'
import Radio from './Radio'
import ListItem from './ListItem'
import Button from './Button'
import FAB from './FAB'

export default class App extends PureComponent {
  state = {
    checked: false,
    disabled: false,
    indeterminate: false,
    status: "unchecked",
    changeEventCount: 0
  }

  render() {
    const {checked, disabled, indeterminate, status, changeEventCount} = this.state
    return (
      <div>
        <h1>MDC-Web - React Examples</h1>
        <main>
          <h2>Checkbox</h2>
          <FormField>
            <Checkbox id="my-checkbox"
                      labelId="my-checkbox-label"
                      disabled={disabled}
                      indeterminate={indeterminate}
                      onChange={({target}) => this.setState({
                        changeEventCount: changeEventCount + 1,
                        checked: target.checked,
                        indeterminate: false
                      })}/>
            <CheckboxLabel id="my-checkbox-label" for="my-checkbox">
              The checkbox is currently {this.status()}
            </CheckboxLabel>
          </FormField>
          <div style={{paddingTop: '12px'}}>
            <button onClick={() => this.setState({indeterminate: true})}>Make Indeterminate</button>
            <button onClick={() => this.setState({disabled: !disabled})}>Toggle Disabled</button>
          </div>
          <p>{changeEventCount} change events so far</p>
        </main>
        <main>
          <h2>Radio</h2>
          <FormField>
            <Radio id="radio1" groupName="radios"/>
            <Radio id="radio1" groupName="radios"/>
          </FormField>
        </main>
        <main>
          <h2>List Item</h2>
          <ListItem text="Foo" />
          <ListItem text="Hello World!" secondaryText="This has been a test" />
        </main>
        <main>
          <h2>Button</h2>
          <Button text="Hit me" />
          <Button text="Hit me" raised />
        </main>
        <main>
          <h2>FAB</h2>
          <FAB iconName="favorite" ariaLabel="Favorite"></FAB>
          <FAB >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </FAB>
          <FAB iconName="favorite" ariaLabel="Favorite" position={{
            bottom: '1rem',
            right: '1rem',
            condition: 'min-width: 1024px',
            condBottom: '3rem',
            condRight: '5rem'
          }} />
          <FAB id="altFab" iconName="favorite" ariaLabel="Favorite" position={{
            bottom: '5rem',
            right: '2rem',
            condition: 'min-width: 1024px',
            condBottom: '7rem',
            condRight: '6rem'
          }} mini />
        </main>
      </div>
    )
  }

  status() {
    if (this.state.indeterminate) {
      return 'indeterminate'
    }
    return this.state.checked ? 'checked' : 'unchecked'
  }
}
