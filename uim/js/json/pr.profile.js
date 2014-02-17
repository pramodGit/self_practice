
/* global define, document, console */

define([
	'angular'
], function (angular) {
	
	var uimProAppModule = angular.module('uimProApp', []);

	// Repeated List
	uimProAppModule.controller('uimProCtrl', function($scope) {
		$scope.items = [
			{
				href : 'http://www.beatsbydre.com/',
				img : 'Beats.png',
				comp : 'Beatsbydre',
				role : 'Interactive Developer',
				text : {
					one : 'Developed ecommerce portal in DemandWare.',
					two : 'Responsive HTML of PSD.',
					three : 'Developed jQuery & JavaScript', 
					four : 'Compatible with all browsers'
				}
			},
			{
				href : 'http://www.facebook.com/Lux/app_398502690233634',
				img : 'lux-app.png',
				comp : 'Lux Samsung App',
				role : 'Interactive Developer',
				text : {
					one : 'Developed HTML5 Pages for Facebook App.',
					two : 'Compatible for Multiple Devices',
					three : 'Ajax, jQuery & JavaScript', 
					four : 'Compatible with all browsers'
				}
			},
			{
				href : 'http://www.vodafone.co.uk/',
				img : 'vodafone.png',
				comp : 'Vodafone',
				role : 'Interactive Developer',
				text : {
					one : 'Developed Website in HTML5 and CSS3',
					two : 'Support for all browsers',
					three : 'Web Accessibility Compatible', 
					four : 'Used Modernizr and HTML5 boilerplate'
				}
			},
			{
				href : 'http://www.breezepm.com/',
				img : 'breezepm.png',
				comp : 'Breezepm',
				stat : 'Product of Blue Thread',
				role : 'UI Developer',
				text : {
					one : 'HTMLization of Breezepm website and Breezepm',
					two : 'Compatible for all browsers',
					three : 'HTMLization of http://www.blue-thread.com/', 
					four : 'Compatible with all browsers'
				}
			},
			{
				href : 'http://www.thelocallocksmiths.com/',
				img : 'thelocallocksmiths_com.png',
				comp : 'Locksmith',
				role : 'Web Designer',
				text : {
					one : 'Layout design in Photoshop',
					two : 'Conversion of PSD into HTML',
					three : 'Developed jQuery & JavaScript', 
					four : 'Compatible with all browsers'
				}
			},
			{
				href : 'http://www.keys-replacements.com/',
				img : 'keys-replacements_com.png',
				comp : 'Key Replacements',
				role : 'Web Designer',
				text : {
					one : 'Layout design in Photoshop',
					two : 'Conversion of PSD into HTML',
					four : 'Compatible with all browsers',
					three : 'Developed jQuery & JavaScript',
				}
			}
		];
	
		$scope.remove = function(index) {
			$scope.items.splice(index, 1);
		};
		console.log('profile' + $scope.items);
	});
	angular.bootstrap(document.getElementById("uimProApp"),['uimProApp']);
	// Return Module
	return uimProAppModule;

});