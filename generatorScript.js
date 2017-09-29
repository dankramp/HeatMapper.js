var canvas = document.getElementById("heatCanvas");
var ctx = canvas.getContext("2d");

var mouseDown = false;
var mouseDragging = false;

var heatmap = new HeatMapper();
var colors = [];
var scale = [];

canvas.addEventListener("mousedown", mouseDownHandler);
canvas.addEventListener("mouseup", mouseUpHandler);

function mouseDownHandler(event) {
    mouseDown = true;

    // Find nearest scale within precision of 5px
    
    
    ctx.fillRect(event.offsetX, 0, 1, 100);
    
}

function mouseMoveHandler(event) {
    mouseDragging = mouseDown;
}

function mouseUpHandler(event) {
    mouseDown = false;
    mouseDragging = false;
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

function updateMap() {
    
}

function nearestBreak(x) {

}
