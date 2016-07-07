// Library imports
import {
  addWaypoints,
  buildActivityData,
  estimateTimeForWaypoints,
  filterActivityData,
} from './dataManipulation';
import { writeActivityDataToFiles } from './fileCreation';

// The example executes as follows: starts by building an array of data where each item represents
// data for each activity from the Nike+ API, then filters activities down to only valid
// activities and each activity's data to only the fields `activityId`, `activityType`, `duration`,
// and `startTime`, then adds waypoint data for each activity, then adds estimated time data for
// each waypoint for each activity, and finally creates GPX and JSON files for each activity from
// data without time and data with estimated time.
async function main() {
  const activityData = await buildActivityData();
  const filteredActivityData = filterActivityData(activityData);
  const activityDataWithWaypoints = await addWaypoints(filteredActivityData);
  const activityDataWithEstimatedTime = estimateTimeForWaypoints(activityDataWithWaypoints);

  writeActivityDataToFiles(activityDataWithWaypoints, 'without-time');
  writeActivityDataToFiles(activityDataWithEstimatedTime, 'with-estimated-time');
}

// We need to call the example in order for it to actually start.
main();
