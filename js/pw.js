class richPassword
{
    constructor()
    {
        this.preCheck();
    }

    //Precheck Initialize
    preCheck()
    {
        var pw = Cookies.get('password');
        if (pw != undefined)
        {
            this.cookiePreCheck(pw);
        }
        else
        {
            this.qStringPreCheck();
        }        
    }

    //Precheck Cookie for Correct Password
    cookiePreCheck(pw)
    {        
        var passwordPromise = this.checkPassword(pw);
        passwordPromise.done(() => 
        {            
            this.qStringAutoUnlock(pw);
            this.setCookie(pw);
            // this.qStringAppendToLinks(pw);
            console.log('cookie - works');
            return true;
        });
        passwordPromise.fail(() => 
        {
            console.log('cookie - nope');
            this.qStringPreCheck();
            return false;
        });
    }

    //Precheck Querystring for Correct Password
    qStringPreCheck() 
    {
        var pw = getParameterByName("pw");
        if (pw != null && pw.length > 0)
        {
            var passwordPromise = this.checkPassword(pw);
            passwordPromise.done(() => 
            {            
                this.qStringAutoUnlock(pw);
                this.setCookie(pw);
                // this.qStringAppendToLinks(pw);
                console.log('qs - works');
                return pw;
            });
            passwordPromise.fail(() => 
            {
                console.log('qs - nope');
                return false;
            });
        }
    }

    //auto input querystring as password
    qStringAutoUnlock(pw)
    {
        var rp = this;
        $('[data-case-locked="true"]').click(function () {
            rp.caseUnlock($(this).data("case-id").toString(), pw);                
        });
    }

    //append password as querystring to page urls
    qStringAppendToLinks(pw)
    {
        $("a").each(() => {        
            var linkExclude = $(this).data("pw-exclude");
            var containerExclude = $('[data-pw-exclude="true"]').has(this).length ? true : false;            
            if(!(containerExclude || linkExclude))
            {
                $(this).attr("href", $(this).attr("href") + `?pw=${pw}`);
            }           
        });
    } 
    
    caseUnlock(caseId, password)
    {
        var passwordPromise = this.checkPassword(password);
        passwordPromise.done(() => 
        {
            var hashUrl = "/case" + this.hashPassword(password) + "/" + caseId  + "/";
            if (password != false)
            {
                hashUrl += "?pw=" + password;
            }
            $('#loader-wrapper').fadeIn(500, () => {
                window.location = hashUrl;
            })
        });
        passwordPromise.fail(() => 
        {
            console.log(passwordPromise);
            console.log('fail');
        });
    }

    checkPassword(password)
    {
        var hashUrl = this.hashPassword(password);
        return $.ajax({
            type: "get",
            async: true,
            url : "/case" +  hashUrl + "/pass-check.html",
            dataType : "html"
        });
    }

    hashPassword(password)
    {
        var hashPw = sjcl.hash.sha256.hash(password);
        var newHash = 0;
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






// var rp = new richPassword();



function getParameterByName(name) {
	var url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ''));
}








