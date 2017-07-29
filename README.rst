.. Project Links
.. _contributors: https://github.com/0x326/material-components-react/graphs/contributors
.. External Links
.. _Atom: https://atom.io/
.. _Create React App: https://github.com/facebookincubator/create-react-app
.. _Flow-IDE: https://atom.io/packages/flow-ide
.. _Flow: https://flow.org/
.. _Jest: https://facebook.github.io/jest/
.. _Material Components for the Web: https://material.io/components/web/
.. _Node.JS: https://nodejs.org/
.. _NPM: https://www.npmjs.com/
.. _React Styleguidist: https://react-styleguidist.js.org/
.. _React: https://facebook.github.io/react/
.. _SemVer: http://semver.org/
.. _Yarn: https://yarnpkg.com

Google's Material Components for Web using React
================================================

(This project is not affiliated with Google.)

This project enables you to easily use Google's modern `Material Components for the Web`_ library with
Facebook's React_ framework.  This project wraps each Material component with a React component.
You only have to invoke the respective React component and this project will take care of instantiating
a Material component.

Getting Started
---------------

These instructions will get you a copy of the project up and running on your local machine
for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Prerequisites
^^^^^^^^^^^^^

`Node.JS`_::

    # Windows
    choco install nodejs

    # macOS: Homebrew
    brew install node

    # Ubuntu
    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    sudo apt-get install -y nodejs

    # See for more options: https://nodejs.org/en/download/package-manager/

`Yarn`_ (or `NPM`_)::

    # Windows
    choco install yarn

    # macOS: Homebrew
    brew install yarn

    # Ubuntu
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt-get update && sudo apt-get install yarn

Installing
^^^^^^^^^^

First of all, clone this repository onto your local machine and ``cd`` into the project::

    git clone https://github.com/0x326/material-components-react
    cd material-components-react/

To download dependencies, open a terminal prompt and enter::

    yarn

Using in your own project
^^^^^^^^^^^^^^^^^^^^^^^^^

First, you'll want to have a look at this project's React documentation.  To do so, run::

    yarn docs  # This will start a server with the compiled docs

Then, in your own project, add this as a dependency::

    yarn add

Finally, in your code, write something like this::

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

Developing this project
^^^^^^^^^^^^^^^^^^^^^^^

If you want to contribute to this project, you'll want to try out your code with a development build and server.
To begin, execute::

    yarn start

Running the tests
-----------------

This project uses Flow and Jest to test code.

Flow
^^^^

Flow_ is a static type checker for JavaScript.  It reads type annotations and makes sure every variable is
typed correctly given its usage (ex: so you don't call ``.toLowerCase()`` on a ``Number``).  To run flow, execute::

    yarn flow

It could be useful to have the type warnings in an IDE. I recommend Flow-IDE_ for Atom_.
To install, go to ``Settings >> Install`` and search for "Flow IDE" or enter this command::

    apm install flow-ide

Jest
^^^^

Jest_ is a typical unit-testing framework for JavaScript.  To run the tests, execute::

    yarn test

Coding style tests
^^^^^^^^^^^^^^^^^^

TODO: Test coding style. Presently there are no tests or formatters.

Deployment
----------

For deployment, make sure to use a production build::

    yarn build

Built With
----------

* React_
* `Material Components for the Web`_
* `React Styleguidist`_
* `Create React App`_

Contributing
------------

Please read `CONTRIBUTING.md <CONTRIBUTING.md>`_ for details on the process for submitting pull requests to us.

Versioning
----------

We use SemVer_ for versioning. For the versions available, see the
`our releases <https://github.com/0x326/material-components-react/releases>`_.

Authors
-------

* **John Meyer** - *Initial work*

See also the list of contributors_ who participated in this project.

License
-------

This project is licensed under the `MIT License <LICENSE.md>`_.

Acknowledgments
---------------

* Google, for designing and implementing an awesome UI