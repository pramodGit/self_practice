/* JavaScript Boilerplate configuration file *
 * @author    Pramod Kumar
 */
 /* Why do we need config?
  * All URLs needed by the JavaScript
  * Any strings that are displayed to the user
  * Any HTML that needs to be created from JavaScript
  * Settings (i.e., items per page)
  * Repeated unique values
  * Any value that may change in the future
 */

/*jslint sloppy: true */

/*global FB:false, jQuery, window, document*/

(function (pr, undefined) {
	pr.config = {
		language: 'english',
        debug: true,
		appId: '147838425389597',
		urls : {
			"404" : "404.shtml",
			"500" : "500.shtml",
			homepage : 'index.html'
		},
		services : {
			FBLogin : '/projectname/mvc/services/1.0/validateFBUser',
			FBLogout : '/projectname/mvc/services/1.0/logoutFBUser',
			checkFacebookUser : "/projectname/mvc/services/1.0/checkFacebookUser"
		},
		theme: {
			skin: 'a',
			toolbars: {
				index: 'ui-navigation-toolbar',
				pages: 'ui-custom-toolbar'
			},
			messages: {
				loading : "Loading...",
				ajaxRequestFail : "Server not responding. Please try again or try after sometime.",
				serviceErrorHTML: "<p class='errorText'>Something went wrong</p>"
			},
			defaults : {
				noRecordsTrendingStories : 6,
				noRecordsOtherVideos : 10,
				noRecordsMoreSupporter : 3
			}
		},
		slider: {
			scrollCount: 3,
			auto: 'false'
		},
		dynamicDiv: {
			"class" : "hi",
			style : {
				"background" : "#ccc",
				"border" : "#fff 3px none",
				width : "300px",
				height : "200px",
				padding :"10px" ,
				color : "brown",
				position : "absolute",
				left : "50%",
				right : "20%"
			}
		},
		dynamicTable: {
			set : {
				"class" : "dataTable",
				"id" : "dataTable",
				"cellpadding" : "2",
				"cellspacing" : "2",
				"border" : "2px solid #ddd",
				"width" : "300px",
				style : {
					marginTop : "10px"
				}
			},
			ct : {
				rowCount : "12",
				text: "get this text from JSON"
			}
		},
		tableData: {
			one : {
				year : 2012,
				month : ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
				task : ["Project", "Training", "Business", "Activity", "LLP", "Project", "Project", "Project", "Project", "Business", "Activity", "LLP"],
				sttus : ["Done", "Done", "Done", "Done", "Done", "Done", "Done", "Done", "Done", "Done", "Done", "Done"]
			},
			two : {
				year : 2013,
				month : ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
				task : ["Training", "Business", "Activity", "LLP", "Project", "Project", "Project", "Business", "Activity", "LLP", "Project", "Training"],
				sttus : ["Pending", "Pending", "Pending", "Pending", "Pending", "Pending", "Pending", "Pending", "Pending", "Pending", "Pending", "Pending"]
			}
		},
		carouselImages : ["thumb1.gif", "thumb2.gif", "thumb3.gif", "thumb4.gif", "thumb5.gif", "thumb6.gif", "thumb1.gif", "thumb2.gif", "thumb3.gif", "thumb4.gif", "thumb5.gif", "thumb6.gif"],
		imgWidth: 200,
		imgHeight: 200
	};

/**
 * Check to evaluate whether 'pr' exists in the global namespace - if not, assign window.pr an object literal.
 */
}(window.pr = window.pr || {}, jQuery));