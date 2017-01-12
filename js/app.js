
var WRAP_WIDTH;
var WRAP_HEIGHT;
var mouseX = 0;
var mouseY = 0;

//Events
$(document).ready(function () {

	//#f2f020
	//extrudedText(element_id, depth, rgb, stretch, shadow)
	extrudedText("title", 40, [242, 240, 32], .35, 1);
	extrudedText("name", 45, [242, 240, 32], .35, 1);

	//Load Model
	updateWrapWidthHeight();
	initModel();
	animateModel();




	//ADD EVENT LISTENERS
	initRayPolyHover();

	document.getElementById('parallax').addEventListener('scroll', onScroll, false);

	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener('mousemove', onMouseMove, false);

});

function onScroll()
{
}


function onMouseMove(event) {
	MouseMoveModel(event);
};
function onWindowResize() {
	WindowResizeModel();
}