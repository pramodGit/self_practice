/* There are a couple of languages that can run in the browsers besides JS, such as Java, Flash and others. However, 
 * these ones require extra plugins and are not universally accepted as JavaScript.
*/

/* Therefore, web apps nowadays require heavy use of JavaScript to generate content on the fly and quickly. 
 * The user can't wait between request. A lot of the logic/code that used to be in the server side is being moved to the client side. 
 * JS allows the web sites to render only the parts of the website that changed and not the full-page on every request. 
 * Examples of this kind of web apps are Gmail, Pandora, Pinterest, Nokia Maps 3D and others.
*/

/* The lacks of structure it's hard to maintain. This is where Backbone comes into play. 
 * It provides structure to organize the code and increase maintainability. 
 * Backbone is not the only one; in fact, there are many JS frameworks that accomplish similar results like Ember.js, Angular.js and so on. 
 * However, I choose Backbone because is one of the most widely spread framework in its category.
*/

/* Backbone.js has hard dependency on underscore.js and a soft dependency on jQuery. */

/*jshint forin:true, noarg:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, devel:true, indent:4, maxerr:50, jquery:true */

/*jslint devel: true, nomen: true, unparam: true, sloppy: true, indent: 4, newcap:true */

/*global jQuery, window, Backbone */

(function (pr, $, undefined) {
	
	/**
     * Logging function, for debugging mode
     */
	$.log = function (message) {
        if (pr.config.debug && (typeof window.console !== 'undefined' && typeof window.console.log !== 'undefined') && console.debug) {
            console.debug(message);
        } else {
            alert(message);
        }
    };
	
	pr = {
		models: {},
		cllections: {},
		views: {},
		routers: {}
	};
	pr.models = Backbone.Model.extend ({
		initialize: function(){
			console.log("Welcome to the Backbone Model");
		}
	});
	pr.cllections = Backbone.Collection.extend ({
		initialize: function(){
			console.log("Welcome to the Backbone Collection");
		}
	});
	pr.views = Backbone.View.extend ({
		initialize: function(){
			console.log("Welcome to the Backbone View");
		}
	});
	pr.routers = Backbone.Router.extend ({
		initialize: function(){
			console.log("Welcome to the Backbone Router");
		}
	});
	
	new pr.models();
	new pr.cllections();
	new pr.views();
	new pr.routers();

}( window.pr = window.pr || {}, jQuery ));