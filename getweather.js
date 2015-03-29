// Problem: retrieve weather from online to print to console 
// Solution: use Nodejs to retrieve weather from api taking a zip code as a parameter 

// require the http module from nodejs 
var http = require("http");

// Print error messages
function printError(error) {
	console.log(error.message);
}

var convertTemp = function(temp) {
	var intermediate = temp - 273;
	var faren = 9/5 * intermediate + 32;
	var roundTemp = Math.round(faren);
	return roundTemp; 
}

// Print out message 
function printMessage(city, description, temp_min, temp_max, wind_speed) {
	var message = city + " is expecting a low of " + convertTemp(temp_min) + "F and a high of " + convertTemp(temp_max) + "F . Wind speed is " + wind_speed + " MPH.";
	console.log(message); 
}

function get(city) {
	// Connect to API url
	var request = http.get("http://api.openweathermap.org/data/2.5/weather?q=" + city, function(response) {
		var body = "";

		response.on("data", function(chunk) {
			body += chunk;	
		});

		response.on("end", function() {
			if(response.statusCode === 200) {
				// Parse the data
				var places = JSON.parse(body);
				// Print the data
				printMessage(city, places.weather.description, places.main.temp_min, places.main.temp_max, places.wind.speed)
			}
		});
	});	

	request.on("error", printError);
}

module.exports.get = get; 