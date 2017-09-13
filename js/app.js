
//Document Ready
$(document).ready(function () {
	viewportMinWidth();
});

//Window Load
$(window).load(function () {
	preload();
	initializeGallery();
});




function preload() {
	$("#preload_container").fadeOut(400);
}


function initializeGallery()
{
	$('#work_gallery').lightGallery();

}


function viewportMinWidth()
{
	if (window.innerWidth < 480)
	{
		var mvp = document.getElementById('mvp');
		mvp.setAttribute('content', 'width=480');
	}
}