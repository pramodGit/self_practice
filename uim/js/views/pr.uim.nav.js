/* global define */

define([
	'angular',
	'angularRoute'
], function (angular) {

	angular.module('uimNavApp', ['ngRoute']);
	var uimNavAppModule = angular.module('uimNavApp', []);
	
	// Navigation
	uimNavAppModule.controller('uimNavCtrl', ['$scope', function($scope){
		$scope.nav = ['Home', 'About', 'Blog', 'Contact'];
		//$scope.first = 'Home';
		//$scope.sec = 'Blog';
		//$scope.third = 'Contact';
	}]);
	//angular.bootstrap(document.getElementById("uimNavApp"),['uimNavApp']);
	// Return Module
	return uimNavAppModule;

});