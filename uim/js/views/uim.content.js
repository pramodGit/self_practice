/* global define */

define([
	'angular',
	'angularRoute'
], function (angular) {

	angular.module('uimContentApp', ['ngRoute']);
	var uimContentAppModule = angular.module('uimContentApp', []);

	// Content
	uimContentAppModule.controller('uimAppContentCtrl', ['$scope', function ($scope) {
    
	    $scope.content = {
	    	"heading1": "User Interface",
	    	"heading2": "Web Design",
	    	"heading3": "User Interface Design",
			"text1": "In the industrial design field of human–machine interaction, the user interface is the space where interaction between humans and machines occurs. The goal of interaction between a human and a machine at the user interface is effective operation and control of the machine, and feedback from the machine which aids the operator in making operational decisions. Examples of this broad concept of user interfaces include the interactive aspects of computer operating systems, hand tools, heavy machinery operator controls, and process controls. The design considerations applicable when creating user interfaces are related to or involve such disciplines as ergonomics and psychology.",
			"text2": "A user interface is the system by which people (users) interact with a machine. The user interface includes hardware (physical) and software (logical) components. User interfaces exist for various systems, and provide a means of:",
			"text3": "Generally, the goal of human-machine interaction engineering is to produce a user interface which makes it easy, efficient, and enjoyable to operate a machine in the way which produces the desired result. This generally means that the operator needs to provide minimal input to achieve the desired output, and also that the machine minimizes undesired outputs to the human. Ever since the increased use of personal computers and the relative decline in societal awareness of heavy machinery, the term user interface has taken on overtones of the (graphical) user interface, while industrial control panel and machinery control design discussions more commonly refer to human-machine interfaces.",
			"text4": "Other terms for user interface include 'human–computer interface' (HCI) and 'man–machine interface' (MMI).",
			"text5": "Web design is a broad term used to encompass the way that content (usually hypertext or hypermedia) is delivered to an end-user through the World Wide Web, using a web browser or other web-enabled software is displayed. The intent of web design is to create a website—a collection of online content including documents and applications that reside on a web server/servers. A website may include text, images, sounds and other content, and may be interactive.",
			"text6": "Interface design is involved in a wide range of projects from computer systems, to cars, to commercial planes; all of these projects involve much of the same basic human interactions yet also require some unique skills and knowledge. As a result, designers tend to specialize in certain types of projects and have skills centered around their expertise, whether that be software design, user research, web design, or industrial design.",
			"list1": {
		      	"text1": "Input, allowing the users to manipulate a system, and/or",
		      	"text2": "Output, allowing the system to indicate the effects of the users' manipulation."
		    },
		    "contact": {
		    	"heading": "Contact Me",
		    	"Name": "Name",
		    	"Email": "Email",
		    	"Message": "Message",
		    	"button": "Send"
		    }
	    };
	    
	}]);
	angular.bootstrap(document.getElementById("uimContentApp"),['uimContentApp']);
	// Return Module
	return uimContentAppModule;

});