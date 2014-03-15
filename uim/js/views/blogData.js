/* global define, _ */

define([
	'jQuery',
	'underscore'
], function ($) {
	function blogData (data) {
		var compiled = _.template(
			'<ul class="thumbnails blog-data">' +
				'<li class="span4">' +
					'<div class="thumbnail"><img alt="" src="images/thumbs/<%= tags[0].slug %>.jpg" width="100%" height="100%" /></div>' +
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
		$("#data-template").html(toAppendString);
	}

	return {
		blogData : blogData
	};

});