
/*
	Rich Overlay - Current Version - 1.0
*/



$(function() {
	//Required
	richOverlay.initialize();

});

//Window Load

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

		$(this.container).find('.light-gallery').lightGallery({
			selector: '.lg-item',
			zoom: false,
			download: false
		});

		//$(".cbox").colorbox({rel: ".cbox", maxHeight: "90%", maxWidth: "90%", returnFocus: false});

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
