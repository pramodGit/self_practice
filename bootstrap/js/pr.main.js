/* JavaScript Boilerplate main scripting file *
 * @author    Pramod Kumar
*/
/* pr (our namespace name) and undefined are passed here
 * to ensure 1. namespace can be modified locally and isn't
 * overwritten outside of our function context
 * 2. the value of undefined is guaranteed as being truly
 * undefined. This is to avoid issues with undefined being
 * mutable pre-ES5.
*/

/*jshint forin:true, noarg:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, devel:true, indent:4, maxerr:50, jquery:true */

/*jslint devel: true, nomen: true, unparam: true, sloppy: true, indent: 4, newcap:true */

/*global jQuery, window, require*/

(function (pr, $, undefined) {

    /**
     * Logging function, for debugging mode
     */
	$.log = function (message) {
        if (pr.config.debug && (typeof window.console !== 'undefined' && typeof window.console.log !== 'undefined') && console.debug) {
            console.debug(message);
        } /*else {
            alert(message);
        }*/
    };

	/*
     * Singletons serve as a namespace provider which isolate implementation code
     * from the global namespace so as to provide a single point of access for functions,
     * this is useful for organizing code into logical sections.
     * It is possible to put parentheses around this structure to instantiate it immediately after it's parsed.
     * This way it's always present when the script is executed and doesn't have to be instantiated separately.
	*/
    pr.subModule = (function () {
        // Homepage Module
        function _subModule() {

            var setSkills = {
                set: function() {
                    var $skillSet = $("#skillRating").find(".bar");
                    $.each($skillSet, function () {
                        var rating = $(this).attr("rating"),
                            width = rating + '0' + '%';
                        $(this).css({'width':width});
                    });
                },
                init: function() {
                    setSkills.set();
                }
                    
            };


            /**
             * Init call
             */
            this.init = function () {
                setSkills.init();
                return this; /*this refere to pr.subModule*/
            };

            return this.init(); /*initialize the init()*/
        }
        // Portfolio Module with require JS
        function _prProfile () {
            //var _this = this; /* Store this to avoid scope conflicts */

            /*
            * slider control
            */
            var sliderControl = function () {
                var $carouselContainer = $("#carouselContainer"),
                    $data = $carouselContainer.find("img").eq(0),
                    $liWidth = $("#carousel > li").eq(0).outerWidth();
                $liWidth += 4;
                var $totalLi = $("#carousel > li").length,
                    $wdth = $("#carousel > li").length * pr.config.liWidth;
                $carouselContainer.find("#carousel").css("width",$wdth);
                require(['slider'], function(carouselControl){
    
                    var $windowSize = $(window).width();
                    //console.log($windowSize);
                    if ($windowSize < 1200) {
                        $scrollCount = 2;
                        //console.log('less 1200 -' + $scrollCount)
                    } else if ($windowSize < 979) {
                        $scrollCount = 1;
                        //console.log('more 979 - ' + $scrollCount)
                    } else {
                        $scrollCount = pr.config.slider.scrollCount;
                    }
                    //console.log($scrollCount);
                    carouselControl.slider($carouselContainer, $liWidth, $wdth, $totalLi, $scrollCount, pr.config.slider.auto);
                });
            };
            /**
             * Init call
             */
            this.init = function () {
                sliderControl();

                return this; /*this refere to pr.prProfile*/
            };

            return this.init(); /*initialize the init()*/
        }
        // Contact Form module
        function _prContact () {

            var _this = this; /* Store this to avoid scope conflicts */

            /**
             * Contact Form Submit
             */
            this.contactFormSubmit = function () {
                $("#contactForm").submit(function () {
                    var form = $(this),
                        post_url = form.attr('action'),
                        post_data = form.serialize(),
                        $loader = $('#loader');
                    $loader.html('<img src="../img/loader.gif" /> Please Wait...');
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

            /**
             * Init call
             */
            this.init = function () {
                _this.contactFormSubmit();

                return this; /*this refere to pr.prContact*/
            };

            return this.init(); /*initialize the init()*/
        }
        if ($("body").attr("id") === 'prContact') {
            return new _prContact();
        }
        else if ($("body").attr("id") === 'prPortfolio') {
            return new _prProfile();
        }
        else {
            return new _subModule(); /*creating a new object of prModule rather then a funtion*/
        }
    }());

/**
 * Check to evaluate whether 'pr' exists in the global namespace - if not, assign window.pr an object literal
 */
}(window.pr = window.pr || {}, jQuery));