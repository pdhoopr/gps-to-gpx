# GPS to GPX

A simple tool that uses GPS waypoint data to generate GPX.

This is a minimal JavaScript library that formats GPS waypoint data from an activity (a run, bike ride, hike, etc.) as GPX. Although the use cases are a bit limited, it can be helpful in specific situations.

[![Build Status](https://img.shields.io/travis/pdhoopr/gps-to-gpx/master.svg?style=flat-square)](https://travis-ci.org/pdhoopr/gps-to-gpx)
[![Code Coverage](https://img.shields.io/codecov/c/github/pdhoopr/gps-to-gpx/master.svg?style=flat-square)](https://codecov.io/gh/pdhoopr/gps-to-gpx)
[![npm Version](https://img.shields.io/npm/v/gps-to-gpx.svg?style=flat-square)](https://www.npmjs.com/package/gps-to-gpx)
[![License](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

## The Hook

Let's say you use a service like [Nike+](https://www.nike.com/US/en_US/p/activity) for tracking your runs. Being a curious person, you're interested in trying out some other services to see what they're like, or maybe you've decided to start doing some cycling and now want to track all your different activities in one place, like [Strava](https://www.strava.com/dashboard), and you want to take your data with you. A common way of doing this is to download your data as a GPX file and import it into other services. Nike+ (inexplicably) doesn't let you export data from your runs, but it does have an API that lets you grab JSON data for each activity. So, you're kind of stuck; you have some JSON data but you want GPX files. That's where this library comes in handy!

You might have JSON data that looks like this:

```json
{
  "activityType": "RUN",
  "startTime": "2016-07-06T12:36:00Z",
  "waypoints": [
    {
      "latitude": 26.852324,
      "longitude": -80.08045,
      "elevation": 0,
      "time": "2016-07-06T12:36:00Z"
    }
  ]
}
```

Let's assume the JSON data above has been saved to a `data` variable and you're using ES2015 (if you're using another environment, you can find the appropriate steps in the [installation instructions](#installation)). Now you can `import` the default top-level `createGpx` function and call it like so:

```javascript
import createGpx from 'gps-to-gpx';

const gpx = createGpx(data.waypoints, {
  activityName: data.activityType,
  startTime: data.startTime,
});

console.log(gpx);
```

For all your hard work, you'll be rewarded with GPX output in your console that looks like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="GPS to GPX (https://npm.im/gps-to-gpx)" xmlns="http://www.topografix.com/GPX/1/1" xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v2 http://www.garmin.com/xmlschemas/TrackPointExtensionv2.xsd">
  <metadata>
    <name>RUN</name>
    <time>2016-07-06T12:36:00Z</time>
  </metadata>
  <trk>
    <name>RUN</name>
    <trkseg>
      <trkpt lat="26.852324" lon="-80.08045">
        <ele>0</ele>
        <time>2016-07-06T12:36:00Z</time>
      </trkpt>
    </trkseg>
  </trk>
</gpx>
```

See how easy that was? Just send in your GPS waypoints, and you'll get back nicely formatted GPX created from your data! You can now do whatever you want with this, like save it to a file.

Keep in mind, this isn't the only use case, but it does a good job illustrating the purpose and intent of this tool. By itself, this might not seem entirely useful. If you're not into web development, things like APIs, data manipulation, and JavaScript libraries probably don't rev your engine. That's totally fair. There are a lot of great, user-friendly options out there for making transitions like the one described in the example; just check out [this Strava support forum](https://support.strava.com/hc/en-us/community/posts/208835477-Sync-Nike-to-Strava). However, if you happen to be a tech-savvy developer looking to create some GPX files or try your hand at building the next great API-to-GPX tool for people to use, then read on because this library might just fit your pipeline nicely.

## Installation

If you're using [npm](https://www.npmjs.com/) as your package manager, you can install the most recent, stable version like so:

```
npm install --save gps-to-gpx
```

In an ES2015 environment, you can import the library like this:

```javascript
import createGpx from 'gps-to-gpx';
```

In a CommonJS environment, you can import the library like this:

```javascript
const createGpx = require('gps-to-gpx').default;
```

If you're not using modules via something like [webpack](http://webpack.github.io/), [Browserify](http://browserify.org/), or [Node.js](https://nodejs.org/en/), then the UMD build might interest you. The `gps-to-gpx` library comes with a `dist` folder containing development and (minified) production UMD builds that can be used without a module bundler. In a UMD environment, GPS to GPX will be available as the `window.GpsToGpx` variable.

The source code is written in ES2015 but is compiled to ES5 ahead of time in both CommonJS (`lib` folder) and UMD (`dist` folder) builds.

## API Documentation

This is a minimal library, so it only exports one function with a few options for GPX file customization:

```
createGpx(waypoints[, options])
```

### Parameters

1. `waypoints` (*array*): Required. An array of GPS waypoint data. Each point should be an object containing, at the very least, keys representing a coordinate's latitude and longitude values. These keys are assumed to be "latitude" and "longitude" by default, but can be customized (see `options`).

2. `options` (*object*): Optional. An object literal of options that customize/override the default library settings. If any options are omitted, the settings will use the default values listed below:

  - `activityName`: 'Activity'
  - `eleKey`: 'elevation'
  - `extKey`: 'extensions'
  - `hdopKey`: 'hdop'
  - `latKey`: 'latitude'
  - `lonKey`: 'longitude'
  - `startTime`: `null`
  - `timeKey`: 'time'
  - `vdopKey`: 'vdop'

### Returns

(*string*): A GPX (a form of XML) string composed of the given waypoints and options.

## Extensions

Some pieces of data do not map to an appropriate element in the official GPX 1.1 spec, such as speed. This data can be added via extensions. This library affords you the use of Garmin's track point extensions (`atemp`, `wtemp`, `depth`, `hr`, `cad`, `speed`, `course`, `bearing`). To use them, add an extensions object with keys named exactly as the track point extension(s) you want to use to the points in your waypoints array. So, for example, adding speed to the original JSON data from above might look like this:

```json
{
  "activityType": "RUN",
  "startTime": "2016-07-06T12:36:00Z",
  "waypoints": [
    {
      "latitude": 26.852324,
      "longitude": -80.08045,
      "elevation": 0,
      "time": "2016-07-06T12:36:00Z",
      "extensions": {
        "speed": 5
      }
    }
  ]
}
```

Note that we added an object called `extensions` to the waypoint. This is customizable via the `extKey` setting passed to the `createGpx` function; "extensions" is just the default value. Also note that we used a key literally called `speed` to match the exact name of the Garmin extension. This is _not_ customizable.

## Examples

If you're not sure where to start with the GPS to GPX library, maybe the example(s) below can help:

- [Nike+](examples/nikeplus#readme)

## Roadmap

This project was created primarily as a hobby project to help familiarize myself with the process of creating a JavaScript library. For that reason, and because it has pretty targeted use cases, it probably won't get a ton of attention. Hopefully, someone somewhere finds it useful and does something super cool with it. If that person is you, I'd love to hear from you!

## Contributing

Contributions from the community are welcome and encouraged! If you have any ideas, feature requests, bugs, etc., please use the [contributing guidelines](CONTRIBUTING.md) to determine your next move. Also note that this project follows a [code of conduct](CODE_OF_CONDUCT.md). Thank you!

## Releases

This project uses [Semantic Versioning](http://semver.org/). All releases are documented on the GitHub [releases page](https://github.com/pdhoopr/gps-to-gpx/releases) and in the [changelog](CHANGELOG.md).

## License

GPS to GPX is released under the [MIT License](LICENSE).
