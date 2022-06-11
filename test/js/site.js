setTimeout(()  => {
    addEmailToDOM(`your-public@email.com`)
  }, 1000) // 1000ms or 1 second



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


