
class richOverlay
{
    constructor()
    {  
        this.initOverlay();
    }
    initOverlay()
    {
        $('body').prepend(this.overlayTemplate());  
        this.addCloseEvent();   
        
    }
    openOverlay(content)
    {

        let overlay = document.querySelector('.overlay');

        /* Toggle the aria-hidden state on the overlay and the
        no-scroll class on the body */
        overlay.setAttribute('aria-hidden', false);
        document.body.classList.toggle('noscroll', true);

        /* On some mobile browser when the overlay was previously
        opened and scrolled, if you open it again it doesn't
        reset its scrollTop property */
        setTimeout(function() { overlay.scrollTop = 0; }, 500);

        $('.overlay-wrap').html(content);

    }
    closeOverlay()
    {

        let overlay = document.querySelector('.overlay');
        overlay.setAttribute('aria-hidden', true);
        document.body.classList.toggle('noscroll', false);

        $('.overlay-wrap').html('');
    }    
    addCloseEvent()
    {
        let ro = this;
        $('.overlay-bg').on("click", (e) =>
        {
            ro.closeOverlay();
        });
        $('.overlay-wrap').on("click", (e) =>
        {
            if (e.target !== this) return;
            ro.closeOverlay();
        });
    }
    overlayTemplate()
    {
        return `<div class="overlay" aria-hidden="true">
            <div class="overlay-bg" aria-hidden="true"></div>
            <div class="overlay-wrap"></div>
        </div>`;
    }	
}

