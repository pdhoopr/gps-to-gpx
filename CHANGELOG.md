# Change Log

This project uses [Semantic Versioning](http://semver.org/). All releases are documented both on the GitHub [releases page](https://github.com/pdhoopr/gps-to-gpx/releases) and in this file.

## v1.3.0 (July 19, 2018)

This release adds the ability for a user to customize the value of the `creator` attribute added to the root `gpx` element.

## v1.2.0 (April 11, 2018)

This release adds the ability for a GPS point to provide additional extensions.

## v1.1.0 (November 20, 2016)

This release enhances the time-handling aspects of the library.

- Allow users to pass waypoint times as Date objects and get ISO strings in the GPX output.
- Allow users to pass `startTime` as a Date object and get ISO string in the GPX output.
- Bump all dependencies and update pieces of code to comply.
- Run Travis CI tests against Node v7.

## v1.0.5 (August 15, 2016)

This release mainly does some cleanup of dependencies and configs.

- Update some rule formatting in `.eslintrc`.
- Update `.babelrc` to use `modules` option for `es2015` preset depending on the environment.
- Remove Babel presets and plugins for using loose/native modules.
- Bump all dependencies.
- Update loader syntax in `webpack.config.js` to use webpack 2 format.

## v1.0.4 (August 13, 2016)

This release reworks some pieces of the documentation.

- Update syntax for user-specific pieces of commands from `{{ variable }}` to `VARIABLE`.
- Update error types in "Pull Requests" section of `CONTRIBUTING`.

## v1.0.3 (August 12, 2016)

This release just fixes some content in the documentation.

- Add spacing to the phrase "change log" in "Releases" section of the `README` file.
- Remove info about linting and `.editorconfig` file in `CONTRIBUTING` file.

## v1.0.2 (August 3, 2016)

This release is just a patch to make sure the npm and GitHub `README` files are in sync.

## v1.0.1 (August 2, 2016)

This release does some cleanup and restructuring of various pieces of the library.

- Bump all project and example dependencies.
- Make links to other pieces of the repo relative instead of absolute.
- Update all references to this repo's URL after changing username.
- Better organize the examples in the `README`.
- Remove unused `activityType` from filtered Nike+ example data.
- Switch to Codecov and drop Coveralls.
- Rename some sections in the contributing guidelines so they're more logical.
- Have Travis CI build all branches, but only deploy on tagged releases.

## v1.0.0 (July 11, 2016)

This release adds the last bit of polish, making it ready for prime time (its first major version).

- Make build and coverage badges in the `README` specific to the `master` branch.

## v1.0.0-beta.1 (July 11, 2016)

This is the initial public release (a beta version to ensure that entire workflow and pipeline is functioning correctly).
