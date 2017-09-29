;(function (undefined) {
    "use strict;"

    // Public global variables
    var colors = [],
	scalar = [],
	self = undefined;

    /**
     * 
     *
     * Constructor for heatMapper object
     *
     *
     * @param {array} colorArray - contains the ordered sequence of colors from low
     *                             frequency to high. Colors are objects that have 'r', 'g',
     *                             and 'b' fields with values 0-255.
     * @param {number|array} scale - a number or array of numbers that denotes the scale
     *                               to which the heatmap will map color to frequency. 
     *
     *                               If a number, scale is linear mapping from 0 to the number.
     */

    var heatMapper = function(colorArray=[], scale=[]){
	
	self = this;

	/* Testing and correcting inputs */
	
	if (!colorArray.constructor === Array)
	    throw "error: colorArray must be an array.";

	// If scale is a Number, set it to an array with linearly
	// incrementing numbers from 0 to scale
	if (typeof(scale) === 'number') {
	    var scaleArray = [];
	    for (var i = 0, l = colorArray.length; i < l; i++) {
		scaleArray[i] = scale * i / (l - 1); 
	    }
	    scale = scaleArray;
	}
	if (!scale.constructor === Array )
	    throw "error: scale must be a number or an array.";
	if (scale.length != colorArray.length)
	    throw "error: scale array must be same length as color array";

	// Verify that numbers in scale are in order from least to greatest and no duplicates
	for (i = scale.length - 1; i >= 0; i--)
	    if (scale[i] <= scale[i - 1])
		throw "error: scale array must be ordered least to greatest without duplicates.";

	// Verify that colors have r, g, b fields that are [0,255]
	for (i = 0, l < colorArray.length; i < l; i++)
	    validateColor(colorArray[i]);

	// All tests passed; create object
	colors = colorArray;
	scalar = scale;
    }

    heatMapper.prototype.getRGBColor = function(value) {
	var color;
	
	if (value < scalar[0]) // Beneath lower bound
	    color = colors[0];
	else if (value > scalar[scalar.length - 1]) // Above upper bound
	    color = colors[colors.length - 1];

	else {
	    for (var i = 1, l = scalar.length; i < l; i++)
		if (value <= scalar[i]) { // Value is between scalar[i] and scalar[i-1]
		    var vect = (value - scalar[i - 1]) / (scalar[i] - scalar[i - 1]);
		    var color = {r: vect * (colors[i].r - colors[i - 1].r) + colors[i - 1].r,
				 g: vect * (colors[i].g - colors[i - 1].g) + colors[i - 1].g,
				 b: vect * (colors[i].b - colors[i - 1].b) + colors[i - 1].b};
		    break;
		}
	}
	return "rgb(" + Math.round(color.r) + "," + Math.round(color.g) + "," + Math.round(color.b) + ")";
    }

    heatMapper.prototype.addBreak = function(color, val) {
	validateColor(color);
	
	colors.splice(pushSort(scalars, val), 0, color);
    }

    function pushSort(array, value) {
	var i,
	    l,
	    index = array.length;
	for (i = 0, l = array.length; i < l; i++) {
	    if (value < array[i]) { // Insert at i if less than that value
		index = i;
		array.splice(i, 0, value);
		break;
	    }
	}
	if (index == array.length)
	    array.push(value);
	return index;
    }

    function validateColor(color) {
	//if (!color.r || !color.g || !color.b)
	//throw "error: all colors must have r, g, b fields";
	if (color.r < 0 || color.r > 255)
	    throw "error: red value must be in the range [0,255]";
	if (color.g < 0 || color.g > 255)
	    throw "error: green value must be in the range [0,255]";
	if (color.b < 0 || color.b > 255)
	    throw "error: blue value must be in the range [0,255]";
    }
    
    this.heatMapper = heatMapper;
}).call(this);
