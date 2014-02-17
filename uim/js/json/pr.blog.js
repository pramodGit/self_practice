/* global define, document, console */

define([
	'angular', 
	'jQuery'
], function (angular, $) {
	
	var uimBlogAppModule = angular.module('uimBlogApp', []);
	
	// Display Blog Data
	uimBlogAppModule.controller('uimBlogCtrl', ['$scope', function($scope){
		$.ajax({
			url: 'http://blog.userinterfacemedia.com/?json=1',
			dataType: 'jsonp',
			async: true,
			success: function( response ) {
				console.log('before init' + $scope.blogs);
				$scope.blogs = [];
				console.log('after init' + $scope.blogs);
				angular.forEach(response.posts, function(posts){
                //For each episodes, add it to the results array
                    $scope.blogs.push(posts);
					console.log('pushing' + $scope.blogs);
					return $scope.blogs;
                });
				console.log('after push' + $scope.blogs);
				$scope.remove = function(index) {
					$scope.blogs.splice(index, 1);
				};
			}
		});
	}]);
	angular.bootstrap(document.getElementById("uimBlogApp"),['uimBlogApp']);
	// Return Module
	return uimBlogAppModule;

});