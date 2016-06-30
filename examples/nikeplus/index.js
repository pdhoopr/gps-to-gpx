import { buildActivityData, filterActivityData, addWaypoints } from './src/dataManipulation';
import { writeActivityDataToFiles } from './src/fileCreation';

async function main() {
  const activityData = await buildActivityData();
  const filteredActivityData = filterActivityData(activityData);
  const activityDataWithWaypoints = await addWaypoints(filteredActivityData);

  writeActivityDataToFiles(activityDataWithWaypoints);
}

main();
