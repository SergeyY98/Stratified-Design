function init() {
	reset();
	$(".square").on("click", setupSquares);
	$(".mode").on("click", setupModes);
	$("button").on("click", reset);
}

function setupModes() {
	$(".mode").removeClass("selected");
	$( this ).addClass("selected");
}

function setupSquares() {
	var pickedColor = $( "#color-display" ).text();
	var clickedColor = $( this ).css("background-color");
	if(clickedColor === pickedColor) {
		$("#message").text("Correct");
		$("#reset").text("Play Again");
		$("h1, .square").css("background-color", pickedColor);
	}
	else {
		$( this ).css("background-color", "#232323");
		$("#message").text("try again");
	}
}

function reset() {
	var numSquares = 6;
	if ($( ".mode" ).first().hasClass( "selected" )) {
		numSquares = 3;
	}
	var colors = _.times(numSquares, makeColor);
	var pickedColor = _.chain(colors).clone().sample();
	$("#color-display").text(pickedColor);
	$("h1").css("background-color", "#2C8E99");
	$("#reset").text("New Colors");
	$("#message").text("");
	$(".square").css("display", "none");
	$.each(colors, function ( index, value ) {
			$(".square").slice(index,index+1).css("background-color", value).css("display", "block");
	});
}

function makeColor() {
	var r = _.random(0, 256);
	var g = _.random(0, 256);
	var b = _.random(0, 256);
	return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

init();