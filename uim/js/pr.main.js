/* JavaScript Boilerplate main scripting file *
 * @author    Pramod Kumar
*/

/*jshint forin:true, noarg:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, devel:true, indent:4, maxerr:50, jquery:true */
/*jslint devel: true, nomen: true, unparam: true, sloppy: true, indent: 4, newcap:true */

/*global jQuery, window, require */

/**
 * Require Implementation
 */
require.config({
	//By default load any module IDs from js
	baseUrl: 'js',
	//except, if the module ID starts with "app",
	//load it from the js/app directory. paths
	//config is relative to the baseUrl, and
	//never includes a ".js" extension since
	//the paths config could be for a directory.
	paths: {
		'jQuery': 'lib/jquery',
		'modernizr': 'lib/modernizr',
		'angular': 'lib/angular',
		'bootstrap': 'lib/bootstrap',
		'less': 'lib/less',
		'twitter': 'pr.tweet',
		'prConfig': 'pr.config',
		'repeatedList': 'json/repeatedList'
	},
	shim: {
		'jQuery': {'exports' : 'jQuery'},
		'angular': {'exports' : 'angular' },
		'bootstrap': {
			'exports' : 'bootstrap',
			'deps': ["jQuery"]
		},
		'twitter': {
			'exports' : 'twitter'
		},
		'prConfig': {
			'exports' : 'prConfig',
			'deps': ["jQuery"]
		}
	}
});

require(['jQuery', 'modernizr', 'angular', 'less', 'bootstrap', 'prConfig', 'repeatedList' ], function() {
	
	/* pr (our namespace name) and undefined are passed here
	 * to ensure 1. namespace can be modified locally and isn't
	 * overwritten outside of our function context
	 * 2. the value of undefined is guaranteed as being truly
	 * undefined. This is to avoid issues with undefined being
	 * mutable pre-ES5.
	*/
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
					
				};
				
				/**
				 * Init call
				 */
				this.init = function () {
					prBlog();
					_this.prTweets();
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