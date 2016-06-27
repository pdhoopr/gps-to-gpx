const sampleData = require('./sampleData').waypoints;
const createGpxFromGps = require('../lib').createGpxFromGps;

console.log(createGpxFromGps("activity", "time", [{}]));
