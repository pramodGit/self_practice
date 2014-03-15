/* JavaScript Boilerplate main scripting file *
 * @author    Pramod Kumar
*/

/*jshint forin:true, noarg:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, devel:true, indent:4, maxerr:50, jquery:true */
/*jslint devel: true, nomen: true, unparam: true, sloppy: true, indent: 4, newcap:true */

/*global jQuery, window, require */

/**
 * RequireJS Implementation
 */
require.config({
	baseUrl: 'js',
	paths: {
		'jQuery': '//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min',
		'modernizr': 'http://modernizr.com/downloads/modernizr-latest',
		'angular': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.12/angular.min',
		'angularRoute': 'lib/angular-route',
		'bootstrap': 'lib/bootstrap',
		'less': 'lib/less',
		'underscore': 'lib/underscore',
		'twitter': 'pr.tweet',
		'prConfig': 'pr.config',
		'prPro': 'json/pr.profile',
		'prUimNav': 'views/pr.uim.nav',
		'uimContent': 'modal/uim.content',
		'prBlog': 'json/pr.blog',
		'blogTitle': 'views/blogTitle',
		'blogData': 'views/blogData',
		'uimContact': 'controller/uim.contact'
	},
	waitSeconds: 200,
	shim: {
		'jQuery': {
			'exports' : 'jQuery'
		},
		'angular': {
			'exports' : 'angular'
		},
		'angularRoute' : {
			'exports' : 'angular'
		},
		'bootstrap': {
			'exports' : 'bootstrap',
			'deps': ['jQuery']
		},
		'underscore': {
			'exports' : '._',
			'deps': ['jQuery']
		},
		'blogTitle': {
			'deps': ['jQuery', 'underscore']
		},
		'blogData': {
			'deps': ['jQuery', 'underscore']
		},
		'twitter': {
			'exports' : 'twitter'
		},
		'prConfig': {
			'deps': ['jQuery']
		},
		'prBlog': {
			'exports' : 'angular',
			'deps': ['jQuery']
		},
		'uimContact': {
			'deps': ['jQuery']
		}
	}
});

require(['jQuery', 'modernizr', 'angular', 'angularRoute', 'less', 'bootstrap', 'prConfig', 'prUimNav'], function() {
	
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
		pr.uim = (function () {

			var _this = this; /* Store this to avoid scope conflicts */

			/**
			 * Load Tweeter Feed
			 */
			this.prTweets = function () {
				if ($("#pr-tweets").length > 0) {
					require(['twitter'], function () {
						//console.log('about');
					});
				}
			};

			/**
             * Contact Form Submit
             */
            this.contactFormSubmit = function () {
            	if ($("#contactForm").length > 0) {
					require(['uimContact'], function () {
						//console.log('contact');
					});
				}
            };

			/**
			 * Load Content
			 */
			this.uimContent = function () {
				if ($("#uimContentApp").length > 0) {
					require(['uimContent'], function () {
						//console.log('about');
					});
				}
			};

			/**
			 * Load Wordpress Feed
			 */
			var prBlog = function () {
				_this.displayBlognTweet.ajx(pr.config.prBlogUrl);
				var $pagination = $(".pager"),
					$paginationA = $pagination.find("a");
				if ( $pagination.length > 0 ) {
					$paginationA.on("click", function () {
						$paginationA.removeClass("active");
						$(this).addClass("active");
						if ( $(this).hasClass(".first") ) {
							_this.displayBlognTweet.ajx(pr.config.prBlogUrl);
						}
						else {
							_this.displayBlognTweet.ajx(pr.config.prBlogUrlPage2);
						}
						return false;
					});
				}	
			};
			this.displayBlognTweet = {
				ajx: function ($url) {
					// Retrieve Blog data
					$.ajax({
						type: "GET",
						url: $url,
						dataType: pr.config.prBlogDataType,
						async: false,
						cache: false,
						// work with the response
						success: function( response ) {
							_this.displayBlognTweet.blog(response.posts, pr.config).tweet();
							$("html, body").animate({ scrollTop: 0 }, "slow");
						}
					});
				},
				blog: function (data, config) {
					//console.log(config.prBlogIndex);
					var	prBlogIndex = config.prBlogIndex,
						$elm = $(".blog-data"),
						$anchor = $elm.find(".heading a"),
						$showCase = $(".blog-data");
					//console.log(data);
					// Showcase Data
					$anchor.html(data[prBlogIndex].title).prop({'href':data[prBlogIndex].url});
					$showCase.find(".content").html(data[prBlogIndex].excerpt).find("p a").prop({'target':'_blank'});
					$showCase.find(".thumbnail img").prop({'src':'images/thumbs/' + data[prBlogIndex].tags[0].slug + '.jpg'});

					// Underscore Templating
					require(['blogTitle', 'blogData'], function(callBlogTitle, callBlogData){
						callBlogTitle.blogTitle(data);
						callBlogData.blogData(data);
						_this.anchorTarget();
					});

					return this;
				},
				tweet: function () {
					if ($("#pr-tweets").length > 0) {
						require(['twitter'], function () {
							//console.log('home');
						});
					}
					return this;
				}
			};
			
			/**
			 * Window load
			 */
			this.anchorTarget = function () {
				var doc = document,
					anchor = doc.getElementById("post-feed").getElementsByTagName("a"),
					aLength = anchor.length;
				//console.log('aLength - ' + aLength);
				for(var i = 0; i < aLength; i++) {
					$(anchor[i]).prop({'target':'_blank'});
				}
			};
			
			/**
			 * Init call
			 */
			this.init = function () {

				if ($("#home").length > 0) {
					//console.log('if');
					prBlog();
				} else {
					//console.log('else');
					_this.uimContent();
					_this.prTweets();
				}
				_this.contactFormSubmit();
				return this; /* this refere to pr.uim */
			};
			return this.init(); /*initialize the init()*/
		}());
	
	/**
	 * Check to evaluate whether 'pr' exists in the global namespace - if not, assign window.pr an object literal
	 */
	}(window.pr = window.pr || {}, jQuery));
});