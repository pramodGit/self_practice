/* JavaScript Boilerplate configuration file *
 * @author    Pramod Kumar
 */
 /* Why do we need config?
  * All URLs needed by the JavaScript
  * Any strings that are displayed to the user
  * Any HTML that needs to be created from JavaScript
  * Settings (i.e., items per page)
  * Repeated unique values
  * Any value that may change in the future
 */

/*jslint sloppy: true */

/*global FB:false, jQuery, window, document*/

(function (pr, undefined) {
	pr.config = {
		language: 'english',
        debug: true,
		slider: {
			scrollCount: 3,
			auto: 'false'
		},
		carouselImages : ["thumb1.gif", "thumb2.gif", "thumb3.gif", "thumb4.gif", "thumb5.gif", "thumb6.gif", "thumb1.gif", "thumb2.gif", "thumb3.gif", "thumb4.gif", "thumb5.gif", "thumb6.gif"],
		imgWidth: 100,
		imgHeight: 120,
		liWidth: 304
	};

/**
 * Check to evaluate whether 'pr' exists in the global namespace - if not, assign window.pr an object literal.
 */
}(window.pr = window.pr || {}, jQuery));