/* global define */

define ([
    'jQuery'
], function ($) {
    var uimContact = function () {
        $("#contactForm").submit(function () {
            var form = $(this),
                post_url = form.attr('action'),
                post_data = form.serialize(),
                $loader = $('#loader');
            $loader.html('<img src="images/loader.gif" /> Please Wait...');
            $.ajax({
                type: "POST",
                url: post_url,
                data: post_data,
                success: function(msg) {
                    $loader.fadeOut(500, function () {
                        $loader.html(msg).fadeIn();
                    });
                    $(form)[0].reset();
                }
            });
            return false; // avoid to execute the actual submit of the form.
        });
    };
    return {
        contact: uimContact()
    };

});
