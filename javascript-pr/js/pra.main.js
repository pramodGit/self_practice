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

/*global FB:false, jQuery, window, document*/

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

	/**
     * Angus Croll awesome typeof fix from http://goo.gl/dat30
     */
	$.toType = (function toType(global) {
		return function (obj) {
			if (obj === global) {
				return "global";
			}
			return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
		};
	}(this));

    /*$.toType(window); //"global" (all browsers)
    $.toType([1,2,3]); //"array" (all browsers)
    $.toType(/a-z/); //"regexp" (all browsers)
    $.toType(JSON); //"json" (all browsers)
    $.toType(null); //"null" (all browsers)
    $.toType(undefined); //"undefined" (all browsers)*/
    //etc..

    /**
     * My Plugin [ Slider ]
     */
    $.prSlider = function (appliedDiv, liWidth, scrollCount, auto) {

        var totalLI = appliedDiv.find('ul li').size(),
            totalW = totalLI * liWidth,
            scrollwidth = liWidth * scrollCount,
            lastIMG = '-'+(totalW - scrollwidth),
            interval,
            slideClick = scrollCount;
            appliedDiv.find('ul').css('width',totalW);

        if(auto == 'true' || auto == undefined){
            // Interval
            interval = setInterval(function(){
                appliedDiv.find('.btnNext').click();
            },7000);
            // Pause on mouse enter
            appliedDiv.bind('mouseenter', function(){
                clearInterval(interval);
                interval = null;
            });
            // Set Interval back on mouse leave
            appliedDiv.bind('mouseleave', function(){
                interval = setInterval(function(){
                    appliedDiv.find('.btnNext').click();
                },7000);
            })
        }
        // Previous Click
        appliedDiv.find('.btnPrev').on("click", function(event){
            event.preventDefault();
            if(slideClick > scrollCount){
                appliedDiv.find('ul').animate({
                    left:'+='+scrollwidth
                },800);
                slideClick = slideClick - scrollCount;
            }
            else if(slideClick == scrollCount){
                appliedDiv.find('ul').animate({
                    left:lastIMG
                },1000);
                slideClick = totalLI;
            }
        });
        // Next Click
        appliedDiv.find('.btnNext').on("click", function(event){
            event.preventDefault();
            if(slideClick < totalLI){
                appliedDiv.find('ul').animate({
                    left:'-='+scrollwidth
                },800);
                slideClick = slideClick + scrollCount;
            }
            else if(slideClick == totalLI){
                appliedDiv.find('ul').animate({
                    left:'0'
                },1000);
                slideClick = scrollCount;
            }
        });
    };

	/*
     * Singletons serve as a namespace provider which isolate implementation code
     * from the global namespace so as to provide a single point of access for functions,
     * this is useful for organizing code into logical sections.
     * It is possible to put parentheses around this structure to instantiate it immediately after it's parsed.
     * This way it's always present when the script is executed and doesn't have to be instantiated separately.
	*/
    pr.main = (function () {

        // Facebook module
        function _fbModule() {

            var _this = this;
            /* Store this to avoid scope conflicts */

            this.fbReady = function () {
                /**
                 * This code loads the SDK asynchronously so it does not block loading other elements of your page. This is particularly important to ensure fast page loads for users and SEO robots.
                 */
                window.fbAsyncInit = function () {
                    FB.init({
                        appId: pr.config.appId, /*read from config*/
                        status: true,
                        cookie: true,
                        xfbml: true
                    });

                    /**
                     * The FB.Event.subscribe is used to subscribe to login events
                     */
                    FB.Event.subscribe('auth.login', function () {
                        // do something when user logs in
                        //_this.login();
                    });

                    /**
                     * The FB.Event.subscribe is used to subscribe to logout events
                     */
                    FB.Event.subscribe('auth.logout', function () {
                        // do something when user logs out.
                        //_this.logout();
                    });

                    /**
                     * To determine if a user is connected to your app
                     */
                    FB.getLoginStatus(function (response) {
                        if (response.status === 'connected') {
                            // the user is logged in and connected to your
                            // app, and response.authResponse supplies
                            // the user's ID, a valid access token, a signed
                            // request, and the time the access token
                            // and signed request each expire
                            var uid = response.authResponse.userID,
                                accessToken = response.authResponse.accessToken;
                            //$.log("uid: " + uid + "\nAccess Token: " + accessToken);
                        } else if (response.status === 'not_authorized') {
                            $.log("The user is logged in to Facebook but not connected to the app");
                        }
                    });
                };

                /**
                 * Load the SDK Asynchronously
                 */
                (function (d) {
                    var js, id = 'facebook-jssdk';
                    if (d.getElementById(id)) {
                        return;
                    }
                    js = d.createElement('script');
                    js.id = id;
                    js.async = true;
                    js.src = "//connect.facebook.net/en_US/all.js";
                    d.getElementsByTagName('head')[0].appendChild(js);
                }(document));
            };

            /**
             * facebookLogin - FB.login prompts the user to authorize your application
             */
            this.facebookLogin = function () {
                FB.login(function (response) {
                    if (response.status === "connected") {
                        //$.log("User is logged in and granted some permissions.");
                        FB.api('/me', function(response) {
                            // response will contain the user data you have permissions for
                            $.log(response);
                            $.log(response.id);
                            $.log(response.name);
                        });
                        $("#prFB").html("Logged In....");
                       /* FB.api('me/friends/', function(returnData) {
                            $.log(returnData); 
                        });*/
                    } else if ((response.status === 'not_authorized') || response.authResponse === null) {
                        $.log("User has not granted permissions!");
                    }
                }, {
                    scope: 'publish_stream'
                });
            };
            var loginCheck = function () {
                $("#prFB").on("click", function () {
                    _this.facebookLogin();
                });
            };

            /**
             * Init call
             */
            this.init = function () {
                _this.fbReady();
                loginCheck();

                return this; /*this refere to pr.fbModule*/
            };

            return this.init(); /*initialize the init()*/
        };

        // my module without Facebook
        function _prModule() {

            var _this = this;
            /* Store this to avoid scope conflicts */

            /**
             * private method
             */
            var addNum = function (a, b) {
                var a = 3;
                var b = 4;
                this.c = 100;
                var sum = function () {
                    $("h3").text('test');
                    //console.log('sum - first');
                }
                //sum();
            };
            /**
            * Inheritance
            */
            addNum.sum = function () {
                $("h3").text('test');
                //console.log('sum - second');
            };
            /**
            * Inheritance
            */
            this.addNumMethod = function (x, y) {
                addNum.prototype.sum = function (x, y, c) {
                    var s = x + y;
                    //console.log(s);
                    if (c < s) {
                        $("h2").text('Sum = ' +s);
                        //console.log('sum - third-1');
                    }
                    else {
                        $("h2").text('C = ' +c);
                        //console.log('sum - third-2');
                    }
                    
                };
                var ss = new addNum();
                ss.sum(x, y, ss.c);
            };

            /**
            * create div element and styling
            *
            **/
            this.createDynamicElement = function (elm, config) {
                var myInput = document.createElement(elm);
                for(var c in config){
                    if (config.hasOwnProperty(c)) {
                        if(typeof config[c] == "object") {
                            //console.log(config[c]);
                            for(var st in config[c]){
                                myInput[c][st] = config[c][st];
                                //console.log(config[c][st]);
                            }
                        }
                        else {
                            myInput.setAttribute(c, config[c]);
                        }
                    }
                };
                //document.body.appendChild(myInput);
                return myInput;
            };
            this.createDynamicTable = function (elm, config, rowCount) {
                var tb = _this.createDynamicElement(elm, config);
                //alert(tb);
                for(var i=0; i<rowCount; i++){
                    var _text = document.createTextNode(pr.config.dynamicTable.ct.text),
                        _td = document.createElement("td"),
                        _tr = document.createElement("tr");
                        if (i%2 != 0){
                            _tr.className = "odd";
                        };
                    tb.appendChild(_tr).appendChild(_td).appendChild(_text);
                };
                //document.body.appendChild(tb);
                //console.log(tb);
                return(tb);
            };
            var createDynamicElement = function () {
                //var d = _this.createDynamicElement("div", pr.config.dynamicDiv);
                //document.body.appendChild(d);
                var tbl = _this.createDynamicTable("table", pr.config.dynamicTable.set, pr.config.dynamicTable.ct.rowCount);
                //console.log(tbl);
                $(".dataTable").append(tbl);
            };

            /**
             * Dropdown : not jquery
             */
            this.dropDownMenu = function () {
                var link = document.getElementById("nav").getElementsByTagName("a"),
                    linkLength = link.length;
                for(var i=0; i<linkLength;i++){
                    link[i].onmouseover = function(){
                        var nextElem = this.nextElementSibling || this.nextSibling ;
                        if(nextElem != null){
                            while (nextElem.innerHTML==undefined) { 
                                nextElem = nextElem.nextSibling;
                            };
                            nextElem.style.display = "block";
                            nextElem.onmouseover = function() {
                                this.style.display = "block";
                            }
                        }
                    }
                    link[i].onmouseout = function(){
                        var nextElem = this.nextElementSibling || this.nextSibling ;
                        if(nextElem != null){
                            while (nextElem.innerHTML==undefined) { 
                                nextElem = nextElem.nextSibling;
                            };
                            nextElem.style.display = "none";
                            nextElem.onmouseout = function() {
                                this.style.display = "none";
                            }
                        }
                    }
                };
            };

            /**
             * change table data
             *
            */
            this.changeTableData = function () {
                $("select").change(function () {
                    var str = "";
                    $("select option:selected").each(function () {
                        str += $(this).text() + " ";
                    });
                    $("h3").text(str);
                    //console.log($("h3").text());
                    var $txt = $("h3").text();
                    //console.log($txt);
                    if ($txt == pr.config.tableData.one.year) {
                        //console.log(pr.config.years.first);
                        var html = '';
                        for (var key=0, rows=$('#dataTable tr').length; key<rows;key++) {

                          html += '<tr><td>'
                                + pr.config.tableData.one.month[key]
                                + '</td><td class="whatever1">'
                                + pr.config.tableData.one.task[key]
                                + '</td><td class="whatever2">'
                                + pr.config.tableData.one.sttus[key]
                                + '</td></tr>';
                        }

                        $('#dataTable').html(html);
                    }
                    else {
                        //console.log(pr.config.years.second);
                        var html = '';
                        //console.log($('#dataTable tr').length);
                        //var rows = document.getElementById("dataTable").getElementsByTagName("tr").length;
                        //var rows = document.getElementById("dataTable").rows.length;
                        //var rows = document.getElementById("dataTable").getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
                        //console.log(rows);
                        for (var key=0, rows=$('#dataTable tr').length; key<rows;key++) {

                          html += '<tr><td>'
                                 + pr.config.tableData.two.month[key]
                                 + '</td><td>'
                                 + pr.config.tableData.two.task[key]
                                 + '</td><td>'
                                 + pr.config.tableData.two.sttus[key]
                                 + '</td></tr>';
                        }

                        $('#dataTable').html(html);
                    }
                }).change();
            };
            /*
            * Carousel creation
            */
            this.createCarousel = function () {
                var caruselElement = '',
                    liElement = '',
                    carouselContainer = document.getElementById("carouselContainer"),
                    i = 0,
                    leftControl = '<a href="#" class="controls btnPrev">Left</a>',
                    rightControl = '<a href="#" class="controls btnNext">Right</a>';
                    wdth = pr.config.carouselImages.length * 214;
                for (i; i < pr.config.carouselImages.length; i += 1) {
                    liElement += '<li>' + '<a href="#"><img width="' + pr.config.imgWidth + '" height="' + pr.config.imgHeight + '" src="images/' + pr.config.carouselImages[i] + '" /></a>' + '</li>';
                }
                caruselElement = '<div class="slider"><ul id="carousel" style="width:'+wdth+'px">' + liElement + '</ul></div>';
                carouselContainer.innerHTML = caruselElement + leftControl + rightControl;
            };
            this.displayCarousel = function () {
                var carouselContainer = document.getElementById("carouselContainer");
                if (carouselContainer) {
                    _this.createCarousel();
                } else {
                    //alert("carousel is not present in this page");
                }
            };
            /*
            * slider control
            */
            this.sliderControl = function () {
                var $carouselContainer = $("#carouselContainer"),
                    $data = $carouselContainer.find("img").eq(0),
                    $liWidth;
                $data.load(function() {
                    $liWidth = $data.outerWidth();
                    $liWidth = $liWidth + 4;
                    $.prSlider($carouselContainer, $liWidth, pr.config.slider.scrollCount, pr.config.slider.auto);
                });
                
                /*
                $(".controls").on("click", function (event) {
                    var $liWidth = $("#carousel li").outerWidth() + 10,
                        $liWidth = $liWidth * 3,
                        $liCount = $("#carousel li").length;
                    if ($(this).hasClass("disable")) {
                        event.preventDefault();
                        return false;
                    }
                    else if ($(this).hasClass("right")) {
                        event.preventDefault();   
                        $(".controls").removeClass("disable");
                        $liCount = $liCount - 3;

                        if ($liCount < 3) {
                            $(this).addClass("disable");
                            return false;
                        }
                        else {
                            
                            $("#carousel").css({
                                "left" : +-+$liWidth,
                                "right" : 0
                            });
                            $liWidth = $liWidth * 2;
                        }                
                    }
                    else if ($(this).hasClass("left")) {
                        event.preventDefault();   
                        $(".controls").removeClass("disable");
                        $liCount = $liCount - 3;

                        if ($liCount < 3) {
                            $(this).addClass("disable");
                            return false;
                        }
                        else {
                            
                            $("#carousel").css({
                                "right" : +-+$liWidth,
                                "left" : 0
                            });
                            $liWidth = $liWidth * 2;
                        }
                    }
                });*/
            };

            /**
             * Init call
             */
            this.init = function () {
                //_this.addNumMethod();
                //addNum.sum();
                createDynamicElement();
                //_this.dropDownMenu();
                _this.changeTableData();
                _this.displayCarousel();
                _this.sliderControl();

                return this; /*this refere to pr.prModule*/
            };

            return this.init(); /*initialize the init()*/
        };

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
                        post_data = form.serialize();
                    $('#loader', form).html('<img src="ajax-loader.gif" /> Please Wait...');
                    $.ajax({
                       type: "POST",
                       url: post_url,
                       data: post_data,
                       success: function(msg) {
                            $(form).fadeOut(500, function(){
                                form.html(msg).fadeIn();
                            });
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
        };
        // check which branch has to be execute
        if ($("body").attr("id") == 'prFacebook') {
            return new _fbModule(); /*creating a new object of fbModule rather then a funtion*/
        }
        else if ($("body").attr("id") == 'prContact') {
            return new _prContact(); /*creating a new object of prContact rather then a funtion*/
        }
        else {
            return new _prModule(); /*creating a new object of prModule rather then a funtion*/
        }
        
    }());

/**
 * Check to evaluate whether 'pr' exists in the global namespace - if not, assign window.pr an object literal
 */
}(window.pr = window.pr || {}, jQuery));