function randomize(start, deviation) {
	var min = start - deviation;
	var max = start + deviation;
	return Math.floor(Math.random() * (max - min + 1) + min);
}


function wiggle(container_id, wiggleDeviation, delay, delayDeviation) {
	var wiggleElements = "#" + container_id + " > .wiggle";
	$.each($(wiggleElements), function () {

		var randomDelay = randomize(delay, delayDeviation);

		$(this).animate({
			"top": randomize(0, wiggleDeviation),
			"left": randomize(0, wiggleDeviation)
		}, randomDelay,
		function () {
			wiggle(container_id, wiggleDeviation, delay, delayDeviation);
		}
		);
	});

}

function polygonShake(svg_id, originalPointData, x_deviation, y_deviation, delay) {

	var svgPolygon = "#" + svg_id + " > polygon";
	var str_newPoints = "";

	for (i = 0; i < originalPointData.length; i++) {

		//Create new variables and set to original
		var newX = originalPointData[i][0];
		var newY = originalPointData[i][1];

		//validate between limit points (0 and 100)
		//set new variables to random number within deviation
		if (originalPointData[i][0] > 0 & originalPointData[i][0] < 100)
		{
			newX = randomize(originalPointData[i][0], x_deviation);
		}
		if (originalPointData[i][1] > 0 || originalPointData[i][1] < 100)
		{
			newY = randomize(originalPointData[i][1], y_deviation);
		}

		//write new variables to newPoints
		str_newPoints = str_newPoints + newX.toString() + "," + newY.toString() + " ";
	}

	setTimeout(function () {
		$(svgPolygon).attr("points", str_newPoints);
		polygonShake(svg_id, originalPointData, x_deviation, y_deviation, delay);
	}, delay);
}

function getOriginalPolygonPoints(svg_id)
{
	var svgPolygon = "#" + svg_id + " > polygon";
	var arr_pointPair = [];
	var pointOrig = $(svgPolygon).attr("points").split(" ");
	for (i = 0; i < pointOrig.length; i++) {
		var getSeperatedPoints = pointOrig[i].split(",");
		arr_pointPair.push([Number(getSeperatedPoints[0]), Number(getSeperatedPoints[1])]);
	}

	return arr_pointPair;
}




function extrudedText(element_id, depth, rgb, stretch, shadow)
{
	var element = "#" + element_id;
	var originalText = $(element).html().trim();
	var textSplit = originalText.split("");
	var textSplitCenter = Math.floor(textSplit.length/2);
	
	$(element).empty();
	$.each(textSplit, function (charCount, char) {
		var textShadow = 'text-shadow:';
		var zIndex = 'z-index:' + (100 - Math.abs(textSplitCenter-charCount)).toString() + "; ";

		for (i = 1; i <= depth; i++)
		{
			var punctuation = ", ";
			if (i == depth) punctuation = '" ';
			var horizontalStretch = ((textSplitCenter - charCount) * stretch * i).toString() + "px ";
			var newTextShadowLine = horizontalStretch + i.toString() + "px 0 " + rgbDarkened(rgb, i, shadow) + punctuation;
			textShadow = textShadow + newTextShadowLine;
		}

		$(element).append('<span style="position:relative; ' + zIndex + textShadow + ">" + char + "</span>");
	});
}
function rgbDarkened(rgb, point, rate)
{
	var darkenRate = point * rate;
	var rgbString = "rgb(" + (rgb[0] - darkenRate).toString() + ", " + (rgb[1] - darkenRate).toString() + ", " + (rgb[2] - darkenRate).toString() + ")"
	return rgbString;
}





function extrudedTextLite(element_id, depth, color) {
	var element = "#" + element_id;
	var textShadow = "";

	for (i = 1; i <= depth; i++) {
		var punctuation = ", ";
		if (i == depth) punctuation = "";
		var newTextShadowLine = "0 " + i.toString() + "px 0 " + color + punctuation;
		textShadow = textShadow + newTextShadowLine;
	}

	$(element).css("text-shadow", textShadow);
}




function initRayPolyHover()
{
	//var defaultPoly = $("#ray_poly_controller").find('[data-poly="8"]');
	//rayPolyMouseOn(defaultPoly);
	$("#ray_poly_controller").children().on("mouseover", function () { rayPolyMouseOn(this); });
}
function rayPolyMouseOn(poly)
{
	var polyData = parseInt($(poly).data("poly"));

	//reset All
	$("#ray_poly").children().css("fill-opacity", "0.4");

	$("#ray_poly").find('[data-poly="' + String(polyData) + '"]').css("fill-opacity", "1");

	if(polyData - 1 > 0)
	{
		$("#ray_poly").find('[data-poly="' + String(polyData - 1) + '"]').css("fill-opacity", "0.85");

		if (polyData - 2 > 0)
		{
			$("#ray_poly").find('[data-poly="' + String(polyData - 2) + '"]').css("fill-opacity", "0.75");

			if (polyData - 3 > 0) {
				$("#ray_poly").find('[data-poly="' + String(polyData - 2) + '"]').css("fill-opacity", "0.60");
			}
		}
	}
	if (polyData + 1 < 16) {
		$("#ray_poly").find('[data-poly="' + String(polyData + 1) + '"]').css("fill-opacity", "0.85");

		if (polyData + 2 < 16) {
			$("#ray_poly").find('[data-poly="' + String(polyData + 2) + '"]').css("fill-opacity", "0.75");

			if (polyData + 3 < 16) {
				$("#ray_poly").find('[data-poly="' + String(polyData + 2) + '"]').css("fill-opacity", "0.60");
			}
		}
	}

}




