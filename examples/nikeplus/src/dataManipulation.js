import { ACCESS_TOKEN } from './constants';
import { getActivities, getActivityGps } from './nikeplusApi';

export async function buildActivityData() {
  let activities;
  let data;
  let nextPage;

  try {
    activities = await getActivities(
      `https://api.nike.com/v1/me/sport/activities?access_token=${ACCESS_TOKEN}`
    );
    data = activities.data;
    nextPage = activities.nextPage;
  } catch (error) {
    console.error(error);
  }

  while (nextPage) {
    let nextActivities;

    try {
      nextActivities = await getActivities(`https://api.nike.com${nextPage}`);
      data.push(...nextActivities.data);
      nextPage = nextActivities.nextPage;
    } catch (error) {
      console.error(error);
    }
  }

  return data;
}

export function filterActivityData(data) {
  return data
    .filter(activity => activity.activityId.search('-') === -1)
    .map(activity => ({
      activityId: activity.activityId,
      activityTimeZone: activity.activityTimeZone,
      activityType: activity.activityType,
      distance: Number(activity.metricSummary.distance) * 0.621371,
      duration: activity.metricSummary.duration,
      startTime: activity.startTime,
    }));
}

export async function addWaypoints(data) {
  return await Promise.all(data.map(async (activity) => {
    try {
      const waypoints = await getActivityGps(activity.activityId);

      return Object.assign(activity, waypoints);
    } catch (error) {
      console.error(error);

      return activity;
    }
  }));
}
