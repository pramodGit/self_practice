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

/*global window, jQuery */

(function (pr, $, undefined) {
	pr.config = {
		language: 'english',
		debug: true,
		nav: {
			first: 'Home',
			sec: 'Blog'
		},
		tweets: {
			'data': 'nofooter transparent',
			'class': 'twitter-timeline',
			'anchor': 'https://twitter.com/_pramod',
			'id': '433103764828852224',
			'limit': '5'
		},
		prBlogUrl: 'http://blog.userinterfacemedia.com/?page=1&json=1',
		prBlogUrlPage2: 'http://blog.userinterfacemedia.com/?page=2&json=1',
		prBlogDataType: 'jsonp',
		prBlogIndex: 3
	};
	
/**
 * Check to evaluate whether 'pr' exists in the global namespace - if not, assign window.pr an object literal.
 */
}(window.pr = window.pr || {}, jQuery));
	