# GPS to GPX
A simple tool for converting an array of GPS points to GPX.

This is a fairly minimal library that uses GPS waypoint data from an activity (a run, bike ride, hike, etc.) to create a GPX file. Although the use cases are a bit limited, it can be helpful in specific situations. For example:

- You use a service like [Nike+](https://www.nike.com/US/en_US/p/activity) for tracking your runs. Being a curious person, you're interested in trying out some other services to see what they're like, or maybe you've decided to start doing some cycling and now want to track all your different activities in one place, like [Strava](https://www.strava.com/dashboard), and you want to take your data with you. A common way of doing this is to download your data as a GPX file and import it into other services. Nike+ (inexplicably) doesn't let you export data from your runs, but it does have an API that lets you grab JSON data for each activity. So, you're kind of stuck; you have some JSON data but you want GPX files. That's where this library comes in - just send in your GPS waypoints, and you'll get back nicely formatted GPX created from your data!

Keep in mind, this isn't the only use case, but it does a good job illustrating the purpose and intent of this tool. By itself, this might not seem entirely useful. If you're not into web development, things like APIs, data manipulation, and JavaScript libraries probably don't rev your engine. That's totally fair. There are a lot of great, user-friendly options out there for making transitions like the one described in the example; just check out [this Strava support forum](https://support.strava.com/hc/en-us/community/posts/208835477-Sync-Nike-to-Strava). However, if you happen to be a tech-savvy developer looking to create some GPX files or try your hand at building the next great API-to-GPX tool for people to use, this library might just fit your pipeline nicely.

## Installation

If you're using [npm](https://www.npmjs.com/) as your package manager, you can install the most recent, stable version like so:

```
npm install --save gps-to-gpx
```

In a CommonJS environment, you can import the library like this:

```js
const createGpx = require('gps-to-gpx').createGpx;
```

In an ES2015 environment, you can import the library like this:

```js
import { createGpx } from 'gps-to-gpx';
```

If you're not using modules via something like [webpack](http://webpack.github.io/), [Browserify](http://browserify.org/), or [Node.js](https://nodejs.org/en/), then the UMD build might interest you. The `gps-to-gpx` library comes with a `dist` folder containing development and (minified) production UMD builds that can be used without a module bundler. In a UMD environment, GPS to GPX will be available as the `window.GpsToGpx` variable.

The source code is written in ES2015 but is compiled to ES5 ahead of time in both CommonJS (`lib` folder) and UMD (`dist` folder) builds.

## Usage

You might have a `data` variable containing JSON that looks like this:

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

Assuming you've [imported the `createGpx` function](#user-content-installation), you could then call it like so:

```js
createGpx(data.waypoints, {
  activityName: data.activityType,
  startTime: data.startTime,
});
```

And you'd get back a GPX string like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<gpx creator="Patrick Hooper" version="1.1" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd">
  <metadata>
    <name>Activity</name>
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

See the [API documentation](#user-content-api-documentation) for a more complete reference on the library and its settings. You can also check out the [examples](#user-content-examples) for more complete use cases.

## API Documentation

This is a minimal library, so it only exports one function with a few options for GPX file customization:

```
createGpx(waypoints[, options])
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

If you're not sure where to start with the GPS to GPX library, maybe the example(s) below can help. You can clone the repository and navigate to `gps-to-gpx/examples/{{ example_name }}` to get started. An example should work like a normal project, so to use it you can first do `npm install`, then check out the npm scripts in the `package.json` to see what else is available (for example, `npm start` might run the example or `npm run clean` might cleanup any output artifacts).

- [Nike+](https://github.com/impatrickhooper/gps-to-gpx/tree/master/examples/nikeplus): This is a sample Node.js project that pulls all valid activities from the Nike+ API and saves them as GPX files. Documentation can be found as comments throughout the example code. NOTE: Since the Nike+ API does not include timestamps, the example saves GPX files in 2 ways: without time and with estimated time. The estimated timestamps are very rough calculations based on the duration of the activity and number of waypoints. Please keep in mind this is just a quick example, so I wouldn't recommend using the estimated timestamps unless you're in a pinch. I have to imagine there are better ways.

## Roadmap

This project was created primarily as a hobby project to help familiarize myself with the process of creating a JavaScript library. For that reason, and because it has pretty targeted use cases, it probably won't get a ton of attention. Hopefully, someone somewhere finds it useful and does something super cool with it. If that person is you, I'd love to hear from you!

If you have any feature requests or encounter any problems, please use the [contributing guidelines](https://github.com/impatrickhooper/gps-to-gpx/blob/master/CONTRIBUTING.md) to determine your next move. Thank you!

## License

GPS to GPX is released under the [MIT License](https://github.com/impatrickhooper/gps-to-gpx/blob/master/LICENSE).
