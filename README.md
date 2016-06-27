# GPS to GPX
A simple tool for converting an array of GPS points to GPX.

## Development
1. Clone the repository.
2. Navigate into the repository.
3. Run `npm install` (you'll need [Node.js](https://nodejs.org/en/) & [npm](https://www.npmjs.com/)).
4. Let npm scripts handle your workflow!
  * Use `npm start` to have Babel watch the source code and rebuild the CommonJS package when files change.
  * Use `npm run lint` to run [ESLint](http://eslint.org/) on the JavaScript source and test code.
  * Use `npm test` to run the tests for this project.
  * Use `npm test:watch` to run tests for this project and rerun them when files change.
  * Use `npm run clean:commonjs` to remove the compiled "lib" folder.
  * Use `npm run clean:es` to remove the compiled "es" folder.
  * Use `npm run clean:umd` to remove the compiled "dist" folder.
  * Use `npm run clean` to clean all build folders ("lib", "es", and "dist").
  * Use `npm run build:commonjs` to remove the "lib" folder and build the CommonJS version of this package.
  * Use `npm run build:es` to remove the "es" folder and build the ECMAScript version of this package.
  * Use `npm run build:umd` to remove the "dist" folder and build the UMD (browser-compatible) version of this package.
  * Use `npm run build` to clean all old build folders and rebuild all versions of the package.
