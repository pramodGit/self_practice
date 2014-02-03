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

/*global jQuery, window, require, angular, bootstrap, less */

require.config({
	//By default load any module IDs from js
	baseUrl: 'js',
	//except, if the module ID starts with "app",
	//load it from the js/app directory. paths
	//config is relative to the baseUrl, and
	//never includes a ".js" extension since
	//the paths config could be for a directory.
	paths: {
		jquery: 'lib/jquery',
		angular: 'lib/angular',
		bootstrap: 'lib/bootstrap.min',
		less: 'lib/less',
		pr: 'pr.config'
	}
});

require(['jquery', 'angular', 'bootstrap', 'less', 'pr' ], function($, angular, bootstrap, less, pr) {
	
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
	
				var XYZ = {
					ABC: function() {
						console.log(pr.config.nav.first);
					},
					DEF: function() {
						console.log(pr.config.nav.sec);
					},
					init: function() {
						XYZ.ABC();
						XYZ.DEF();
					}
						
				};
	
				/**
				 * Init call
				 */
				this.init = function () {
					XYZ.init();
					return this; /*this refere to pr.subModule*/
				};
	
				return this.init(); /*initialize the init()*/
			}
			
			return new _uim(); /*creating a new object of prModule rather then a funtion*/
		}());
	
	/**
	 * Check to evaluate whether 'pr' exists in the global namespace - if not, assign window.pr an object literal
	 */
	}(window.pr = window.pr || {}, jQuery));
});