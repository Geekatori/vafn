(function($) {
    "use strict";

    var btnQuestion = $('.btn-question');
    var btnFlag = $('.question__faq');

    btnQuestion.click(function(e) {
        if (is_touch() && !$(this).hasClass('clicked-once')) {

            e.preventDefault();
            btnFlag.fadeIn();
            $(this).addClass('clicked-once');

        } else if (is_touch() && $(this).hasClass('clicked-once')) {

            $('body, html').click(function() {
                btnQuestion.removeClass('clicked-once');
                btnFlag.fadeOut();
            });

            // return true and follow link

        }
    })

    btnQuestion.hover(
        function() {
            btnFlag.fadeIn();
        },
        function() {
            btnFlag.fadeOut();
        }
    );

    function is_touch() {
        return 'ontouchstart' in window || navigator.maxTouchPoints;
    }

})(jQuery);