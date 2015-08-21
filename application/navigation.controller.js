sap.ui.controller("application.navigation", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf application.carousel
*/
	onInit: function() {
		navigationController = this;
	},
	
	onCreateExpenseItemPress : function(){
		citApp.toPage("application.expenseTypeList", {customerProject: ""});				
	},
	
	onTakeAPicturePress :function(){
		citApp.toPage("application.takeAPicture");
	},
	
	onReviewRequestsPress : function(){
		citApp.toPage("application.expenseRequestList");	
	},
	
	onUserSettingsPress : function(){
		citApp.toPage("application.userSettings");
	}
});