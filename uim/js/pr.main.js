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
		'jQuery': 'lib/jquery',
		'modernizr': 'lib/modernizr',
		'angular': 'lib/angular',
		'bootstrap': 'lib/bootstrap',
		'less': 'lib/less',
		'underscore': 'lib/underscore',
		'twitter': 'pr.tweet',
		'prConfig': 'pr.config',
		'prPro': 'json/pr.profile',
		'prUimNav': 'json/pr.uim.nav',
		'prBlog': 'json/pr.blog',
		'blogTitle': 'views/blogTitle',
		'blogData': 'views/blogData'
	},
	waitSeconds: 1,
	shim: {
		'jQuery': {
			'exports' : 'jQuery'
		},
		'angular': {
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
		}
	}
});

require(['jQuery', 'modernizr', 'angular', 'less', 'bootstrap', 'prConfig', 'prUimNav' ], function() {
	
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
			function _uim() {
				
				var _this = this; /* Store this to avoid scope conflicts */
				
				/**
				 * Load Tweeter Feed
				 */
				this.prTweets = function () {
					if ($("#pr-tweets").length > 0) {
						require(['twitter'], function () {
							// console.log();
						});
					}
				};
				/**
				 * Load Wordpress Feed
				 */
				var prBlog = function () {
					$.ajax({
						type: "POST",
						url: pr.config.prBlogUrl,
						dataType: pr.config.prBlogDataType,
						async: false,
						// work with the response
						success: function( response ) {
							displayBlog(response, pr.config);
						}
					});
				};
				var displayBlog = function (prBlogData, config) {
					//console.log(config.prBlogIndex);
					$(".blog-data li .heading a").html(prBlogData.posts[config.prBlogIndex].title);
					$(".blog-data li .heading a").prop('href', prBlogData.posts[config.prBlogIndex].url);
					$(".blog-data li.content").append(prBlogData.posts[config.prBlogIndex].excerpt);
					/*for (var i = 0, limit = prBlogData.posts.length; i < limit; i++) {
						$(".blog-title li .heading a").html(prBlogData.posts[i].title);
						$(".blog-title li .heading a").prop('href', prBlogData.posts[i].url);

						$(".blog-title li .category").html(prBlogData.posts[i].categories[0].title);
						$(".blog-title li .category").prop(
						'href', 'http://blog.userinterfacemedia.com/category/' + prBlogData.posts[i].categories[0].slug + '/');
						//console.log( "try " + i );
					}*/	
					// Underscore Templating
					var data = prBlogData.posts;
					require(['blogTitle', 'blogData'], function(callBlogTitle, callBlogData){
						callBlogTitle.blogTitle(data);
						callBlogData.blogData(data);
					});
					// Load Tweet after others data to improve performance
					_this.prTweets();
				};
				
				
				/**
				 * Init call
				 */
				this.init = function () {
					prBlog();
					//_this.prTweets();
					return this; /*this refere to pr.uim*/
				};
				return this.init(); /*initialize the init()*/
			}
			return new _uim(); /*creating a new object of uim rather then a funtion*/
		}());
	
	/**
	 * Check to evaluate whether 'pr' exists in the global namespace - if not, assign window.pr an object literal
	 */
	}(window.pr = window.pr || {}, jQuery));
});