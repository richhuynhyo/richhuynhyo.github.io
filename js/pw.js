

$(function() {

    



    let pwEngine = new passwordEngine();
    let overlay = new richOverlay();        
    let pwInput = new passwordInputView(overlay, pwEngine);
   
    let preLoad = new passwordPreLoad(pwEngine, overlay, pwInput);

    // overlay.openOverlay();
    // pwInput.showView(4, overlay);
    // pwInput.passwordFail();
});


class passwordEngine
{
    constructor()
    {
        
    }


    caseUnlock(caseId, password, failAction)
    {
        let passwordPromise = this.checkPassword(password);
        passwordPromise.done(() => 
        {
            var hashUrl = "/case" + this.hashPassword(password) + "/" + caseId  + "/";
            
            
            // if (password != false) hashUrl += "?pw=" + password;
            this.setCookie(password);
            $('#loader-wrapper').fadeIn(500, () => {
                window.location = hashUrl;
            })
        }).fail(() => {

            failAction();

        });
    }

    checkPassword(password)
    {
        let hashUrl = this.hashPassword(password);
        return new $.ajax({
            type: "get",
            async: true,
            url : "/case" +  hashUrl + "/pass-check.html",
            dataType : "html"
        });
    }

    hashPassword(password)
    {
        let hashPw = sjcl.hash.sha256.hash(password);
        let newHash = 0;
        hashPw.forEach(element => {
            newHash += element;
        });

        return newHash.toString();
    }

    
    setCookie(password)
    {
        Cookies.set('password', password, { expires: 30 });
    }

}




class passwordPreLoad
{
    constructor(pwEngine, overlay, pwInput)
    {
        
        this.pwEngine = pwEngine;
        this.overlay = overlay;
        this.pwInput = pwInput;

        this.preCheck(overlay, pwInput, pwEngine);
    }

    //Precheck Initialize
    preCheck(overlay, pwInput, pwEngine)
    {
        var pw = Cookies.get('password');

        this.lockCaseLinks(overlay, pwInput);

        if (pw != undefined)
        {
            this.cookiePreCheck(pw, pwEngine);
        }
        else
        {
            this.qStringPreCheck(pwEngine);
        }
    }

    //Precheck Cookie for Correct Password
    cookiePreCheck(pw, pwEngine)
    {        
        var passwordPromise = pwEngine.checkPassword(pw);
        passwordPromise.done(() => 
        {            
            this.unlockCaseLinks(pw);
            pwEngine.setCookie(pw);
            // this.qStringAppendToLinks(pw);
            console.log('cookie - works');
            return true;
        });
        passwordPromise.fail(() => 
        {
            console.log('cookie - nope');
            this.qStringPreCheck(pwEngine);
            return false;
        });
    }

	

    //Precheck Querystring for Correct Password
    qStringPreCheck(pwEngine) 
    {
        let pw = getParameterByName("pw");
        if (pw != null && pw.length > 0)
        {
            var passwordPromise = pwEngine.checkPassword(pw);
            passwordPromise.done(() => 
            {            
                this.unlockCaseLinks(pw);
                pwEngine.setCookie(pw);
                console.log('qs - works');
                return pw;
            });
            passwordPromise.fail(() => 
            {
                console.log('qs - nope');
            });
        }
    }

    //auto input querystring as password
    unlockCaseLinks(pw)
    {
        let pwEngine = this.pwEngine;
        const failAction = () => { console.log('Welp Something Messed Up') };

        //Remove pwInputView If Unlocked
        $('[data-case-locked="true"]').unbind();

        $('.case-link[data-case-locked="true"]').html('View Case');
        $('.password-required').hide();

        $('[data-case-locked="true"]').click(function () {
            pwEngine.caseUnlock($(this).data("case-id").toString(), pw, failAction);                
        });
    }

    lockCaseLinks(overlay, pwInput)
    {
        $('[data-case-locked="true"]').click(function () {         

            let caseId = $(this).data('case-id');
            overlay.openOverlay();
            pwInput.showView(caseId, overlay);
           
        });

    }
}



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




class passwordInputView
{
    constructor(overlay, pwEngine)
    {
        this.overlay = overlay;
        this.pwEngine = pwEngine;
    }

    showView(caseId, overlay)
    {
        $('.overlay-wrap').html(this.viewTemplate(caseId));
        this.addViewEvents(caseId, overlay);
    }

    addViewEvents(caseId, overlay)
    {
        let view = this;

        

        $('#password-submit').on("click", (e) =>
        {
            view.passwordSubmit(caseId);
        });

        $('.close-overlay').on("click", (e) =>
        {
            console.log(overlay);
            overlay.closeOverlay();
        });
    }


    passwordSubmit(caseId)
    {
        let pwEngine = this.pwEngine;
        let pwInput = $("#password-input").val();

        const failAction = () => { this.passwordFail(); };

        let caseUnlocked = pwEngine.caseUnlock(caseId, pwInput, failAction);

    }

    passwordFail()
    {

       
        $('#password-input').attr('class', 'pw-fail');
        $('#password-input').effect('shake', {distance: 5, times: 2});
        $('.password-message').show();
    }


    viewTemplate(caseId)
    {
        return `<div class="password-input-view">					
                    <button class="close-overlay">
                        <img src="img/close.svg" alt="Click to Close Overlay" />
                    </button>
                    <h1>
                        Case ${caseId}
                    </h1>
                    <input id="password-input" type="text" placeholder="Password"/>                    
                    <div class="password-buttons">
                        <button id="password-submit">Submit</button>
                    </div>
                    <div class="password-message">
                        Incorrect Password.
                    </div>
                </div>`;
    }
}









function getParameterByName(name) {
	var url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ''));
}



