var width;
var height;
var pauseInd = true;

var c = null;
var context = null;

var gotWholeImage = false;

var doneRendering = false;

var websocket = null;
var uri;
downloadElement = document.getElementById("downloadWrapper");
playPauseButton = document.getElementById("playpause");

playGlyph = '<span class="glyphicon glyphicon-play"></span>';
pauseGlyph = '<span class="glyphicon glyphicon-pause"></span>';
resetGlyph = '<span class="glyphicon glyphicon-repeat"></span>'

if (window.location.hostname === "localhost"){
	uri = "ws://localhost:8080/imagesocket";
} else {
	uri = "wss://rainbowgen-nmiles.herokuapp.com/imagesocket";
}

function paintCanvasBlack(){
	c = document.getElementById("myCanvas");
	context = c.getContext("2d");
	context.fillStyle = "#000000";
	width = c.offsetWidth;
	height = c.offsetHeight;
	c.setAttribute("width", width);
	c.setAttribute("height", height);
	context.fillRect(0, 0, width, height);
}

var clientDisconnected = false;
function getImage(imageType) {
	if (websocket !== null && websocket.readyState == 1){
		clientDisconnected = true;
		websocket.close();
	}
	downloadElement.style.visibility = 'visible';
	document.getElementById("buttonWrapper").style.visibility = "visible";
	document.getElementById("sliderWrapper").style.visibility = "visible";
	chunks = [];
	pauseInd = false;
	playing = false;
	doneRendering = false;
	chunkCounter = 0;
	chunkIndex = 0;
	gotWholeImage = false;
	paintCanvasBlack();
	play();
	connect(imageType);
}

function newIterator(){
	getImage("fastIterator");
}

function newStained(){
	getImage("stainedGlass")
}

function connect(imageType){
	if ('WebSocket' in window) {
		websocket = new WebSocket(uri);
	} else if ('MozWebSocket' in window) {
		websocket = new MozWebSocket(uri);
	} else {
		alert('WebSocket is not supported by this browser.');
		return;
	}
	websocket.onopen = function(){
		switch (imageType){
			case "fastIterator":
				var percent = parseInt($("#iteratorPercent").val());
				websocket.send(JSON.stringify({
					"type": "fastIterator",
					"width": width,
					"height": height,
					"individualPercent": percent
				}));
				break;
			case "stainedGlass":
				var startingPoints = parseInt($("#startingPoints").val());
				websocket.send(JSON.stringify({
					"type": "stainedGlass",
					"width": width,
					"height": height,
					"startingPoints": startingPoints
				}));
				break;
		}
		//websocket.send("new " + width + " " + height + " " + percent);
	}

	websocket.onclose = function() {
		setTimeout( function(){
			if (!clientDisconnected && !gotWholeImage){
				downloadElement.style.visibility = 'hidden';
				alert("Something went wrong, sorry.");
			}
			clientDisconnected = true;
		}, 200);
	}

	websocket.onmessage = function(event) {
		var data = JSON.parse(event.data);
		var type = data.type;
		switch (type){
			case "chunk":
				//console.log("Got a chunk");
				addChunk(data.chunk);
				break;
			case "done":
				console.log("Done. Got " + chunks.length + " chunks.");
				gotWholeImage = true;
				websocket.close();
				downloadElement.style.visibility = 'hidden';
				break;
			case "error":
				alert(data.message);
				websocket.close();
		}
	}
}

var chunks = [];

function addChunk(data){
	chunks.push(data);
	//console.log("pushed chunk");
	if (!pauseInd){
		play();
	}
}

var playing = false;
function play() {
	if (playing){
		return;
	}
	if (doneRendering){
		context.fillStyle = "#000000";
		context.fillRect(0, 0, width, height);
		chunkCounter = 0;
		chunkIndex = 0;
		doneRendering = false;
	}
	playPauseButton.innerHTML = pauseGlyph;
	playPauseButton.setAttribute("onclick", "pause()");
	pauseInd = false;
	playing = true;
	step(performance.now());
}

var pixelsThisFrame;
var ppf = 500;
var chunkCounter = 0;
var chunkIndex = 0;
var x;
var y;
var color;
function step(timestamp) {
	if (pauseInd) {
		playing = false;
		return;
	}
	pixelsThisFrame = 0;
	outerLoop:
	for (; pixelsThisFrame <= ppf && chunkCounter < chunks.length; chunkCounter++){
		var end = chunks[chunkCounter].length;
		for (;chunkIndex < end; chunkIndex += 12, pixelsThisFrame++){
			x = parseInt(chunks[chunkCounter].substring(chunkIndex, chunkIndex + 3), 16);
			y = parseInt(chunks[chunkCounter].substring(chunkIndex + 3, chunkIndex + 6), 16);
			color = "#" + chunks[chunkCounter].substring(chunkIndex + 6, chunkIndex + 12);
			context.fillStyle = color;
			//console.log("Adding " + x + " " + y + " " + color);
			//console.log("adding pixel");
			context.fillRect(x, y, 1, 1);
			if (pixelsThisFrame >= ppf){
				break outerLoop;
			}
		}
		chunkIndex = 0;
	}
	//console.log(gotWholeImage + " " + (chunkCounter == chunks.length));
	if (gotWholeImage &&
		chunkCounter == chunks.length){
		doneRendering = true;
		pauseInd = true;
		playPauseButton.innerHTML = resetGlyph;
		playPauseButton.setAttribute("onclick", "play()");
	}
	
	window.requestAnimationFrame(step);
}

function pause() {
	pauseInd = true;
	playPauseButton.innerHTML = playGlyph;
	playPauseButton.setAttribute("onclick", "play()");
}

function reset() {
	pause();
	doneRendering = false;
	window.requestAnimationFrame(resetCont);
}

function resetCont() {
	c = document.getElementById("myCanvas");
	context = c.getContext("2d");
	context.fillStyle = "#000000";
	context.fillRect(0, 0, width, height);
	chunkCounter = 0;
	chunkIndex = 0;
}

paintCanvasBlack();
var speedSlider = document.getElementById("speedSlider");

function changeSpeed(){
	ppf = speedSlider.noUiSlider.get();
}

noUiSlider.create(speedSlider,{
	start: 500,
	range: {
		'min': 1,
		'30%': 100,
		'60%': 2000,
		'max': 5000
	}
});
speedSlider.noUiSlider.on('slide', changeSpeed);
document.getElementById("controlsWrapper").style.visibility = 'visible';