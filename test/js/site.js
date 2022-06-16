window.addEventListener("pageshow", toggleLoader);
  

  
function pageScrollTo(element)
{
  $('html, body').animate({scrollTop: $(element).offset().top}, 500);
}
  

$('a').click(function(){
  var href= $(this).attr('href');
 
  if($(this).hasClass('case-chapter'))
  {
    pageScrollTo(href);
  }
  else
  {
    $('#loader-wrapper').fadeIn( 500, function(){
      window.location=href;
    })  
    return false;
  }
 
})


function toggleLoader()
{
  $('#loader').show();
  setTimeout(() => {
    $('#loader').fadeOut(400);
    setTimeout(() => {
     $('#loader-wrapper').fadeOut(400);
    }, "400");
  }, "400");
 
}

function addContactToDOM()
{
  /*
  setTimeout(()  => {
    addEmailToDOM(`your-public@email.com`)
  }, 1000) // 1000ms or 1 second
  */
}
