
var WRAP_WIDTH;
var WRAP_HEIGHT;
var mouseX = 0;
var mouseY = 0;

//Events
$(document).ready(function () {

	//Load Model
	updateWrapWidthHeight();
	initModel();
	animateModel();

	//ADD EVENT LISTENERS
	initRayPolyHover()
	window.addEventListener("scroll", onScroll, false);
	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener('mousemove', onMouseMove, false);

});

//Looking for more efficent handler
function onScroll()
{
	headerFade();
}
function onMouseMove(event)
{
	MouseMoveModel(event);
};
function onWindowResize()
{
	WindowResizeModel();
}

