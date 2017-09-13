
//Initialize
$(document).ready(function () {

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