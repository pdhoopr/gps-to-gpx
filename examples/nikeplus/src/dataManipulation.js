// Vendor imports
import moment from 'moment-timezone'; // eslint-disable-line import/no-unresolved, import/extensions

// Library imports
import ACCESS_TOKEN from './accessToken';
import { getActivities, getActivityGps } from './nikeplusApi';

/**
 * Builds an array of data where each item represents data for each activity from the Nike+. Starts
 * by calling the Nike+ API activities endpoint for the first known page of activities, then uses
 * the API responses to navigate through pages and make calls for additional data until it reaches
 * the end.
 *
 * NOTE: You'll need an access token in order to use the API. Check out the `accessToken.js` file
 * for more info.
 *
 * @returns {array} An array containing objects of activity data for each Nike+ activity returned
 * by the API.
 */
export async function buildActivityData() {
  let activities;
  let data;
  let nextPage;

  // Try to get the first page of activities and their data from the Nike+ API. If the call is
  // successful, set the data and next page using the response data.
  try {
    activities = await getActivities(
      `https://api.nike.com/v1/me/sport/activities?access_token=${ACCESS_TOKEN}`
    );
    data = activities.data;
    nextPage = activities.nextPage;
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }

  // If the API says there's another page of data, keep looping until it returns `null`.
  while (nextPage) {
    let nextActivities;

    // Now try to get the next page of activities and their data from the API. If the call is
    // successful, push the data onto the existing array and set the next page.
    try {
      nextActivities = await getActivities(`https://api.nike.com${nextPage}`);
      data.push(...nextActivities.data);
      nextPage = nextActivities.nextPage;
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  }

  return data;
}

/**
 * Filters the data first to only include valid activities (those without a hyphen in the
 * `activityId`)and then strips each activity's data down to only the fields we're interested in:
 * `activityId`, `activityType`, `duration`, and `startTime`.
 *
 * @param {array} data - An array containing objects of activity data for each Nike+ activity.
 *
 * @returns {array} An array containing only valid objects of activity data, each with only the
 * fields we want.
 */
export function filterActivityData(data) {
  return data
    .filter(activity => activity.activityId.search('-') === -1)
    .map(activity => ({
      activityId: activity.activityId,
      activityType: activity.activityType,
      duration: activity.metricSummary.duration,
      startTime: activity.startTime,
    }));
}

/**
 * Adds waypoint data to each activity by calling the Nike+ API GPS endpoint for each activity and
 * adding the results to the activity's data.
 *
 * @param {array} data - An array containing objects of activity data for each Nike+ activity.
 *
 * @returns {array} An array containing objects of activity data, each with waypoint data included.
 */
export async function addWaypoints(data) {
  return await Promise.all(data.map(async (activity) => {
    // Try to call the API GPS endpoint for an activity. If the call is successful, merge the
    // waypoint data into the existing activity data. Otherwise, just send back the existing
    // activity data.
    try {
      const waypoints = await getActivityGps(activity.activityId);

      return Object.assign({}, activity, waypoints);
    } catch (error) {
      console.error(error); // eslint-disable-line no-console

      return activity;
    }
  }));
}

// Parse a duration string in the form "0:00:00.000" to hours, minutes, seconds (using ES2015 array
// destructuring) and then calcuate the total duration in seconds from those pieces. Return the
// time step as this duration in seconds divided by the number of waypoints (less 1).
function calculateTimeStep(duration, numWaypoints) {
  const [, hours, minutes, seconds] = duration.match(/^(\d{1,2}):(\d{2}):(\d{2}\.\d{3})$/);
  const durationInSeconds = (Number(hours) * 3600) + (Number(minutes) * 60) + Number(seconds);

  return durationInSeconds / (numWaypoints - 1);
}

/**
 * Adds estimated timestamps to each waypoint for an activity. Timestamps are estimated by
 * converting the duration of an activity to seconds, then calculating a time step by dividing
 * the duration in seconds by the number of waypoints. The timestamp for a waypoint is the previous
 * waypoint's timestamp plus the time step. The first timestamp is the activity's start time.
 *
 * @param {array} data - An array containing objects of activity data for each Nike+ activity.
 *
 * @returns {array} An array containing objects of activity data, each with an estimated timestamp
 * included for all waypoints.
 */
export function estimateTimeForWaypoints(data) {
  const dataWithEstimatedTime = [];

  data.forEach((activity) => {
    if (activity.waypoints && activity.waypoints.length > 1) {
      const waypointsWithEstimatedTime = [];

      // Set the first timestamp as the `startTime` parsed by Moment.js as UTC time. Then, calculate
      // `timeStep` (how many seconds `timestamp` should be increased by for each waypoint).
      const timestamp = moment(`${activity.startTime}`).tz('Etc/UTC');
      const timeStep = calculateTimeStep(activity.duration, activity.waypoints.length);

      // Loop through all the waypoints for an activity and create a new waypoint with all the
      // properties of the old waypoint plus a new `time` property which is the timestamp. Before
      // the next loop iteration, increase `timestamp` by `timeStep` seconds.
      activity.waypoints.forEach((waypoint) => {
        waypointsWithEstimatedTime.push(Object.assign({}, waypoint, {
          time: `${timestamp.format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`,
        }));
        timestamp.add(timeStep, 'seconds');
      });

      // Create a new activity with all the properties of the old activity plus an updated
      // `waypoints` property which contains all the waypoints with estimated timestamps.
      dataWithEstimatedTime.push(Object.assign({}, activity, {
        waypoints: waypointsWithEstimatedTime,
      }));
    } else {
      // If an activity had no waypoints, just add the original activity data to the new data.
      dataWithEstimatedTime.push(activity);
    }
  });

  return dataWithEstimatedTime;
}
