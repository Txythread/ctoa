let converted_span = document.getElementById("converted");
let input_text_field = document.getElementById("metric-input");



// All units without prefixes
const basic_units = ["m", "s", "min", "h", "m/s", "m/h", "t", "Â", "g", "Â°C" "K"]


function convertToBscUnits(valu, prefix, uni){
	let value = valu * 1.0;
	let unit = uni;
	switch (unit) {
		case "min":
			unit = "s";
			value = value * 60;
			break;
		case "h":
			unit = "s";
			value = value * 3600;
			break;
		case "m/h":
			unit = "m/s"
			value = value / 3600;
			break;
		case "t":
			unit = "g";
			value = value * 1_000_000;
			break;
		case "ÂC":
			unit = "K";
			value = value + 273,15;
		default:
			break;
	}
	switch (prefix) {
		case "f":
			value = value / 1_000_000_000_000;
			break;
		case "p":
			value = value / 1_000_000_000;
			break;
		case "n":
			value = value / 1_000_000_000;
			break;
		case "Â":
			value = value / 1_000_000;
			break;
		case "m":
			value = value / 1_000;
			break;
		case "c":
			value = value / 100;
			break;
		case "d":
			value = value / 10;
			break;
		case "da":
			value = value * 10;
			break;
		case "h":
			value = value * 100;
			break;
		case "k":
			value = value * 1_000;
			break;
		case "M":
			value = value * 1_000_000;
			break;
		case "G":
			value = value * 1_000_000_000;
			break;
		case "T":
			value = value * 1_000_000_000_000;
			break;
		case "P":
			value = value * 1_000_000_000_000_000;
			break;
		case "E":
			value = value * 1_000_000_000_000_000_000;
			break;
		case "Z":
			value = value * 1_000_000_000_000_000_000_000;
			break;
		case "Y":
			value = value * 1_000_000_000_000_000_000_000_000;
			break;
		case "R":
			value = value * 1_000_000_000_000_000_000_000_000_000;
			break;
		case "Q": // quetta, 10^30
			value = value * 1_000_000_000_000_000_000_000_000_000_000;
			break;
		default:
			console.log("Prefix not found");
			break;
	}

	return [value, unit];
}

function generateAmerican(value, unit){
	switch (unit) {
		case "m/s":
			switch (Math.floor(Math.random() * 10) % 4){
				case 0:
					return (value / 29780).toString() + " times earth's speed around the sun";
				case 1:
					return (value * 77).toString() + " times the typical speed of a snail";
				case 2:
					return (value / 47.115).toString() + " times the speed of the outer edge of a ceiling fan's blade";
				case 3:
					return (value * 20).toString() + " times the radius of a McDonald's cheeseburger";
			}
			break;
		case "s":
			switch (Math.floor(Math.random() * 10) % 4) {
				case 0:
					return (value / 28382400000).toString() + " times the half life of Californium";
				case 1:
					return (value / 600).toString() + " times the time it takes to eat a cheesburger"; // couldn't find a source, only approximated.
				case 2:
					return (value / 7852764000).toString() + " times the age of the USA";
				case 3:
					return (value / 427541760000000000).toString() + " times the age of the Universe";
			}
			break;
		case "K":
			switch (Math.floor(Math.random() * 10) % 4){
				case 0:
					return (value / 373.15).toString() + " times the boiling temperature of water in Kelvin";
				case 1:
					return (value / 94).toString() + " times some number I made up";
				case 2:
					return (value / 1000).toString() + "kK";
				case 3:
					return ((value - 273.15) / 71.1).toString() + " times the cooking temperature of a Hamburger"
			}
			break;
		default:
			console.log("Unit " + unit + " not implemented");
			break;
	}

	return "N/A"
}


function convertToAmerican(){
	let converted = "";
	
	converted = input_text_field.value;


	let value = parseFloat(converted); // Only the valid numbers are decoded
	let value_str = value.toString();

	converted = converted.slice(value_str.length);

	let prefix = "";
	let unit = "";

	for (i = 0; i <= converted.length; i++){
		let current_unit = converted.slice(i);
		let current_prefix = converted.substring(0, i)
		if (basic_units.includes(current_unit)) {
			unit = current_unit;
			prefix = current_prefix;
			break;
		}
	}

	let result = convertToBscUnits(value, prefix, unit);
	value = result[0];
	unit = result[1];

	converted_span.innerHTML = generateAmerican(value, unit);
}
