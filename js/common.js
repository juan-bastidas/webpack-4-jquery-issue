define(["jquery", "jquery-migrate"],
    function ($) {

        $('.live_global').live("click", function() {
            alert('Live working');
        });

    }
);
