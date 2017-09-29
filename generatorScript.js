var canvas = document.getElementById("heatCanvas");
var ctx = canvas.getContext("2d");
var list = document.getElementById("input-list");

var mouseDown = false;
var mouseDragging = false;

var heatmap = new heatMapper();
var colors = [];
var scale = [];
var detail = 100;

canvas.addEventListener("mousedown", mouseDownHandler);
canvas.addEventListener("mousemove", mouseMoveHandler);
canvas.addEventListener("mouseup", mouseUpHandler);

function mouseDownHandler(event) {
    mouseDown = true;

    // Find nearest scale within precision of 5px
}

function mouseMoveHandler(event) {
    mouseDragging = mouseDown;
}

function mouseUpHandler(event) {
    mouseDown = false;

    if (!mouseDragging) {
	var nearest = nearestBreak(event.offsetX);
	
	if (~nearest) { // If a break is found
	    document.getElementById("sp" + nearest).click();
	}
	else {
	    var red = "#ff0000";
	    var randomColor = {r: Math.floor(Math.random() * 255),
			       g: Math.floor(Math.random() * 255),
			       b: Math.floor(Math.random() * 255) };
	    heatmap.addBreak(red, event.offsetX);
	    updateMap();
	    updateList();
	}
    }
    mouseDragging = false;
}

function updateMap() {
    var scalar = heatmap.getScalar();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < detail; i++) {
	ctx.fillStyle = heatmap.getHexColor(i * canvas.width / detail);
	ctx.fillRect(i * canvas.width / detail, 0, canvas.width / detail, canvas.height);
    }
    ctx.strokeStyle = "#ffff00";
    for (var i = 0, l = scalar.length; i < l; i++) {
	ctx.rect(scalar[i]-3, 0, 6, canvas.height);
	ctx.stroke();
    }
}

function updateList() {
    var scalar = heatmap.getScalar();
    var colors = heatmap.getColors();
    for (i = 0, l = list.childNodes.length; i < l; i++) {
	document.getElementById("sp" + i).removeEventListener("input", changeColor);	 
    }
    list.innerHTML = "";
    for (var i = 0, l = scalar.length; i < l; i++) {
	list.innerHTML += "<li>" + scalar[i] +
	    "<input type='color' id='sp" + i + "' value='" + colors[i] + "'></li>";
    }
    for (i = 0, l = scalar.length; i < l; i++) {
	document.getElementById("sp" + i).addEventListener("input", changeColor);	 
    }
}

function changeColor(event) {
    var scalar = heatmap.getScalar(); // remove some of these gets
    var colors = heatmap.getColors();
    colors[parseInt(event.srcElement.id.substring(2))] = event.srcElement.value;
    updateMap();
}

function nearestBreak(x) {
    var scalar = heatmap.getScalar(),
	minDist = Infinity,
	index = -1,
	i,
	l;
    for (i = 0, l = scalar.length; i < l; i++)
	if (Math.abs(x - scalar[i]) < minDist) {
	    minDist = Math.abs(x - scalar[i]);
	    index = i;
	}

    return (minDist < 3) ? index : -1;
}
