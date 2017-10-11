"use strict;"

// DOM Elements
var canvas = document.getElementById("heatCanvas"),
    ctx = canvas.getContext("2d"),
    list = document.getElementById("input-list"),
    val_input = document.getElementById("get-value"),
    log_check = document.getElementById("log-check"),
    
    // Event booleans
    mouseDown = false,
    rightMouseDown = false,
    mouseDragging = false,
    
    // HeatMapper variables
    heatmap = new HeatMapper(),
    detail = 100,
    breakPoint = undefined;

// Event Listeners
canvas.addEventListener("mousedown", mouseDownHandler);
canvas.addEventListener("contextmenu", rightMouseHandler);
canvas.addEventListener("mousemove", mouseMoveHandler);
canvas.addEventListener("mouseup", mouseUpHandler);
val_input.addEventListener("input", valueChangeHandler);
log_check.addEventListener("click", function() {
    updateMap();
    valueChangeHandler(null);
    document.getElementById("code-2").innerHTML = (log_check.checked) ? ", true) = " : ") = ";
});

function valueChangeHandler(event) {
    document.getElementById("hex-value").innerHTML = heatmap.getHexColor(val_input.value * 10, log_check.checked);
}

function mouseDownHandler(event) {
    mouseDown = event.which == 1;
}

function rightMouseHandler(event) {
    event.preventDefault();
    var nearest = nearestBreak(event.offsetX);
    if (~nearest) {
	heatmap.removeBreak(heatmap.getScalar()[nearest]);
	updateCode();
	updateMap();
	updateList();
    }
}

function mouseMoveHandler(event) {
    mouseDragging = mouseDown;
    if (mouseDragging) {
	if (breakPoint == undefined) {
	    breakPoint = nearestBreak(event.offsetX);
	}
	if (~breakPoint) {
	    heatmap.setScalar(breakPoint, event.offsetX - event.offsetX % (canvas.width / detail));
	    updateMap();
	    updateCode();
	}
    }
}

function mouseUpHandler(event) {
    breakPoint = undefined;

    if (mouseDown && !mouseDragging) {
	var nearest = nearestBreak(event.offsetX);
	
	if (~nearest) { // If a break is found
	    document.getElementById("sp" + nearest).click();
	}
	else {
	    heatmap.addBreak("#ff0000", event.offsetX - event.offsetX % (canvas.width / detail));
	    updateMap();
	    updateList();
	    updateCode();
	}
    }
    mouseDragging = false;
    mouseDown = false;
}

function updateCode() {
    document.getElementById("code-box").innerHTML = "// Auto-generated code will appear here\n\n\
var colors = [" + heatmap.getColors().map(function(c){ return "'" + c + "'";}).join(",") + "];\n\
var scale = [" + heatmap.getScalar().map(function(s){ return s / 10; }).join(",") + "];\n\
var heatmap = new HeatMapper(colors, scale);";
}

function getComplementaryColor(color) {
    var value = parseInt("ffffff", 16) - parseInt(color.substring(1), 16);
    return "#" + value.toString(16).padStart(6, '0');
}

function updateMap() {
    var scalar = heatmap.getScalar();
    var colors = heatmap.getColors();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < detail; i++) {
	ctx.fillStyle = heatmap.getHexColor(i * canvas.width / detail, log_check.checked);
	ctx.fillRect(i * canvas.width / detail, 0, canvas.width / detail, canvas.height);
    }

    var rectSize = Math.max(Math.floor(canvas.width / detail), 6);
    for (var i = 0, l = scalar.length; i < l; i++) {
	ctx.beginPath();
	ctx.strokeStyle = getComplementaryColor(colors[i]);
	ctx.strokeRect(scalar[i] - scalar[i] % (rectSize) + .5, 0, rectSize, canvas.height);
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
	list.innerHTML += "<li hidden>" + scalar[i] +
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
    updateCode();
}

function nearestBreak(x) {
    var scalar = heatmap.getScalar(),
	i,
	l;
    for (i = 0, l = scalar.length; i < l; i++)
	if (x - x % (canvas.width / detail) == scalar[i])
	    return i;

    return -1;
}
