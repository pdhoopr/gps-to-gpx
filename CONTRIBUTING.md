# Contributing

Hi there! Thanks for considering contributing to this project. Any contributions from the community are more than welcome and much appreciated. Please note that by contributing to GPS to GPX, you agree to respect this project's [code of conduct](CODE_OF_CONDUCT.md).

## Bugs, Features, Feedback, and Help/Questions

Feel free to use this project's [issue tracker](https://github.com/pdhoopr/gps-to-gpx/issues) to report bugs, request features, leave feedback, or get help/ask questions! Please just look through existing issues first to make sure yours hasn't already been addressed. Also, try to make your issues as descriptive, clear, and organized as possible so they are easier to understand and respond to. Little things like spacing, indentation, and syntax highlighting can make a big difference.

## Pull Requests

If you've decided you'd like to contribute to this project, that's great; thank you! You can check out the [issue tracker](https://github.com/pdhoopr/gps-to-gpx/issues) to see if there's an open issue that you're interested in working on, or open a new one if you have something specific you want to do but doesn't exist yet.

Before you start developing, let's first try and have a discussion about an issue and your proposed solution. It would suck for you to do any amount of work only to find out it won't be accepted for some reason. Once a proposed approach has been agreed upon, go wild!

A workflow for pull requests will usually look something like this (for more info, check out [*How to Contribute to an Open Source Project on GitHub*](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)):

- Choose an existing issue or open a new one.
- Discuss your proposed approach and get verification that this a direction the project wants to go.
- Fork the repository.
- Create a new feature branch based off of the master branch.
- Get to work!
- When you think you're done, verify there are no linting errors and all tests pass. Feel free to take a look at the code coverage, too.
- Submit a pull request and reference any issues it addresses.

Please try and keep your pull request's scope focused and commit history streamlined. You might also want to take some time to familiarize yourself with the rest of the project so you know the existing styles and conventions to adhere to (linting will help with this, and there is also an `.editorconfig` file).

## Development

All development will likely start by forking your own copy of the repository and then cloning it.

To clone the repo, use:

```
git clone https://github.com/{{ your_github_username }}/gps-to-gpx.git
```

You'll then want to navigate into the cloned project directory and run `npm install` (you'll need [Node.js](https://nodejs.org/en/) & [npm](https://www.npmjs.com/)) to install the project's dependencies.

### Watching

Before long, you're going to get tired of doing certain things manually (like running tests) whenever you make changes to your code. So let's go over some convenience scripts up front!

To continuously watch your source code (in the `src` folder) and automatically recreate the CommonJS build (in the `lib` folder) when things change, use:

```
npm run watch:src
```

To continuously watch your source code and rerun the tests when something changes, use:

```
npm run watch:test
```

### Linting, Testing, and Code Coverage

At some point &#8212; usually before creating the all the builds of the library that will be released &#8212; you're going to want to validate your work. The library is considered valid when it has no lint errors and passes all the tests.

To perform all the checks (linting and testing) and report the code coverage, use:

```
npm run validate
```

To just run [ESLint](http://eslint.org/) (on the `examples`, `src`, and `test` folders), use:

```
npm run lint
```

To just run the tests (with [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/)), use:

```
npm test
```

To just get the code coverage and generate a nicely formatted report in the `coverage` folder (with [nyc](https://github.com/istanbuljs/nyc)), use:

```
npm run coverage
```

*NOTE: The [`clean:coverage` clean script](#cleaning) is automatically run before the `coverage` script to make sure the code coverage stats are fresh each time.*

### Building

Eventually, you're going to want to build the library &#8212; usually because you've finished development and are ready to release all your hard work to the world. You can create a build for 3 environments: CommonJS, ES, and UMD.

To create a build for every environment (CommonJS in the `lib` folder, ES in the `es` folder, UMD in the `dist` folder), use:

```
npm run build
```

To create a build for just a specific environment, you can use one of the following:

```
npm run build:commonjs
npm run build:es
npm run build:umd
```

*NOTE: The [accompanying clean script](#cleaning) is automatically run before each individual build script to make sure a fresh build is produced each time.*

### Cleaning

Sometimes it can be therapeutic to just clean some stuff. Seriously. This project doesn't try to take that away from you.

To remove all the builds (CommonJS in the `lib` folder, ES in the `es` folder, UMD in the `dist` folder) and code coverage artifacts (in the `.nyc_output` and `coverage` folders), use:

```
npm run clean
```

To remove the output from just a specific build or the code coverage, you can use one of the following:

```
npm run clean:commonjs
npm run clean:es
npm run clean:umd
npm run clean:coverage
```

## Examples

In-depth, realistic use cases for the GPS to GPX library can be found in the `examples` folder. You're more than welcome to add your own example, just be sure to look over the existing ones and try to follow similar principles. Each example gets its own folder at `examples/{{ example_name }}`. Verify any code you write doesn't throw lint errors using `npm run lint`.

## Thanks

A very big thank you to anyone who contributes now or in the future!
