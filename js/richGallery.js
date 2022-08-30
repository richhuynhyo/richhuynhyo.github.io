caseUnlock(contentUrl)
{
    let passwordPromise = this.checkPassword(password);
    passwordPromise.done(() => 
    {
        
        
        
        // if (password != false) hashUrl += "?pw=" + password;
        this.setCookie(password);
        $('#loader-wrapper').fadeIn(500, () => {
            window.location = hashUrl;
        })
    }).fail(() => {

        failAction();

    });
}

getContent(contentUrl)
{
    return new $.ajax({
        type: "get",
        async: true,
        url : contentUrl,
        dataType : "html"
    });
}