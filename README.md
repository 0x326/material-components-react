# A Wrapper for Google's Material Components for Web

This project is not affiliated with Google.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). ([User Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md))

## How to use

```
yarn add 0x326/material-components-react
```

```JavaScript
import MDCReact from 'material-components-react'
// ...
  render() {
    return (
      <FormField>
        <Checkbox id="my-checkbox" indeterminate={true} checked={false} disabled={false} />
        <CheckboxLabel id="my-checkbox-label" for="my-checkbox">
          Ready to go
        </CheckboxLabel>
      </FormField>
    )
  }
```

## Documentation

This project uses [React Styleguidist](https://react-styleguidist.js.org/) to build documentation from the source code. To view it yourself, execute `yarn docs`
