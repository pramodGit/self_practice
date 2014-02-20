/* global define, _ */

define([
	'jQuery',
	'underscore'
], function ($) {
	function blogTitle (data) {
		var compiled = _.template(
			'<ul class="thumbnails blog-title">' +
				'<li class="span4">' +
					'<div class="thumbnail">&nbsp;</div>' +
				'</li>' +
				'<li class="span8 content">' +
					'<h2 class="heading"><a href="<%= url %>" target="_blank"><%= title %></a></h2>' +
					'<em>in</em> <a href="http://blog.userinterfacemedia.com/category/<%= categories[0].slug %>" target="_blank" class="category"><%= categories[0].title %></a>' +
				'</li>' +
			'</ul>'
		);

		var i, toAppendString = "";

		for (i = 0; i < data.length; i++) {
			toAppendString += compiled(data[i]);
		}  
		$("#template1").append(toAppendString);
	}

	return {
		blogTitle : blogTitle
	};

});