/* global document, define */

define([
	'angular'
], function (angular) {
	
	var uimNavAppModule = angular.module('uimNavApp', []);
	
	// Navigation
	uimNavAppModule.controller('uimNavCtrl', ['$scope', function($scope){
		$scope.first = 'Home';
		$scope.sec = 'Blog';
		$scope.third = 'Contact';
	}]);
	//angular.bootstrap(document.getElementById("uimNavApp"),['uimNavApp']);
	// Return Module
	return uimNavAppModule;

});