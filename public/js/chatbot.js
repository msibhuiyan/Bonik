$(function () {

    $('form').on('submit', function (e) {
        var query = $("#message").val();
        showUserText();
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: 'process.php',
            //data: { userID : userID }
            data: {submit:true, message:query},
            success: function (response) {
                var obj = JSON.parse(response);
                var answerdiv = jQuery('<div/>', {
                    html: obj.result.fulfillment.speech.linkify()+'&nbsp;',
                    'class': "rounded-div-bot",
                    tabindex:1
                });
                $("#chat-text").append(answerdiv);
                $(answerdiv).focus();

                $("#message").focus();
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
