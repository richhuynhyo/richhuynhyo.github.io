
/*
	Rich Overlay - Current Version - 1.0
*/



$(function() {
	//Required
	richOverlay.initialize();

});

//Window Load

/*
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
		$('#process_inspiration_gallery').lightGallery();

		$('#process_sketch_gallery').lightGallery();

		$('#process_type_gallery').lightGallery();

		$('#process_photo_gallery').lightGallery();

		$('#process_prototype_gallery').lightGallery();

		$('#process_refine_gallery').lightGallery();

		$('#process_final_gallery').lightGallery();
	}
}
*/


$('#rich-overlay').find('.rich-overlay-outer').on('click', function(e)
{
	if (e.target !== this) return;
	else richOverlay.exit();
});


var richOverlay =
{
	content : [],
	container : "#rich-overlay",
	htmlUrl : 'work.html',
	scrollbarWidth : window.innerWidth - document.documentElement.clientWidth,
	initialize : function()
	{
		$.ajax({
			type: "GET",
			async: false,
			url: this.htmlUrl,
			dataType: "html",
			success: function (data)
			{
				$(data).filter('.rich-overlay-content').each(function (index) {
					 richOverlay.content.push($(this).html());
				});
			}
		});
	},
	open : function(index)
	{
		$(this.container).show();
		$(this.container).scrollTop(0);
		$(this.container).find('.rich-overlay-content_wrap').html(this.content[index]);
		$(this.container).find('.rich-overlay-outer').fadeIn();
		$('body').addClass('no-scroll');
		$('body').css('padding-right', this.scrollbarWidth);

		$(".cbox").colorbox({rel: ".cbox", maxHeight: "90%", maxWidth: "90%"});

	},
	exit : function()
	{
		$(this.container).hide();
		$(this.container).find('.rich-overlay-outer').hide();
		$(this.container).find('.rich-overlay-content_wrap').empty();
		$('body').removeClass('no-scroll');
		$('body').css('padding-right', 0);
	}
};
