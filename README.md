# GPS to GPX
A simple tool for converting an array of GPS points to GPX.

This is a fairly minimal library that uses GPS waypoint data from an activity (a run, bike ride, hike, etc.) to create a GPX file. Although the use cases are a bit limited, it can be helpful in specific situations. For example:

- You use a service like [Nike+](https://www.nike.com/US/en_US/p/activity) for tracking your runs. Being a curious person, you're interested in trying out some other services to see what they're like, or maybe you've decided to start doing some cycling and now want to track all your different activities in one place, like [Strava](https://www.strava.com/dashboard), and you want to take your data with you. A common way of doing this is to download your data as a GPX file and import it into other services. Nike+ (inexplicably) doesn't let you export data from your runs, but it does have an API that lets you grab JSON data for each activity. So, you're kind of stuck; you have some JSON data but you want GPX files. That's where this library comes in - just send in your GPS waypoints, and you'll get back a nicely formatted GPX file created from your data!

Keep in mind, this isn't the only use case, but it does a good job illustrating the purpose and intent of this tool. By itself, this might not seem entirely useful. If you're not into web development, things like APIs, data manipulation, and JavaScript libraries probably don't rev your engine. That's totally fair. There are a lot of great, user-friendly options out there for making transitions like the one described in the example; just check out [this Strava support forum](https://support.strava.com/hc/en-us/community/posts/208835477-Sync-Nike-to-Strava). However, if you happen to be a tech-savvy developer looking to create some GPX files or try your hand at building the next great API-to-GPX tool for people to use, this library might just fit your pipeline nicely.

## Installation

If you're using [npm](https://www.npmjs.com/) as your package manager, you can install the most recent, stable version like so:

```
npm install --save gps-to-gpx
```

In a CommonJS environment, you can import the library like this:

```
const createGpxFromGps = require('gps-to-gpx');
```

In an ES2015 environment, you can import the library like this:

```
import createGpxFromGps from 'gps-to-gpx';
```

If you're not using modules via something like [webpack](http://webpack.github.io/), [Browserify](http://browserify.org/), or [Node.js](https://nodejs.org/en/), then the UMD build might interest you. The `gps-to-gpx` library you installed earlier comes with a "dist" folder containing development and (minified) production UMD builds that can be used without a module bundler. In a UMD environment, GPS to GPX will be available as the `window.GpsToGpx` variable.

The source code is written in ES2015 but is compiled to ES5 ahead of time in both CommonJS ("lib" folder) and UMD ("dist" folder) builds.

## API Documentation

As you might have gathered by now, this is a small library. It exports one function with a few options for file customization:

```
createGpxFromGps(waypoints[, options])
```

### Parameters

1. `waypoints` (*Array*): Required. An array of GPS waypoint data. Each point should be an object containing, at the very least, keys representing a coordinate's latitude and longitude values. These keys are assumed to be "latitude" and "longitude" by default, but can be customized (see `options`).

2. `options` (*Object*): Optional. An object literal of options that customize/override the default library settings. If any options are omitted, the settings will use the default values listed below:
  - `activityName`: "Everyday I'm hustlin'"
  - `eleKey`: 'elevation'
  - `latKey`: 'latitude'
  - `lonKey`: 'longitude'
  - `startTime`: `null`
  - `timeKey`: 'time'

### Returns
(*String*): A GPX (a form of XML) string composed of the given waypoints and options.

## Examples

- [Nike+](https://github.com/reactjs/redux/tree/master/examples/counter-vanilla) (A sample Node.js project that pulls all valid activities from the Nike+ API and saves them as GPX files)

## Roadmap

This project was created primarily as a hobby project to help familiarize myself with the process of creating a Node.js library. For that reason, and because it has pretty targeted use cases, it probably won't get a ton of attention. Hopefully, someone somewhere finds it useful and does something super cool with it. If that person is you, I'd love to hear from you! Also, if you have any feature requests or encounter any problems, please feel free to add them to the [issue tracker](https://github.com/impatrickhooper/gps-to-gpx/issues). Thank you!

## License

MIT
