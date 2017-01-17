
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
	headerFade();

	//Load Model
	updateWrapWidthHeight();
	initModel();
	animateModel();

	//ADD EVENT LISTENERS
	document.getElementById("parallax").addEventListener("scroll", onScroll, false);
	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener('mousemove', onMouseMove, false);

});

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




function headerFade()
{
	var pos = $("#parallax").scrollTop();
	if (pos < WRAP_HEIGHT)
	{
		var grayPercent = Math.ceil((pos / WRAP_HEIGHT) * 100);
		var gray = "grayscale(" + grayPercent.toString() + "%)";
		var opacity = 1 - ((pos*.8) / (WRAP_HEIGHT));
		$("header").css("filter", gray);
		$("header").css("opacity", opacity);
	}
	else if (pos >= WRAP_HEIGHT)
	{
		$("header").css("filter", "grayscale(100%)");
		$("header").css("opacity", ".2");
	}

}