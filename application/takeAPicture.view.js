sap.ui.jsview("application.takeAPicture", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf application.takeAPicture
	*/ 
	getControllerName : function() {
		return "application.takeAPicture";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf application.takeAPicture
	*/ 
	createContent : function(oController) {
 		return new sap.m.Page({
 			navButtonType : sap.m.ButtonType.Back,
 			customHeader : new sap.m.Bar({
 				contentLeft:new sap.m.Button({
 					icon:'sap-icon://nav-back',
 					press : oController.onBackButtonPress
 				}),
 				contentRight : new sap.m.Button({
 					icon:'sap-icon://edit',
 					press : oController.onEditIconPress
 				}),
 				contentMiddle:new sap.m.Label({
 					text:'Item details'
 				}).addStyleClass("HeaderText")
 			}),
 			content: [
 			          new sap.m.List({
 			        	  items : [ 
 			        	           new sap.m.CustomListItem({
 			        	        	   content : [
 			        	        	              new sap.ca.ui.AddPicture({
 			        	        	            	  pictureAdded  : oController.pictureAdded,
 			        	        	            	  buttonPageType:"Form",
 			        	        	            	  imageUploadFailed : oController.onUploadFailed,
 			        	        	            	  compression:"high",
 			        	        	            	  fileNotSupported:  oController.onFileNotSupported
 			        	        	              }),
 			        	        	              ]
 			        	           })
 			        	           ]
							})
			]
		});
	}
});