import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

export async function getActivities(url) {
  const data = await axios
    .get(url)
    .then(response => ({
      data: response.data.data,
      nextPage: response.data.paging.next,
    }));

  return data;
}

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
