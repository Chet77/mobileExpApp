sap.ui.jsview("application.navigation", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf application.carousel
	*/ 
	getControllerName : function() {
		return "application.navigation";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf application.carousel
	*/ 
	createContent : function(oController) {
		return new sap.m.Page({
 			customHeader : new sap.m.Bar({
 		 		contentMiddle : new sap.m.Text({
 		 			text : "CIT Expenses"
 		 		})
 			}),
 			content : [
 			           new sap.m.VBox({
 			        	   items : [
 			        	            new sap.m.VBox({
 			        	            	items : [
 			        	            	         new sap.ui.core.Icon({
 			        	            	        	 press : oController.onCreateExpenseItemPress,
 			        	            	        	 src : "sap-icon://Flaticon/light33"
 			        	            	         }).addStyleClass("flaticon-navIcon navIconTop"),
 			        	            	         new sap.m.Label({
 			        	            	        	 text: "Add an item"
 			        	            	         }).addStyleClass("navigationText")
 			        	            	         ]
 			        	            }).addStyleClass("navTop"),
 			        	            new sap.m.VBox({
 			        	            	items : [
 			        	            	         new sap.m.HBox({
 			        	            	        	 items : [
 			        	            	        	          new sap.m.VBox({
 			        	            	        	        	  items : [
 			        	            	        	        	           new sap.ui.core.Icon({
 			        	            	        	        	        	   press : oController.onReviewRequestsPress,
 			        	            	        	        	        	   src : "sap-icon://Flaticon/piggy7"
 			        	            	        	        	           }).addStyleClass("flaticon-navIcon"),
 			        	            	        	        	           new sap.m.Label({
 			        	            	        	        	        	   text: "My Requests"
 			        	            	        	        	           }).addStyleClass("navigationText")
 			        	            	        	        	           ]
 			        	            	        	          }).addStyleClass("navIconBottom"),
 			        	            	        	          new sap.m.VBox({
 			        	            	        	        	  items : [
 			        	            	        	        	           new sap.ui.core.Icon({
 			        	            	        	        	        	   press : oController.onUserSettingsPress,
 			        	            	        	        	        	   src : "sap-icon://Flaticon/gear14"
 			        	            	        	        	           }).addStyleClass("flaticon-navIcon"),
 			        	            	        	        	           new sap.m.Label({
 			        	            	        	        	        	   text: "Settings"
 			        	            	        	        	           }).addStyleClass("navigationText")
 			        	            	        	        	           ]
 			        	            	        	          }).addStyleClass("navIconBottom")
 			        	            	        	          ]
 			        	            	         })
 			        	            	         ]
 			 			           }).addStyleClass("navBottom")
 			        	            ]
 			           })
 			           ]
		});
//		
//		return new sap.m.Carousel({
//			pages : [
//			         new sap.m.VBox({
//			        	 items : [
//			        	          new sap.ui.core.Icon({
//			        	        	  press : oController.onCreateExpenseItemPress,
//			        	        	  src : "sap-icon://Flaticon/light33"
//			        	          }).addStyleClass("flaticon-navIcon navIcon"),
//			        	          new sap.m.Label({
//			        	        	  text: "add an item"
//			        	          }).addStyleClass("navigationText")
//			        	          ]
//			         }).addStyleClass("carouselIcons"),
//			         new sap.m.VBox({
//			        	 items : [
//			        	          new sap.ui.core.Icon({
//			        	        	  press : oController.onTakeAPicturePress,
//			        	        	  src : "sap-icon://Flaticon/camera33"
//			        	          }).addStyleClass("flaticon-navIcon navIcon"),
//			        	          new sap.m.Label({
//			        	        	  text: "take a picture"
//			        	          }).addStyleClass("navigationText")
//			        	          ]			        	  
//			         }).addStyleClass("carouselIcons"),
//			         new sap.m.VBox({
//			        	 items : [
//			        	          new sap.ui.core.Icon({
//			        	        	  press : oController.onReviewRequestsPress,
//			        	        	  src : "sap-icon://Flaticon/piggy7"
//			        	          }).addStyleClass("flaticon-navIcon navIcon"),
//			        	          new sap.m.Label({
//			        	        	  text: "my requests"
//			        	          }).addStyleClass("navigationText")
//			        	          ]
//			         }).addStyleClass("carouselIcons"),
//			         new sap.m.VBox({
//			        	 items : [
//			        	          new sap.ui.core.Icon({
//			        	        	  press : oController.onUserSettingsPress,
//			        	        	  src : "sap-icon://Flaticon/gear14"
//			        	          }).addStyleClass("flaticon-navIcon navIcon"),
//			        	          new sap.m.Label({
//			        	        	  text: "my settings"
//			        	          }).addStyleClass("navigationText")
//			        	          ]
//			         }).addStyleClass("carouselIcons"),			        
//			         ]
//		});
	}
});