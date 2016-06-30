import fs from 'fs';
import colors from 'colors/safe';
import createGpxFromGps from '../../../lib';

function writeActivityDataToGpxFile(activity, baseFileName) {
  const gpxFileName = `./data/gpx/${baseFileName}.gpx`;
  let gpxString;

  try {
    gpxString = createGpxFromGps(activity.waypoints, {
      activityName: activity.activityType,
      startTime: activity.startTime,
    });
  } catch (error) {
    console.error(
      colors.red(`\u2716 Error converting activity ${activity.activityId} to GPX: ${error.message}`)
    );
    return;
  }

  fs.writeFile(gpxFileName, gpxString, (error) => {
    if (error) {
      console.error(colors.red(`\u2716 ${error}`));
    } else {
      console.log(colors.green(`\u2714 GPX saved to ${gpxFileName}`));
    }
  });
}

function writeActivityDataToJsonFile(activity, baseFileName) {
  const jsonFileName = `./data/json/${baseFileName}.json`;

  fs.writeFile(jsonFileName, JSON.stringify(activity, null, 2), (error) => {
    if (error) {
      console.error(colors.red(`\u2716 ${error}`));
    } else {
      console.log(colors.green(`\u2714 JSON saved to ${jsonFileName}`));
    }
  });
}

export function writeActivityDataToFiles(data) {
  for (const activity of data) {
    const startTimeMatch = activity.startTime.match(
      /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})Z$/
    );
    const [, fileNameDay, fileNameTime] = startTimeMatch;
    const baseFileName = `run_${fileNameDay}_${fileNameTime.replace(/:/g, '-')}`;

    writeActivityDataToGpxFile(activity, baseFileName);
    writeActivityDataToJsonFile(activity, baseFileName);
  }
}
