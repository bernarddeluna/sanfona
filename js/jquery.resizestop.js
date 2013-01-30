/**

    A jQuery version of window.resizeStop.

    This creates a jQuery special event called "resizestop". This event fires after a certain number of milliseconds since the last resize event fired.

    Additionally, as part of the event data that gets passed to the eventual handler function, the resizestop special event passes the size of the window in an object called "size".

    For example:

    $(window).bind('resizestop', function (e) {
        console.log(e.data.size);
    });

    This is useful for performing actions that depend on the window size, but are expensive in one way or another - i.e. heavy DOM manipulation or asset loading that might be detrimental to performance if run as often as resize events can fire.

    @name jQuery.event.special.resizestop
    @requires jQuery 1.4.2
    @namespace

*/
(function ($, setTimeout) {

    var $window = $(window),
        cache = $([]),
        last = 0,
        timer = 0,
        size = {};

    /**
        Handles window resize events.

        @private
        @ignore
    */
    function onWindowResize() {
        last = $.now();
        timer = timer || setTimeout(checkTime, 10);
    }

    /**
        Checks if the last window resize was over the threshold. If so, executes all the functions in the cache.

        @private
        @ignore
    */
    function checkTime() {
        var now = $.now();
        if (now - last < $.resizestop.threshold) {
            timer = setTimeout(checkTime, 10);
        } else {
            clearTimeout(timer);
            timer = last = 0;
            size.width = $window.width();
            size.height = $window.height();
            cache.trigger('resizestop');
        }
    }

    /**
        Contains configuration settings for resizestop events.

        @namespace
    */
    $.resizestop = {
        propagate: false,
        threshold: 500
    };

    /**
        Contains helper methods used by the jQuery special events API.

        @namespace
        @ignore
    */
    $.event.special.resizestop = {
        setup: function (data, namespaces) {
            cache = cache.not(this); // Prevent duplicates.
            cache = cache.add(this);
            if (cache.length === 1) {
                $window.bind('resize', onWindowResize);
            }
        },
        teardown: function (namespaces) {
            cache = cache.not(this);
            if (!cache.length) {
                $window.unbind('resize', onWindowResize);
            }
        },
        add: function (handle) {
            var oldHandler = handle.handler;
            handle.handler = function (e) {
                // Generally, we don't want this to propagate.
                if (!$.resizestop.propagate) {
                    e.stopPropagation();
                }
                e.data = e.data || {};
                e.data.size = e.data.size || {};
                $.extend(e.data.size, size);
                return oldHandler.apply(this, arguments);
            };
        }
    };

})(jQuery, setTimeout);