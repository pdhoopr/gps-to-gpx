// Vendor imports
import axios from 'axios';

// Library imports
import { ACCESS_TOKEN } from './constants';

/**
 * Send a request to the provided Nike+ API activities endpoint and return an object with the
 * activities data for this page and the URL for the next page.
 *
 * @param {String} url - A string containing the API activities endpoint to request data from.
 *
 * @returns {Object} An object containing the activites data from the API response and URL for the
 * next page of data.
 */
export async function getActivities(url) {
  const data = await axios
    .get(url)
    .then(response => ({
      data: response.data.data,
      nextPage: response.data.paging.next,
    }));

  return data;
}

/**
 * Send a request to the Nike+ API activity GPS endpoint for the activity with the provided ID and
 * return an object with the GPS waypoints for this activity.
 *
 * @param {String} activityId - A string with the ID for the activity we want to get GPS waypoints
 * for.
 *
 * NOTE: You'll need an access token in order to use the API. Check out the `constants.js` file for
 * more info.
 *
 * @returns {Object} An object containing the GPS waypoints from the API response.
 */
export async function getActivityGps(activityId) {
  const data = await axios
    .get(
      `https://api.nike.com/v1/me/sport/activities/${activityId}/gps?access_token=${ACCESS_TOKEN}`
    )
    .then(response => ({
      waypoints: response.data.waypoints,
    }));

  return data;
}
