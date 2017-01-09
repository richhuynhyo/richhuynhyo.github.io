
var WRAP_WIDTH;
var WRAP_HEIGHT;
var mouseX = 0;
var mouseY = 0;

//Events
$(document).ready(function () {

	//#f2f020
	extrudedText("title", 40, [242, 240, 32], .35, 1);
	extrudedText("name", 45, [242, 240, 32], .35, 1);

	updateWrapWidthHeight();
	initModel();
	animateModel();
});
