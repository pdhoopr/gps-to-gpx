// Node.js imports
import fs from 'fs';

// Vendor imports
import colors from 'colors/safe';
import gpsToGpx from 'gps-to-gpx';

function writeActivityDataToGpxFile(activity, fileName, folder) {
  const gpxFilePath = `./data/${folder}/${fileName}.gpx`;

  // Try to convert the activity data to a GPX string using the GPS to GPX library, taking care to
  // pass in the waypoints, activity type, and the start time of the activity.
  let gpxString;
  try {
    gpxString = gpsToGpx(activity.waypoints, {
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

/**
 * Create GPX files for each activity. Loop through each activity in the data, extract the day and
 * time of the activity that makeup the base filename, then call the function to create a GPX file.
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
    // destructure the matches array into the variables we want, and then construct the file path.
    // Yes, ES2015 is awesome (here, for destructing and template strings).
    const startTimeMatch = activity.startTime.match(
      /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})Z$/
    );
    const [, fileNameDay, fileNameTime] = startTimeMatch;
    const fileName = `run_${fileNameDay}_${fileNameTime.replace(/:/g, '-')}`;

    writeActivityDataToGpxFile(activity, fileName, folder);
  }
}
