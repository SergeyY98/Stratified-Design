var pickedColor;

function init() {
	var numSquares = 6;
	var colorDisplay = document.querySelector("#color-display");
	var resetButton = document.querySelector("#reset");
	var modeButtons = document.querySelectorAll(".mode");
	var squares = document.querySelectorAll(".square");
	reset(numSquares);
	colorDisplay.textContent = pickedColor;
	forEachColors(setupSquares, squares.length);
	forEachColors(setupMode, modeButtons.length);
	resetButton.addEventListener("click", function() {
		var numSquares = 6;
		if (modeButtons[0].classList.contains("selected")) {
			numSquares = 3;
		}
		reset(numSquares);
	});
}

function setupSquares(i) {
	var colors = [];
	var squares = document.querySelectorAll(".square");
	squares[i].style.backgroundColor = colors[0];
	squares[i].addEventListener("click", function () {
		var clickedColor = this.style.backgroundColor;
		var resetButton = document.querySelector("#reset");
		var messageDisplay = document.querySelector("#message");
		if(clickedColor === pickedColor) {
			messageDisplay.textContent = "Correct";
			resetButton.textContent = "Play Again";
			forEachColors(changeColors, squares.length, pickedColor);
		}
		else {
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "try again";
		}
	});
}

function setupMode(i) {
	var modeButtons = document.querySelectorAll(".mode");
	modeButtons[i].addEventListener("click", function() {
		var numSquares = 6;
		forEachColors(removeButtons, modeButtons.length, modeButtons);
		this.classList.add("selected");
		if (this.textContent === "Easy") {
			numSquares = 3;
		}
		reset(numSquares);
	});
}

function removeButtons(i, modeButtons) {
	modeButtons[i].classList.remove("selected");
}

function reset(numSquares) {
	var colorDisplay = document.querySelector("#color-display");
	var messageDisplay = document.querySelector("#message");
	var resetButton = document.querySelector("#reset");
	var squares = document.querySelectorAll(".square");
	var h1 = document.querySelector("h1");
	var colors = forEachColors(makeColor, numSquares);
	pickedColor = chooseColor(colors);
	colorDisplay.textContent = pickedColor;
	h1.style.backgroundColor = "#2C8E99";
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	forEachColors(checkColor, squares.length, colors);
}

function forEachColors(f, length, arg) {
	var arr = [];
	for(var i = 0; i < length; i++) {
		arr = push(arr, f(i, arg));
	}
	return arr;
}

function forEach(f, array) {
	for(var i = 0; i < array.length; i++) {
	  var item = array[i];
	  f(item, i);
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

function changeColors(i, color) {
	var h1 = document.querySelector("h1");
	var squares = document.querySelectorAll(".square");
	squares[i].style.backgroundColor = color;
	h1.style.backgroundColor = color;
}

function checkColor(i, colors) {
	var squares = document.querySelectorAll(".square");
	if(colors[i]) { 
		squares[i].style.display = "block";
		squares[i].style.backgroundColor = colors[i];
	}
	else {
		squares[i].style.display = "none";
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