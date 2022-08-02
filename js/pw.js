


class qsPassword
{
    constructor()
    {
        this.password = this.checkQuery();        
    }

    //Check And Append Query If pwQuery Exists
    checkQuery() 
    {
        var pw = getParameterByName("pw");
        if (pw != "" && pw != null)
        {
            this.appendQueryToLinks(pw);
            return pw;
        }
        else
        {
            return false;
        }
    }

    appendQueryToLinks(pw)
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
}

var qs = new qsPassword();





function getParameterByName(name) {
	var url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ''));
}





class lockedCase
{
    constructor()
    {
        
    }
}




function caseUnlock(caseId, password)
{
    var passwordPromise = checkPassword(password);
    passwordPromise.done(() => 
    {
        var hashUrl = "/case" + hashPassword(password) + "/" + caseId  + "/";
        if (qs.password != false)
        {
            hashUrl += "?pw=" + qs.password;
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

function checkPassword(password)
{
    var hashUrl = hashPassword(password);

    return $.ajax({
        type: "get",
        async: true,
        url : "/case" +  hashUrl + "/pass-check.html",
        dataType : "html"
    });

}

function hashPassword(password)
{
    var hashPw = sjcl.hash.sha256.hash(password);
    var newHash = 0;
    hashPw.forEach(element => {
        newHash += element;
    });

    return newHash.toString();

}


