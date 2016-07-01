// Node.js imports
import fs from 'fs';

// Vendor (3rd-party) imports
import colors from 'colors/safe';

// Package imports
import createGpxFromGps from '../../../lib';

function writeActivityDataToGpxFile(activity, fileName, folder) {
  // Generate the full path to where the file will be saved (the "data/{folder}/gpx" folder
  // with a filename generated from the date and time of the activity).
  const gpxFilePath = `./data/${folder}/gpx/${fileName}.gpx`;
  let gpxString;

  // Try to convert the activity data to a GPX string using the GPS to GPX package, taking care to
  // pass in the waypoints, activity type, and the start time of the activity.
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

  // Create the file with the given name and activity data that was converted to a GPX string.
  fs.writeFile(gpxFilePath, gpxString, (error) => {
    if (error) {
      console.error(colors.red(`\u2716 ${error}`));
    } else {
      console.log(colors.green(`\u2714 GPX saved to ${gpxFilePath}`));
    }
  });
}

function writeActivityDataToJsonFile(activity, fileName, folder) {
  // Generate the full path to where the file will be saved (the "data/{folder}/json" folder with a
  // filename generated from the date and time of the activity).
  const jsonFilePath = `./data/${folder}/json/${fileName}.json`;

  // Create the file with the given name and activity JSON data converted to a string.
  fs.writeFile(jsonFilePath, JSON.stringify(activity, null, 2), (error) => {
    if (error) {
      console.error(colors.red(`\u2716 ${error}`));
    } else {
      console.log(colors.green(`\u2714 JSON saved to ${jsonFilePath}`));
    }
  });
}

/**
 * Create GPX and JSON files for each activity. Loop through each activity in the data, extract the
 * day and time of the activity that makeup the base filename, then call the functions to create
 * each type of file.
 *
 * @param {Array} data - An array containing objects of activity data for each Nike+ activity
 * returnedby the API.
 * @param {String} folder - A string specifiying the folder name where files should be saved.
 *
 * @returns {Void}
 */
export function writeActivityDataToFiles(data, folder) {
  for (const activity of data) {
    // Nike+ returns date/time info in the form 'YYYY-DD-MMTHH:mm:ssZ', so using regex it's
    // fairly easily to consistently grab the date (YYYY-DD-MM) and time (HH:mm:ss) of an activity,
    // destructure the matches array into the variables we want, and then construct the filename.
    // Yes, ES2015 is awesome (here, for destructing and template strings).
    const startTimeMatch = activity.startTime.match(
      /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})Z$/
    );
    const [, fileNameDay, fileNameTime] = startTimeMatch;
    const fileName = `run_${fileNameDay}_${fileNameTime.replace(/:/g, '-')}`;

    writeActivityDataToGpxFile(activity, fileName, folder);
    writeActivityDataToJsonFile(activity, fileName, folder);
  }
}
