var getweather = require("./getweather.js")
var places = process.argv.slice(2);
places.forEach(getweather.get);

