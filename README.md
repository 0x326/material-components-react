# Google's Material Components for Web using React

(This project is not affiliated with Google.)

This project enables you to easily use Google's modern Material Components for Web library with Facebook's React framework.  This project wraps each Material component with a React component.  You only have to invoke the respective React component and this project will take care of instantiating a Material component.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

[Node.JS](https://nodejs.org/)

```bash
# Windows
choco install nodejs

# macOS: Homebrew
brew install node

# Ubuntu
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

# See for more options: https://nodejs.org/en/download/package-manager/
```

[Yarn](https://yarnpkg.com) (or [NPM](https://www.npmjs.com/))

```bash
# Windows
choco install yarn

# macOS: Homebrew
brew install yarn

# Ubuntu
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```

### Installing

First of all, clone this repository onto your local machine and `cd` into the project:

```bash
git clone
cd
```

To download dependencies, open a terminal prompt and enter:

```bash
yarn
```

### Using in your own project

First, you'll want to have a look at this project's React documentation.  To do so, run:

```bash
yarn docs
# This will start a server with the compiled docs
```

Then, in your own project, add this as a dependency:

```
yarn add
```

Finally, in your code, write something like this:

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

### Developing this project

If you want to contribute to this project, you'll want to try out your code with a development build and server.  To begin, execute:

```bash
yarn start
```

## Running the tests

This project uses Flow and Jest to test code.

### Flow

Flow is a static type checker for JavaScript.  It reads type annotations and makes sure every variable is typed correctly given its usage (ex: so you don't call `.toLowerCase()` on a `Number`).  To run flow, execute:

```bash
yarn flow
```

I find it useful to have the type warnings in an IDE. I recommend [Flow-IDE](https://atom.io/packages/flow-ide).  To install by commandline, enter:

```bash
apm install flow-ide
```

### Jest

Jest is a typical testing framework.  To run the tests, execute:

```bash
yarn test
```

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

For deployment, make sure to use a production build.

## Built With

- React
- Material Components Web
- [React Styleguidist](https://react-styleguidist.js.org/)
- Create React App

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

- **John Meyer** - *Initial work*

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hat tip to anyone who's code was used
- Inspiration
- etc
