# Contributing

Hi there! Thanks for considering contributing to this project. Any contributions from the community are more than welcome and much appreciated. Please note that by contributing to GPS to GPX, you agree to respect this project's [code of conduct](https://github.com/impatrickhooper/gps-to-gpx/blob/master/CODE_OF_CONDUCT.md).

## Bugs, Features, Feedback, and Help/Questions

Feel free to use this project's [issue tracker](https://github.com/impatrickhooper/gps-to-gpx/issues) to report bugs, request features, leave feedback, or get help/ask questions! Please just look through existing issues first to make sure yours hasn't already been addressed. Also, try to make your issues as descriptive, clear, and organized as possible so they are easier to understand and respond to. Little things like spacing, indentation, and syntax highlighting can make a big difference.

## Pull Requests

If you've decided you'd like to contribute to this project, that's great; thank you! You can check out the [issue tracker](https://github.com/impatrickhooper/gps-to-gpx/issues) to see if there's an open issue that you're interested in working on, or open a new one if you have something specific you want to do but doesn't exist yet.

Before you start developing, let's first try and have a discussion about an issue and your proposed solution. It would suck for you to do any amount of work only to find out it won't be accepted for some reason. Once a proposed approach has been agreed upon, go wild!

A workflow for pull requests will usually look something like this (for more info, check out [*How to Contribute to an Open Source Project on GitHub*](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)):

- Choose an existing issue or open a new one.
- Discuss your proposed approach and get verification that this a direction the project wants to go.
- Fork the repository.
- Create a new feature branch based off of the master branch.
- Get to work!
- When you think you're done, verify there are no linting errors, all tests pass, and the code coverage thresholds are met (try `npm run validate`).
- Submit a pull request and reference any issues it addresses.

Please try and keep your pull request's scope focused and commit history streamlined. You might also want to take some time to familiarize yourself with the rest of the project so you know the existing styles and conventions to adhere to (linting will help with this, and there is also an `.editorconfig` file).

## Development

All development will likely start by forking and then cloning the repository:

```
git clone https://github.com/{{ your_username }}/gps-to-gpx.git
```

You'll then want to navigate into the cloned project directory and run `npm install` (you'll need [Node.js](https://nodejs.org/en/) & [npm](https://www.npmjs.com/)) to install the project's dependencies.

### Building

To create production builds for CommonJS (in the `lib` folder), ES (in the `es` folder), and UMD (in the `dist` folder) environments all at once, use:

```
npm run build
```

To independently create a build for each environment, you can use one of the following:

```
npm run build:commonjs
npm run build:es
npm run build:umd
```

*Note that before each individual build script, the accompanying clean script is run to make sure a fresh build is produced each time.*

While you're writing code, it can be helpful to watch the source code for changes and rebuild the library when things change. To do this (via [Babel](http://babeljs.io/), rebuilding only the CommonJs `lib` folder), use:

```
npm start
```

### Linting, Testing, and Code Coverage

The project is valid when it has no lint errors, passes all the tests, and meets the specified code coverage thresholds. You can check all these things at once using:

```
npm run validate
```

To just run [ESLint](http://eslint.org/) (for the `examples`, `src`, and `test` folders), use:

```
npm run lint
```

To just run the tests with [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/), use:

```
npm test
```

To watch your source code for changes and rerun the tests when something is updated, use:

```
npm run test:watch
```

Code coverage is generated using [nyc](https://github.com/istanbuljs/nyc). To just get the coverage of the tests, use:

```
npm run coverage
```

To get the coverage and verify it meets the specified thresholds, use:

```
npm run coverage:check
```

To get the coverage and generate a nicely formatted report (in the `coverage` folder), use:

```
npm run coverage:report
```

### Cleaning

Sometimes when it's all said and done, you just want to clean some stuff. To remove all build and coverage artifacts, use:

```
npm run clean
```

To remove just the CommonJS build folder (`lib`), use:

```
npm run clean:commonjs
```

To remove just the ES build folder (`es`), use:

```
npm run clean:es
```

To remove just the UMD build folder (`dist`), use:

```
npm run clean:umd
```

To remove just the coverage folders (`.nyc_output` and `coverage`), use:

```
npm run clean:coverage
```

## Examples

In-depth, realistic use cases for the GPS to GPX library can be found in the `examples` folder. You're more than welcome to add your own example, just be sure to look over the existing ones and try to follow similar principles. Each example gets its own folder at `examples/{{ example_name }}`. Verify any code you write doesn't throw lint errors using `npm run lint`.

## Thanks

A very big thank you to anyone who contributes now or in the future!
