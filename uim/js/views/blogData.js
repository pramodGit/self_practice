/* global define, _ */

define([
	'jQuery',
	'underscore'
], function ($) {
	function blogData (data) {
		var compiled = _.template(
			'<ul class="thumbnails blog-data">' +
				'<li class="span4">' +
					'<div class="thumbnail">&nbsp;</div>' +
				'</li>' +
				'<li class="span8 content">' +
					'<h2 class="heading"><a href="<%= url %>" target="_blank"><%= title %></a></h2>' +
					'<%= excerpt %>' +
				'</li>' +
			'</ul>'
		);

		var i, toAppendString = "";

		for (i = 0; i < data.length; i++) {
			toAppendString += compiled(data[i]);
		}  
		$("#template2").append(toAppendString);
	}

	return {
		blogData : blogData
	};

});