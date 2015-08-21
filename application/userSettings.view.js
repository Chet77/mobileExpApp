sap.ui.jsview("application.userSettings", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf application.userSettings
	*/ 
	getControllerName : function() {
		return "application.userSettings";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf application.userSettings
	*/ 
	createContent : function(oController) {
 		return new sap.m.Page({
 			navButtonType : sap.m.ButtonType.Back,
 			customHeader : new sap.m.Bar({
 				contentLeft:new sap.m.Button({
 					icon:'sap-icon://nav-back',
 					press : oController.onBackButtonPress
 				}),
 				contentMiddle:new sap.m.Label({
 					text:'Settings'
 				}).addStyleClass("HeaderText")
 			}),
			content: [
			
			]
		});
	}

});