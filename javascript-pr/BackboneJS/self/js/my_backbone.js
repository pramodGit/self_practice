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

/*global jQuery, window, Backbone, _ */

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
	/*Setting attributes*/
	pr.models = Backbone.Model.extend ({
		initialize: function(){
			console.log("...Welcome to the Backbone Model...");
			this.bind("change:name", function () {
				var name = this.get("name");
				console.log("Changed my name to " + name );
			});
		},
		defaults: {
			name: 'Pr',
			age: 0,
			children: []
		},
		replaceNameAttr: function (name) {
			this.set({ name: name });
		}
	});
	pr.cllections = Backbone.Collection.extend ({
		initialize: function(){
			console.log("...Welcome to the Backbone Collection...");
		}
	});
	pr.views = Backbone.View.extend ({
		initialize: function(){
			console.log("...Welcome to the Backbone View...");
		}
	});
	pr.routers = Backbone.Router.extend ({
		initialize: function(){
			console.log("...Welcome to the Backbone Router...");
		}
	});
	
	/* Modal Getter and Setter */
	var person = new pr.models();
	person.set({ name: "Pramod", age: 25});
	
	var age = person.get('age');
	var name = person.get('name');
	console.log("age: " + age + "\n" + "name: " + name );
	
	person.replaceNameAttr('Kumar'); // This triggers a change and will log()
	
	/* View Advance */
	pr.SearchView = Backbone.View.extend({
		el: 'body',
		initialize: function(){
			this.render();
		},
		render: function(){
			// Compile the template using underscore
			var template1 = _.template( $("#search_container").html(), {} );
			console.log( 'template1 - ' + template1 );
			var template = _.template( $("#search_template").html(), {} );
			console.log( 'template - ' + template );
			// Load the compiled HTML into the Backbone "el"
			//$(this.el).html( '------- ** Template Rendering ** ----------' + '<br />' + template1 + ' Output ' );
			$(this.el).html( '------- ** Template Rendering ** ----------' + '<br />' + template );
		},
		events: {
			"click input[type=button]": "doSearch"  
		},
		doSearch: function( e ){
			e.preventDefault();
			console.log($("#search_input").val());
			// Button clicked, you can access the element that was clicked with event.currentTarget
			alert( "Search for " + $("#search_input").val() );
		}
	});
		
	//var search_view = new pr.SearchView({el: 'body'});
	var search_view = new pr.SearchView();
	console.log( 'search_view --' + search_view );
	console.log( 'search_view HTML --' + search_view.el.innerHTML );
	console.log( search_view.cid );
	/*The "el" property references the DOM object created in the browser. 
	Every Backbone.js view has an "el" property, and if it not defined, 
	Backbone.js will construct its own, which is an empty div element.*/
	
	/* Collection Advance */
	pr.Client = Backbone.Model.extend({
		defaults: {
			Name: 'default',
			City: 'default'
		},
		initialize: function () {
			console.log( "Collection of the clients" );
		}
	});
	
	pr.Clients = Backbone.Collection.extend({
		model: pr.Client,
		url: 'Clients'
	});
	var prCollection1 = new pr.Client({Name : 'Pramod1', City : 'NCR1'});
	var prCollection2 = new pr.Client({Name : 'Pramod2', City : 'NCR2'});
	var prCollection3 = new pr.Client({Name : 'Pramod3', City : 'NCR3'});
	
	var prCollections = new pr.Clients ([ prCollection1, prCollection2, prCollection3 ]);
	console.log( ' -- ' + JSON.stringify(prCollections.toJSON()));
	console.log( prCollections.models[0].cid );
	console.log( prCollections.models[0].attributes ); // [prCollection1]
	console.log( prCollections.models[1].attributes ); // [prCollection2]
	console.log( prCollections.models[2].attributes ); // [prCollection3]


	new pr.cllections();
	new pr.views();
	new pr.routers();

}( window.pr = window.pr || {}, jQuery ));