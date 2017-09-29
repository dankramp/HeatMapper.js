var canvas = document.getElementById("heatCanvas");
var ctx = canvas.getContext("2d");
var list = document.getElementById("input-list");

var mouseDown = false;
var mouseDragging = false;

var heatmap = new heatMapper();
var colors = [];
var scale = [];
var detail = 1000;

canvas.addEventListener("mousedown", mouseDownHandler);
canvas.addEventListener("mouseup", mouseUpHandler);

function mouseDownHandler(event) {
    mouseDown = true;

    // Find nearest scale within precision of 5px
    
    
    ctx.fillRect(event.offsetX, 0, 1, 100);
    var randomColor = {r: Math.floor(Math.random() * 255),
		       g: Math.floor(Math.random() * 255),
		       b: Math.floor(Math.random() * 255) };
    heatmap.addBreak(randomColor, event.offsetX);
    updateMap();
    updateList();
}

function mouseMoveHandler(event) {
    mouseDragging = mouseDown;
}

function mouseUpHandler(event) {
    mouseDown = false;
    mouseDragging = false;
}

function updateMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < detail; i++) {
	ctx.fillStyle = heatmap.getRGBColor(i * canvas.width / detail);
	ctx.fillRect(i * canvas.width / detail, 0, canvas.width / detail, canvas.height);
    }
}

function updateList() {
    var scalar = heatmap.getScalar();
    var colors = heatmap.getColors();
    list.innerHTML = "";
    for (var i = 0, l = scalar.length; i < l; i++) {
	list.innerHTML += "<li>" + scalar[i] +
	    "<input type='color' value='" + heatmap.colorToHex(colors[i]) + "'></li>";
    }
}

function nearestBreak(x) {

}
