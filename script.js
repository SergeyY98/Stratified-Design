var pickedColor;

function init() {
	var numSquares = 6;
	var colorDisplay = document.querySelector("#color-display");
	var resetButton = document.querySelector("#reset");
	var modeButtons = document.querySelectorAll(".mode");
	var squares = document.querySelectorAll(".square");
	reset(numSquares);
	colorDisplay.textContent = pickedColor;
	forEach(setupSquares, squares);
	forEach(setupMode, modeButtons);
	resetButton.addEventListener("click", function() {
		var numSquares = 6;
		if (modeButtons[0].classList.contains("selected")) {
			numSquares = 3;
		}
		reset(numSquares);
	});
}

function setupSquares(item) {
	var squares = document.querySelectorAll(".square");
	item.addEventListener("click", function () {
		var clickedColor = this.style.backgroundColor;
		var resetButton = document.querySelector("#reset");
		var messageDisplay = document.querySelector("#message");
		if(clickedColor === pickedColor) {
			messageDisplay.textContent = "Correct";
			resetButton.textContent = "Play Again";
			forEach(changeColors, squares, pickedColor);
		}
		else {
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "try again";
		}
	});
}

function setupMode(item) {
	var modeButtons = document.querySelectorAll(".mode");
	item.addEventListener("click", function() {
		var numSquares = 6;
		forEach(removeButtons, modeButtons);
		this.classList.add("selected");
		if (this.textContent === "Easy") {
			numSquares = 3;
		}
		reset(numSquares);
	});
}

function removeButtons(item) {
	item.classList.remove("selected");
}

function reset(numSquares) {
	var colorDisplay = document.querySelector("#color-display");
	var messageDisplay = document.querySelector("#message");
	var resetButton = document.querySelector("#reset");
	var squares = document.querySelectorAll(".square");
	var h1 = document.querySelector("h1");
	var colors = makeColors(numSquares);
	pickedColor = chooseColor(colors);
	colorDisplay.textContent = pickedColor;
	h1.style.backgroundColor = "#2C8E99";
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	forEach(checkColor, squares, colors);
}

function makeColors(length) {
	var arr = [];
	for(var i = 0; i < length; i++) {
		arr = push(arr, makeColor());
	}
	return arr;
}

function forEach(f, array, arg) {
	for(var i = 0; i < array.length; i++) {
	  var item = array[i];
	  if(Array.isArray(arg)) {
		f(item, arg[i]);
	  }
	  else {
	  	f(item, arg);
	  }
	}
}

function push(array, element) {
	return withArrayCopy(array, function(copy) {
	  copy.push(element);
	});
}

function withArrayCopy(array, modify) {
	var copy = array.slice();
	modify(copy);
	return copy;
}

function changeColors(item, color) {
	var h1 = document.querySelector("h1");
	item.style.backgroundColor = color;
	h1.style.backgroundColor = color;
}

function checkColor(item, arg) {
	if(arg) { 
		item.style.display = "block";
		item.style.backgroundColor = arg;
	}
	else {
		item.style.display = "none";
	}
}

function chooseColor(colors) {
	var random = getRandomCode(colors.length);
	return colors[random];
}

function makeColor() {
	var r = getRandomCode(256);
	var g = getRandomCode(256);
	var b = getRandomCode(256);
	return "rgb(" + r + ", " + g + ", " + b + ")"; 
}

function getRandomCode(length) {
	return Math.floor(Math.random() * length);
}

init();