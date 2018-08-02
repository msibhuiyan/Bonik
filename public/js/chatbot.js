$(function () {

    $('form').on('submit', function (e) {
        var query = $("#message").val();
        var reciverUser = null;
        var money= null;
        showUserText();
        e.preventDefault();

        var uri = "https://api.dialogflow.com/v1/query?v=20150910";
        data = {
                 "contexts": [],
                "lang": "en",
                "query":query,
                "sessionId": "123456",
                "timezone": "Asis/Almaty"
            }
        $.ajax({
            type: 'POST',
            json: true,
            url: uri,
            data:JSON.stringify(data),
             beforeSend: function (xhr) {
             xhr.setRequestHeader('Content-Type', 'application/json');
             xhr.setRequestHeader('Authorization', 'Bearer 06739e5ce32444e4a8f636fed317eb2b');

             },
            success: function (response) {
                var obj = response["result"]["fulfillment"]["speech"];
                reciverUser = response["result"]["contexts"][0]["parameters"]["NumberOne.original"];
                money = response["result"]["contexts"][0]["parameters"]["Money.original"];
                console.log("Reciver User: "+reciverUser);
                console.log("Amount of money: "+ money);

                var answerdiv = jQuery('<div/>', {
                    html: obj.linkify()+'&nbsp;',
                    'class': "rounded-div-bot",
                    tabindex:1
                });
                $("#chat-text").append(answerdiv);
                $(answerdiv).focus();

                $("#message").focus();
            },
            error: function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                console.log(msg);
            }
        });

    });

});

function showUserText(){
    var div = jQuery('<div/>', {
        text: $("#message").val(),
        'class': "rounded-div",
        tabindex:1
    });
    $("#chat-text" ).append(div);
    $("#message").val('');
}

if(!String.linkify) {
    String.prototype.linkify = function() {

        // http://, https://, ftp://
        var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

        // www. sans http:// or https://
        var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

        // Email addresses
        var emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;

        return this
            .replace(urlPattern, '<a target="_blank" href="$&">$&</a>')
            .replace(pseudoUrlPattern, '$1<a target="_blank" href="http://$2">$2</a>')
            .replace(emailAddressPattern, '<a href="mailto:$&">$&</a>');
    };
}
