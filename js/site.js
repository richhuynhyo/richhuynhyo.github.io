
/*
	Rich Overlay - Current Version - 1.0
*/



$(function() {

});


function pageScrollTo(element)
{
	$('html, body').animate({scrollTop: $(element).offset().top}, 500);
}


function openDrum()
{
	if(!$('#drum-clip').is(":visible"))
	{
		$('#drum-clip').slideDown();
	}
	else
	{
		$('#drum-clip').slideUp();
	}

}
