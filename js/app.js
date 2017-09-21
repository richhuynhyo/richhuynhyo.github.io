
//Document Ready
$(document).ready(function () {
});

//Window Load
$(window).load(function () {
	preload();
	initializeGallery();
});




function preload() {
	$("#preload_message").fadeOut(400,
		function()
		{
			$("#preload_container").fadeOut(400);
		}
	);
}


function initializeGallery()
{
	//Home Page
	if ($('#work_gallery').length)
	{
		$('#work_gallery').lightGallery();
	}


	//Check for process page
	if( $('#page_process').length ) 
	{
		$('#process_sketch_gallery').lightGallery();

		$('#process_type_gallery').lightGallery();

		$('#process_photo_gallery').lightGallery();

		$('#process_prototype_gallery').lightGallery();

		$('#process_refine_gallery').lightGallery();

		$('#process_final_gallery').lightGallery();
	}
}
