/*!
* lux_chatOn.main.js
* This file contains the code for the Filter controls.
* 
* @project   lux_chatOn
* @date      2012-12-20 
* @author    SapientNitro
* @client    Unilever
*
*/

/*jshint forin:true, noarg:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, devel:true, indent:4, maxerr:50, jquery:true */

/*jslint devel: true, nomen: true, unparam: true, sloppy: true, indent: 4, newcap:true */

/*global FB:false, jQuery, window, document*/

(function (lux_chatOn, $, undefined) {

    /**
    * Logging function, for debugging mode
    */
    $.log = function (message) {
        if (lux_chatOn.config.debug && (typeof window.console != 'undefined' && typeof window.console.log != 'undefined') && console.debug) {
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
    } (this));

    /*$.toType(window); //"global" (all browsers)
    $.toType([1,2,3]); //"array" (all browsers)
    $.toType(/a-z/); //"regexp" (all browsers)
    $.toType(JSON); //"json" (all browsers)
    $.toType(null); //"null" (all browsers)
    $.toType(undefined); //"undefined" (all browsers)*/
    //etc..

    /**
    * Private properties
    */
    var dataLoader = '<figure class="loader"><img alt="loading..." src="~/../resources/images/loader.gif" width="32" height="32" /></figure>',
        chatOnHTML = {},
        chatOnMainNavHTML = {},
        scrollFlag = 'false',
        styleID = $('input[id$="hdnfldGetInspStyleId"]').val(),
        countMainAjaxCall = 0,
        countSubAjxCall = 0;

    /**
    * Private method
    */

    /* Benefits:
    * 1. Makes it easier to understand "functions as an object".
    * 2. It enforces good semicolon habits.
    * 3. Doesn't have much of the baggage traditionally associated with functions and scope.
    */
    var getData = function () {
    };

    /**
    * Public methods and properties
    */
    lux_chatOn.foobar = "foobar";
    lux_chatOn.sayHello = function () {
        $.log("hello world");
    };

    /*
    * Singletons serve as a namespace provider which isolate implementation code
    * from the global namespace so as to provide a single point of access for functions,
    * this is useful for organizing code into logical sections.
    * It is possible to put parentheses around this structure to instantiate it immediately after it's parsed.
    * This way it's always present when the script is executed and doesn't have to be instantiated separately.
    */
    lux_chatOn.subModule = (function () {
        function _subModule() {

            var _this = this;
            /* Store this to avoid scope conflicts */
            var $backToTop = $(".style-name").position();

            if (!($.browser.msie)) {
                var evt = document.createEvent("MouseEvents");
                evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            }


            /**
            * main nav active method
            */
            this.mainNavActive = function () {
                var $mainNavLi = $("#mainNav > ul > li"),
                    $mainNavDiv = $("#mainNav > ul > li > div"),
                    $mainNavClick = $("#mainNav > ul > li > div > a"),
                    $mainNavStyleClick = $("#mainNav > ul > li > div h2 a"),
                    cs = $("#hdnfldAppPhase").val(),
                    campState = cs,
                    campState7 = $("#hdnAppPhaseWeek7").val(),
                    bodyClass = '',
                    $flowerIcon = $(".flower");
                if (campState7 == cs) { campState = campState7 }
                bodyClass = lux_chatOn.config.campaignStateClass + campState;
                $("body").addClass(bodyClass);
                $mainNavLi.removeClass("active");
                $mainNavStyleClick.on("click touch", function (event) {
                    $(this).parent().next().click();
                    return false;
                });
                $mainNavClick.on("click touch", function (event) {
                    var thsTabIndex = 'mt-' + $(this).attr('id');
                    if (chatOnMainNavHTML[thsTabIndex] == undefined) {
                        event.preventDefault();
                        if ($(this).parent().hasClass("active")) {
                            return false;
                        }
                        var $getUrl = $(this).attr("href"),
                            $imageId = $("#hdnfldImageId").val(),
                            $getUrlForCache = $getUrl.split("?"),
                            $this = $(this);
                        $cacheVal = $getUrlForCache[1].split("=")[1];
                        $cacheVal = $cacheVal.split("&")[0];
                        $cacheVal = ($cacheVal == 'true');
                        $('#middleContent').html(dataLoader);
                        _this.ajaxCallMain($getUrl, $cacheVal, thsTabIndex, campState, $mainNavLi, $mainNavDiv, $mainNavClick, $imageId, cs, $this);
                    }
                    else {
                        event.preventDefault();
                        if ($(this).parent().hasClass("active")) {
                            return false;
                        }
                        var $getUrl = $(this).attr("href"),
                            $imageId = $("#hdnfldImageId").val(),
                            $getUrlForCache = $getUrl.split("?"),
                            $this = $(this);
                        $cacheVal = $getUrlForCache[1].split("=")[1];
                        $cacheVal = $cacheVal.split("&")[0];
                        $cacheVal = ($cacheVal == 'true');
                        $('#middleContent').empty().html(dataLoader);
                        $('#middleContent').html(chatOnMainNavHTML[thsTabIndex]);
                        _this.subNavTab($cacheVal, campState, $imageId, cs);
                        _this.ajaxCompleteMainNav($mainNavLi, $mainNavDiv, $mainNavClick, $imageId, cs, campState, $this);
                    }
                    return false;
                }); // end : mainNavClick
                if (styleID == '1' || styleID == '2' || styleID == '3') {
                    if (_this.isAppleDevice() || $.browser.safari) {
                        $mainNavClick[1].dispatchEvent(evt);
                    } else {
                        $mainNavClick[1].click();
                    }
                }
                else {
                    // matching campaign state for default tab
                    switch (campState) {
                        case lux_chatOn.config.campaignState.PhaseHowToEnter:
                            $mainNavLi = $("#mainNav").find("li").eq(0);
                            $mainNavLi.addClass("wide");
                            $mainNavLi.find("div").addClass("wide");
                            $mainNavClick.eq(0).addClass("wide");
                            $("#mainNav").find("li").find(".vote-now").hide();
                            $("#mainNav").find("li").find(".winners-prizes").hide();
                            if (_this.isAppleDevice() || $.browser.safari) {
                                $mainNavClick[0].dispatchEvent(evt);
                            } else {
                                $mainNavClick[0].click();
                            }
                            break;
                        case lux_chatOn.config.campaignState.PhaseGetInspiredVintageClassic:
                        case lux_chatOn.config.campaignState.PhaseGetInspiredBewitchinglyGlamourous:
                            _this.nonClickable($mainNavClick.eq(2));
                            $("#mainNav").find("li").find(".winners-prizes").hide();
                            if (_this.isAppleDevice() || $.browser.safari) {
                                $mainNavClick[1].dispatchEvent(evt);
                            } else {
                                $mainNavClick[1].click();
                            }
                            break;
                        case lux_chatOn.config.campaignState.PhaseGetInspiredDazzlingWhite:
                            $("#mainNav").find("li").find(".winners-prizes").hide();
                            if (_this.isAppleDevice() || $.browser.safari) {
                                $mainNavClick[1].dispatchEvent(evt);
                            } else {
                                $mainNavClick[1].click();
                            }
                            break;
                        case lux_chatOn.config.campaignState.PhaseVoteNowVintageClassic:
                        case lux_chatOn.config.campaignState.PhaseVoteNowBewitchinglyGlamourous:
                            $("#mainNav").find("li").find(".winners-prizes").hide();
                            if (_this.isAppleDevice() || $.browser.safari) {
                                $mainNavClick[2].dispatchEvent(evt);
                            } else {
                                $mainNavClick[2].click();
                            }
                            break;
                        case lux_chatOn.config.campaignState.PhaseGetInspiredDazzlingWhite1:
                            _this.nonClickable($mainNavClick.eq(0));
                            $("#HowToEnter").find(".cta-button").hide();
                            $("#mainNav").find("li").find(".winners-prizes").hide();
                            if (_this.isAppleDevice() || $.browser.safari) {
                                $mainNavClick[1].dispatchEvent(evt);
                            } else {
                                $mainNavClick[1].click();
                            }
                            break;
                        case lux_chatOn.config.campaignState.PhaseVoteNowDazzlingWhite:
                            $("#HowToEnter").find(".cta-button").hide();
                            $("#mainNav").find("li").find(".winners-prizes").hide();
                            _this.nonClickable($mainNavClick.eq(0));
                            if (_this.isAppleDevice() || $.browser.safari) {
                                $mainNavClick[2].dispatchEvent(evt);
                            } else {
                                $mainNavClick[2].click();
                            }
                            break;
                        case lux_chatOn.config.campaignState.PhaseWinPrizes:
                            $("#HowToEnter").find(".cta-button").hide();
                            $("#mainNav").find("li").find(".winners-prizes").hide();
                            _this.nonClickable($mainNavClick.eq(0));
                            if (_this.isAppleDevice() || $.browser.safari) {
                                $mainNavClick[3].dispatchEvent(evt);
                            } else {
                                $mainNavClick[3].click();
                            }
                            break;
                        case lux_chatOn.config.campaignState.PhaseWinners:
                            $("#HowToEnter").find(".cta-button").hide();
                            $("#mainNav").find("li").find(".win-prizes").hide();
                            _this.nonClickable($mainNavClick.eq(0));
                            if (_this.isAppleDevice() || $.browser.safari) {
                                $mainNavClick[4].dispatchEvent(evt);
                            } else {
                                $mainNavClick[4].click();
                            }
                            break;
                        default:
                            break;
                    }; // end : switch
                }
            }; // end : main nav active method
            /*
            * Main ajax call
            */
            this.ajaxCallMain = function ($getUrl, $cacheVal, thsTabIndex, campState, $mainNavLi, $mainNavDiv, $mainNavClick, $imageId, cs, $this) {
                $.ajax({
                    url: $getUrl,
                    cache: $cacheVal,
                    dataType: 'html',
                    success: function (data, textStatus, jqXHR) {
                        $('#middleContent').html(data);
                        chatOnMainNavHTML[thsTabIndex] = data;
                        countMainAjaxCall = 0;
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        if (countMainAjaxCall <= 2) {
                            _this.ajaxCallMain($getUrl, $cacheVal, thsTabIndex, campState, $mainNavLi, $mainNavDiv, $mainNavClick, $imageId, cs, $this);
                            countMainAjaxCall++;
                        }
                        else {
                            _this.errorPage();
                        }
                    },
                    complete: function () {
                        _this.subNavTab($cacheVal, campState, $imageId, cs);
                        _this.ajaxCompleteMainNav($mainNavLi, $mainNavDiv, $mainNavClick, $imageId, cs, campState, $this);
                    } // end : complete
                }); // end : ajax call
            };
            /*
            * Main Nav Ajax Complete Method
            */
            this.ajaxCompleteMainNav = function ($mainNavLi, $mainNavDiv, $mainNavClick, $imageId, cs, campState, $this) {
                $mainNavLi.removeClass("active");
                $mainNavDiv.removeClass("active");
                $mainNavClick.removeClass("active");
                $this.addClass("active");
                $this.parent().addClass("active");
                $this.parent().parent().addClass("active");
                _this.tabCarousel();
                _this.setHelveticaNeueFont();
                _this.setHelveticaMediumFont();
                _this.setHelveticaLightFont();
                _this.startNowButtonClick();
                _this.needInspirationClick();
                _this.footerLinks();
                if ($("#mainNav").find(".get-inspired-vote-now").hasClass("active")) {
                    var $subNavClick = $("#subNav > ul > li > a"),
                        $subNavClick0 = $("#subNav > ul > li").find(".vintage-classic"),
                        $subNavClick1 = $("#subNav > ul > li").find(".glamorous-goddess"),
                        $subNavClick2 = $("#subNav > ul > li").find(".white-hot");

                    if (styleID == '1' || styleID == '2' || styleID == '3') {
                        switch (styleID) {
                            case '1':
                                $subNavClick0.click();
                                break;
                            case '2':
                                $subNavClick1.click();
                                break;
                            case '3':
                                $subNavClick2.click();
                                break;
                            default:
                                break;
                        }
                        styleID = '';
                        return false;
                    }
                    else {
                        // matching state for sub nav tab
                        switch (campState) {
                            case lux_chatOn.config.campaignState.PhaseHowToEnter:
                            case lux_chatOn.config.campaignState.PhaseGetInspiredVintageClassic:
                                $subNavClick0.click();
                                break;
                            case lux_chatOn.config.campaignState.PhaseGetInspiredDazzlingWhite:
                                if ($(".get-inspired").hasClass("active")) {
                                    $subNavClick2.click();
                                } else {
                                    $subNavClick0.click();
                                    _this.nonClickable($subNavClick1);
                                    _this.nonClickable($subNavClick2);
                                }
                                break;
                            case lux_chatOn.config.campaignState.PhaseGetInspiredDazzlingWhite1:
                                if ($(".get-inspired").hasClass("active")) {
                                    $subNavClick2.click();
                                } else {
                                    $subNavClick1.click();
                                    _this.nonClickable($subNavClick2);
                                }
                                break;
                            case lux_chatOn.config.campaignState.PhaseVoteNowVintageClassic:
                                if ($(".get-inspired").hasClass("active")) {
                                    $subNavClick1.click();
                                } else {
                                    $subNavClick0.click();
                                    _this.nonClickable($subNavClick1);
                                    _this.nonClickable($subNavClick2);
                                }
                                break;
                            case lux_chatOn.config.campaignState.PhaseGetInspiredBewitchinglyGlamourous:
                                $subNavClick1.click();
                                break;
                            case lux_chatOn.config.campaignState.PhaseVoteNowBewitchinglyGlamourous:
                                if ($(".get-inspired").hasClass("active")) {
                                    $subNavClick2.click();
                                } else {
                                    $subNavClick1.click();
                                    _this.nonClickable($subNavClick2);
                                }
                                break;
                            case lux_chatOn.config.campaignState.PhaseVoteNowDazzlingWhite:
                                $subNavClick2.click();
                                break;
                            case lux_chatOn.config.campaignState.PhaseWinners:
                            case lux_chatOn.config.campaignState.PhaseWinPrizes:
                                $subNavClick2.click();
                                break;
                            default:
                                $subNavClick0.click();
                                break;
                        }; // end : switch
                    } // end else
                }
                else {
                    _this.showImageOverlay($imageId, cs);
                } // end : If
                _this.defaultClick();
                $('br').remove(); // remove br from winners grid
                var $openPopup = $("#middleContent a.open-overlay");
                _this.openPopup($openPopup);
                _this.backToTopClick();
                _this.setHelveticaLightFont();
                if (scrollFlag == 'true') {
                    if (_this.isAppleDevice()) {
                        FB.Canvas.scrollTo(0, 530);
                    } else {
                        FB.Canvas.scrollTo(0, 400);
                    }
                }
                scrollFlag = 'true';
                FB.Canvas.setAutoGrow(false);
                FB.Canvas.setSize({ height: 1200 });
                setTimeout(function () {
                    FB.Canvas.setAutoGrow(true);
                }, 100);
            };
            /*
            * Sub Nav in Content Section
            */
            this.subNavTab = function ($cacheVal, campState, $imageId, cs) {
                var $subNavClick = $("#subNav > ul > li > a");
                $subNavClick.on("click touch", function (event) {
                    var thisTabIndex = 'st-' + $(this).attr('id'),
                        tabName = $(this).parents("#subNav").attr('pagetabname'),
                        sName = $(this).attr('sname');

                    if (chatOnHTML[thisTabIndex] == undefined ||
                        (campState == lux_chatOn.config.campaignState.PhaseVoteNowVintageClassic && $(this).attr("id") == lux_chatOn.config.subTabIndex.first) ||
                        (campState == lux_chatOn.config.campaignState.PhaseVoteNowBewitchinglyGlamourous && $(this).attr("id") == lux_chatOn.config.subTabIndex.second) ||
                        (campState == lux_chatOn.config.campaignState.PhaseVoteNowDazzlingWhite && $(this).attr("id") == lux_chatOn.config.subTabIndex.third)) {
                        event.preventDefault();
                        if ($(this).hasClass("active")) {
                            return false;
                        }

                        // unica entry
                        UDM.evq.push(['trackEvent', 'Custom', 'Style Tab Click', tabName + ' - ' + sName]);

                        $subNavClick.removeClass("active");
                        $(this).addClass("active");
                        _this.setHelveticaLightFont();
                        var $getUrl = $(this).attr("href");
                        $('#ajxDataContainer').html(dataLoader);
                        _this.ajaxCallSubTab($getUrl, $cacheVal, thisTabIndex, $imageId, cs);
                    }
                    else {
                        event.preventDefault();
                        if ($(this).hasClass("active")) {
                            return false;
                        }

                        // unica entry 
                        UDM.evq.push(['trackEvent', 'Custom', 'Style Tab Click', tabName + ' - ' + sName]);

                        $subNavClick.removeClass("active");
                        $(this).addClass("active");
                        _this.setHelveticaLightFont();
                        var $getUrl = $(this).attr("href");
                        $('#ajxDataContainer').empty().html(dataLoader);
                        $('#ajxDataContainer').html(chatOnHTML[thisTabIndex]);
                        _this.showImageOverlay($imageId, cs);
                        _this.setHelveticaNeueFont();
                        _this.setHelveticaLightFont();
                        _this.setHelveticaMediumFont();
                        _this.shortListedEvenOdd();
                        if ($("#getInspiredCarousel").length > 0) {
                            _this.imgCarousel(lux_chatOn.config.carousel);
                        };
                        _this.startNowButtonClick();
                        _this.findOutMoreClick();
                        _this.backToTopClick();
                        var $openPopup = $("#ajxDataContainer a.open-overlay");
                        _this.openPopup($openPopup);
                        FB.Canvas.setAutoGrow(false);
                        FB.Canvas.setSize({ height: 1200 });
                        setTimeout(function () {
                            FB.Canvas.setAutoGrow(true);
                        }, 100);
                    }
                    return false;
                });

            };
            /*
            * Sub Tab Ajax Call
            */
            this.ajaxCallSubTab = function ($getUrl, $cacheVal, thisTabIndex, $imageId, cs) {
                $.ajax({
                    url: $getUrl,
                    cache: $cacheVal,
                    success: function (data, textStatus, jqXHR) {
                        $('#ajxDataContainer').html(data);
                        $('.item').unwrap(); $('.item').unwrap();
                        countSubAjxCall = 0;
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        if (countSubAjxCall <= 2) {
                            _this.ajaxCallSubTab($getUrl, $cacheVal, thisTabIndex);
                            countSubAjxCall++;
                        }
                        else {
                            _this.errorPage();
                        }
                    },
                    complete: function () {
                        chatOnHTML[thisTabIndex] = $('#ajxDataContainer').html();
                        _this.showImageOverlay($imageId, cs);
                        _this.setHelveticaNeueFont();
                        _this.setHelveticaLightFont();
                        _this.setHelveticaMediumFont();
                        _this.shortListedEvenOdd();
                        if ($("#getInspiredCarousel").length > 0) {
                            _this.imgCarousel(lux_chatOn.config.carousel);
                        };
                        _this.startNowButtonClick();
                        _this.findOutMoreClick();
                        _this.backToTopClick();
                        var $openPopup = $("#ajxDataContainer a.open-overlay");
                        _this.openPopup($openPopup);
                        FB.Canvas.setAutoGrow(false);
                        FB.Canvas.setSize({ height: 1200 });
                        setTimeout(function () {
                            FB.Canvas.setAutoGrow(true);
                        }, 100);
                    }
                }); // end ajax call
            };
            /*
            * Error on ajax
            */
            this.errorPage = function () {
                var errorHtml = '<div class="error-page"><div class="error-page-content"><h2>Oops...!</h2><h3>An error occured.</h3><p>Please try again after some time.</p></div></div>';
                $('#middleContent').html(errorHtml);
                countMainAjaxCall = 0;
                countSubAjxCall = 0;
            };
            /**
            * Open Popup on thumb click in all pages
            */
            this.openPopup = function ($openPopup) {
                $openPopup.on("click touch", function () {
                    var $overlayImageId = $(this).attr("name"),
                        $callerPage = $("#overlayContent").attr("applicationPage");

                    if (typeof $callerPage != 'undefined') {
                        SetSelectedImageData($overlayImageId, $callerPage, false);
                    }
                    else {
                        SetSelectedImageData($overlayImageId, lux_chatOn.config.applicationPage.VoteNow, false);
                    }
                    _this.showPopup("#overlay", ".overlay-content");
                    return false;
                });
            };
            /**
            * tab carousel method
            */
            this.tabCarousel = function () {
                var $tabCarouselClick = $("#tabCarousel > li > a"),
                    $tabCarouselTitle = $("#tabCarousel > li > h3");
                $tabCarouselClick.on("click focus", function () {
                    $tabCarouselClick.removeClass("selected");
                    $tabCarouselTitle.removeClass("selected");
                    $(this).addClass("selected");
                    $(this).next("h3").addClass("selected");
                    var getID = $(this).attr("href");
                    $(getID).show();
                    $(getID).siblings().hide();
                    $(".tab-carousel").show();
                    _this.setHelveticaLightFont();
                    return false;
                });
                $tabCarouselTitle.on("click focus", function () {
                    $tabCarouselClick.removeClass("selected");
                    $tabCarouselTitle.removeClass("selected");
                    $(this).addClass("selected");
                    $(this).prev("a").addClass("selected");
                    var getID = $(this).prev("a").attr("href");
                    $(getID).show();
                    $(getID).siblings().hide();
                    $(".tab-carousel").show();
                    _this.setHelveticaLightFont();
                    return false;
                });
            };
            /**
            * image carousel method
            */
            this.imgCarousel = function (carousel) {
                var caruselElement = '',
                    liElement = '',
                    liElementG = '',
                    liElementW = '',
                    $largeImageCon = $("#getInspiredCarousel figure"),
                    $largeImage = $("#getInspiredCarousel figure img"),
                    $carouselContainer = $("#getInspiredCarousel .carousel");
                for (var i = 0; i < carousel.vImages.length; i++) {
                    liElement += '<li>' + '<a class="c_hover" href="#" title="thumbnail image"><span><span class="hover"></span></span><img width="53" height="71" src="' + lux_chatOn.config.carousel.imgPath + carousel.vImages[i] + '" /></a>' + '</li>';
                }
                for (var i = 0; i < carousel.gImages.length; i++) {
                    liElementG += '<li>' + '<a class="c_hover" href="#" title="thumbnail image"><span><span class="hover"></span></span><img width="53" height="71" src="' + lux_chatOn.config.carousel.imgPath + carousel.gImages[i] + '" /></a>' + '</li>';
                }
                for (var i = 0; i < carousel.wImages.length; i++) {
                    liElementW += '<li>' + '<a class="c_hover" href="#" title="thumbnail image"><span><span class="hover"></span></span><img width="53" height="71" src="' + lux_chatOn.config.carousel.imgPath + carousel.wImages[i] + '" /></a>' + '</li>';
                }
                if ($("#getInspiredGlamorous").length > 0) {
                    caruselElement = liElementG;
                } else if ($("#getInspiredWhite").length > 0) {
                    caruselElement = liElementW;
                } else {
                    caruselElement = liElement;
                }
                $carouselContainer.html(caruselElement);
                $carouselContainer.find("li:eq(0)").find("a").addClass("selected");
                if ($carouselContainer.find("li").length == carousel.max) {
                    $carouselContainer.find("li:last-child").addClass("last-child");
                }
                var $imgUrl = $carouselContainer.find("li:eq(0)").find("img").attr("src").replace("_thumb", "");
                fbImageUrl = $imgUrl;
                imageIdFb = fbImageUrl.split("/");
                imageIdFb = imageIdFb[3];

                $largeImage.attr("src", $imgUrl);
                var $hoverEvent = $carouselContainer.find(".c_hover");
                $.each($hoverEvent, function (i) {
                    $(this).on("touch", function (event) {
                        event.preventDefault();
                        $hoverEvent.removeClass("selected");
                        $(this).addClass("selected");
                        var $imgUrl = $carouselContainer.find(".selected").find("img").attr("src").replace("_thumb", "");
                        $largeImage.attr("src", $imgUrl);
                    });
                    $(this).on("mouseover", function (event) {
                        $hoverEvent.removeClass("selected");
                        $(this).addClass("selected");
                        var $imgUrl = $carouselContainer.find(".selected").find("img").attr("src").replace("_thumb", "");
                        $largeImage.attr("src", $imgUrl);
                    });
                    $(this).on("click", function (event) {
                        return false;
                    });

                });
            };

            /*
            * Short Listed Thumb margin setting
            */
            this.shortListedEvenOdd = function () {
                var evenColumn = $("#ajxDataContainer .short-list > ul > li:nth-child(even)"),
                    lastColumn = $("#ajxDataContainer .short-list > ul > li:nth-child(4n)");
                evenColumn.addClass('even');
                lastColumn.removeClass('even').addClass('last-child');
            };

            /*
            * Show Image overlay using facebook image ID
            */
            this.showImageOverlay = function (imgID, cs) {                      
                if (imgID != lux_chatOn.config.handledFlag) {                    
                    var $callerPage = $("#hdnfldCallerPage").val();                    
                    if ((typeof $callerPage != 'undefined') && ($callerPage != lux_chatOn.config.handledFlag)) {
                        SetSelectedImageData(imgID, $callerPage, true);
                    }
                    else {
                        SetSelectedImageData(imgID, lux_chatOn.config.applicationPage.VoteNow, true);
                    }
                    setTimeout(function () {
                        _this.showPopup("#overlay", ".overlay-content");
                    }, 600);
                    $("#hdnfldImageId").val(lux_chatOn.config.handledFlag);
                    $("#hdnfldCallerPage").val(lux_chatOn.config.handledFlag);
                }
            };
            /*
            * Show popup on footer links
            */
            this.footerLinks = function () {
                var $footerLinks = $("#termsLink"),
                    $elmP = $("#mainContent"),
                    $overlayBig = $("#overlayBig"),
                    $overlayContent = $(".big-overlay"),
                    $overlayContentInner = $(".big-overlay-content"),
                    $overlayContentInnerText = $(".big-overlay-text");

                $footerLinks.on('click touch', function () {
                    var $getHgt = $elmP.outerHeight(),
                        $textId = $(this).attr("href"),
                        $footerHeight = $("footer").outerHeight(),
                        $commentsHeight = $("#FBLikeAndComment1_facebookcomments").outerHeight(),
                        bottomHeight = $footerHeight + $commentsHeight + 60;
                    $textId = $textId.replace("#", "");
                    $overlayContentInnerText.hide();
                    $getHgt = $getHgt - bottomHeight;
                    $overlayBig.css({ height: $getHgt }).fadeTo(600, 0.9);
                    $overlayContent.css({ height: $getHgt }).fadeTo(600, 1);
                    $overlayContentInner.css({ height: $getHgt });
                    $getHgt = $getHgt - 310;
                    $overlayContentInnerText.css({ height: $getHgt });
                    $("#" + $textId).show();
                    $("#close").focus();
                    _this.setHelveticaLightFont();
                    $("#close").click(function () {
                        $overlayBig.fadeOut();
                        $overlayContent.fadeOut();
                        return false;
                    });
                    return false;
                })

            };
            /*
            * Show popup using in almost all pages
            * Accept one parameter elm
            *      elm : popup element reference
            */
            this.showPopup = function (elm, elmD, callback) {
                if ($.browser.safari) {
                    $("*").css("-webkit-transform", "none !important");
                }
                var $getHgt = $("#middleContent").outerHeight();
                $getHgt -= 70;
                $(elm).css({ height: $getHgt }).fadeTo(600, 0.9, function () {
                    if (callback !== undefined) {
                        callback();
                    }
                    $(".close").focus();
                    FB.Canvas.scrollTo(0, 685);
                });
                $(elmD).fadeTo(600, 1);
                _this.hidePopup(elm, elmD);
                _this.setHelveticaMediumFont();
            };
            /*
            * Hide popup using in almost all pages
            * Accept one parameter elm
            *      elm : popup element reference
            */
            this.hidePopup = function (elm, elmD) {
                $(elmD + " a.close").on("click touch", function () {
                    if ($.browser.safari) {
                        $("*").css("-webkit-transform", "");
                    }

                    $(elm).fadeOut();
                    $(elmD).fadeOut();
                    return false;
                });
            };
            /*
            * Find out more click
            */
            this.findOutMoreClick = function () {
                $("#aboutPhotographer").on("click touch", function (event) {
                    FB.Canvas.getPageInfo(function (info) {
                        var fbTop = info.scrollTop + 800;
                        FB.Canvas.scrollTo(0, fbTop);
                    });
                    return false;
                })
            };

            /*
            * Back to top behavior
            */
            this.backToTopClick = function () {
                $(".back-to-top a").on("click touch", function () {
                    if (_this.isAppleDevice()) {
                        FB.Canvas.scrollTo(0, 530);
                    } else {
                        FB.Canvas.scrollTo(0, 400);
                    }
                    return false;
                });
            };

            /*
            * Start Now Button behavior
            */
            this.startNowButtonClick = function () {
                $(".start-now-button").on("click touch", function (event) {
                    event.preventDefault();
                    $("#mainNav > ul > li > div > a").eq(0).click();
                    FB.Canvas.scrollTo(0, 390);
                    return false;
                });
                $(".start-now-button").hover(
                    function () {
                        $(this).find(".sparkle-left").addClass("show");
                        $(this).find(".sparkle-right").addClass("show");
                    },
                    function () {
                        $(this).find(".sparkle-left").removeClass("show");
                        $(this).find(".sparkle-right").removeClass("show");
                    }
                );
                /* for mobile devices */
                $(".start-now-button").on("touchstart", function () {
                    $(this).find(".sparkle-left").addClass("show");
                    $(this).find(".sparkle-right").addClass("show");
                });
                $(".start-now-button").on("touchend", function () {
                    $(this).find(".sparkle-left").removeClass("show");
                    $(this).find(".sparkle-right").removeClass("show");
                });
            };
            /*
            * Need Inspiration click behavior
            */
            this.needInspirationClick = function () {
                $(".need-inspiration").on("click touch", function () {
                    $("#mainNav > ul > li > div > a").eq(1).click();
                    FB.Canvas.scrollTo(0, 400);
                    return false;
                })
            };
            /*
            * Select Country from List
            */
            this.selectCountry = function () {
                var $countryVal = $('input[id$="hdnCurrentCountry"]').val();
                var children = $('#selectCountryList').children();
                $.each(children, function () {
                    if ($(this).find("a").text() == $countryVal) {
                        $(this).hide();
                    }
                });
                var $aCountry = $('#selectCountryList li a');
                $aCountry.on("touchstart", function () {
                    var clickEvent = document.createEvent("HTMLEvents");
                    clickEvent.initEvent("click", true, true);
                    if (_this.isAppleDevice()) {
                        $(this)[0].dispatchEvent(clickEvent);
                    }
                });

                $("#selectCtry").find("span").text($countryVal);
                $("#selectCtry").on("mouseover touch", function () {
                    $("#selectCountryList").show();
                });
                $("#countryListDiv").on("mouseover touch", function () {
                    $("#selectCountryList").show();
                });
                $("#selectCtry").on("mouseout", function () {
                    $("#selectCountryList").hide();
                });
                $("#countryListDiv").on("mouseout", function () {
                    $("#selectCountryList").hide();
                });
            };

            /*
            * Non Clickable behavior
            */
            this.nonClickable = function (elm) {
                elm.removeAttr("href");
                elm.off("click touch");
                elm.removeClass("active");
                elm.addClass("off");
                elm.parent().addClass("off");
            };

            /*
            * Default Click behavior
            */
            this.defaultClick = function () {
                $(".default-click").on("click touch", function () {
                    return false;
                });
            };

            /*
            * Set Helvetica Font
            * using cufon js plugin
            *
            */
            this.setHelveticaNeueFont = function () {
                Cufon.set('fontFamily', 'Helvetica Neue').replace('.cta-button .text, #selectCtry span, #selectCountryList a', { hover: true });
            };
            this.setHelveticaLightFont = function () {
                Cufon.set('fontFamily', 'Helvetica Neue Light').replace('h1, h2, h3, h4, .style-name a', { hover: true });
            };
            this.setHelveticaMediumFont = function () {
                Cufon.set('fontFamily', 'Helvetica Neue LTStd').replace('#overlayContent h2, .message-box p', { hover: true });
            };

            /*
            * Check if touch scroll plugin is loaded or not.
            * If touchScroll function present then apply touch scroll funcationality on given elements.
            * Multiple callback is not supported.
            */
            this.touchScroll = function () {
                if (_this.isAppleDevice()) {
                    $.getScript(lux_chatOn.config.scripts.touchScroll, function () {
                        $(".viewport").touchScroll();
                    });
                }
            };

            /*
            * Check for ipad, iphone, ipod devices.
            * Return true and false.
            */
            this.isAppleDevice = function () {
                return (
                    (navigator.userAgent.toLowerCase().indexOf("ipad") > -1) ||
                    (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) ||
                    (navigator.userAgent.toLowerCase().indexOf("ipod") > -1) ||
                    (navigator.userAgent.toLowerCase().indexOf("android") > -1)
                );
            };

            /**
            * private method
            */
            var privateMethod = function () {
            };

            /**
            * Init call
            */
            this.init = function () {

                Cufon.now();
                _this.setHelveticaNeueFont();
                _this.setHelveticaLightFont();
                _this.setHelveticaMediumFont();
                _this.touchScroll();
                _this.hidePopup("#overlay", ".overlay-content");
                _this.isAppleDevice();
                _this.mainNavActive();
                _this.defaultClick();
                _this.selectCountry();

                return this; /*this refere to lux_chatOn.subModule*/
            };

            return this.init(); /*initialize the init()*/
        }
        return new _subModule(); /*creating a new object of subModule rather then a funtion*/
    } ());

    /**
    * Check to evaluate whether 'lux_chatOn' exists in the global namespace - if not, assign window.lux_chatOn an object literal
    */
} (window.lux_chatOn = window.lux_chatOn || {}, jQuery));