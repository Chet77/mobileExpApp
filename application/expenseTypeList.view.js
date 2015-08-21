sap.ui.jsview("application.expenseTypeList", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf application.expenseTypeList
	*/ 
	getControllerName : function() {
		return "application.expenseTypeList";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf application.expenseTypeList
	*/ 
	createContent : function(oController) {
 		return new sap.m.Page({
 			customHeader:new sap.m.Bar({
 				contentLeft:new sap.m.Button({
 					icon: {
 						path : 'backButton>/previousPage',
 						formatter : Formatter.expenseTypeListBackIcon
 					},
 					press:oController.navigateBack
 				}),
 				contentMiddle:new sap.m.Label({text:'Choose an expense type'})
 			}),
 			content: [
 			          new sap.m.List({
 			        	  items : [
 			        	           new sap.m.CustomListItem({
 			        	        	   type:sap.m.ListType.Navigation,
 			        	        	   press : function () {
 			        	        		   oController.onTypePress("TEL");
 			        	        	   },
 			        	        	   content : [
 			        	        	              new sap.ui.core.Icon({
 			        	        	            	 src : "sap-icon://Flaticon/phone16"
 			        	        	              }).addStyleClass("flaticon-typeIcon"),
 			        	        	              new sap.m.Label({
 			        	        	            	  text : "Telephone"
 			        	        	              })
 			        	        	              ],
 			        	           }),
 			        	           new sap.m.CustomListItem({
 			        	        	   type:sap.m.ListType.Navigation,
			        	        	   press : function () {
			        	        		   oController.onTypePress("ENT");
			        	        	   },
			        	        	   content : [
			        	        	              new sap.ui.core.Icon({
			        	        	            	  src : "sap-icon://Flaticon/multiple25"
			        	        	              }).addStyleClass("flaticon-typeIcon"),
			        	        	              new sap.m.Label({
			        	        	            	  text : "Associate Entertaining"
			        	        	              })
			        	        	              ],
			        	           }),
			        	           new sap.m.CustomListItem({
 			        	        	   type:sap.m.ListType.Navigation,
			        	        	   press : function () {
			        	        		   oController.onTypePress("PUB");
			        	        	   },
			        	        	   content : [
			        	        	              new sap.ui.core.Icon({
			        	        	            	  src : "sap-icon://Flaticon/airplane105"
			        	        	              }).addStyleClass("flaticon-typeIcon"),
			        	        	              new sap.m.Label({
			        	        	            	  text : "Rail, Bus & Air Fares"
			        	        	              })
			        	        	              ],
			        	           }),
			        	           new sap.m.CustomListItem({
 			        	        	   type:sap.m.ListType.Navigation,
			        	        	   press : function () {
			        	        		   oController.onTypePress("MIL");
			        	        	   },
			        	        	   content : [
			        	        	              new sap.ui.core.Icon({
			        	        	            	  src : "sap-icon://Flaticon/petrol"
			        	        	              }).addStyleClass("flaticon-typeIcon"),
			        	        	              new sap.m.Label({
			        	        	            	  text : "Mileage"
			        	        	              })
			        	        	              ],
			        	           }),
			        	           new sap.m.CustomListItem({
 			        	        	   type:sap.m.ListType.Navigation,
			        	        	   press : function () {
			        	        		   oController.onTypePress("ACC");
			        	        	   },
			        	        	   content : [
			        	        	              new sap.ui.core.Icon({
			        	        	            	  src : "sap-icon://Flaticon/food7"
			        	        	              }).addStyleClass("flaticon-typeIcon"),
			        	        	              new sap.m.Label({
			        	        	            	  text : "Meals & Accomodation"
			        	        	              })
			        	        	              ],
			        	           }),
			        	           new sap.m.CustomListItem({
 			        	        	   type:sap.m.ListType.Navigation,
			        	        	   press : function () {
			        	        		   oController.onTypePress("COL");
			        	        	   },
			        	        	   content : [
			        	        	              new sap.ui.core.Icon({
			        	        	            	  src : "sap-icon://Flaticon/multiple25"
			        	        	              }).addStyleClass("flaticon-typeIcon"),
			        	        	              new sap.m.Label({
			        	        	            	  text : "Customer Entertainment"
			        	        	              })
			        	        	              ],
			        	           }),
			        	           new sap.m.CustomListItem({
 			        	        	   type:sap.m.ListType.Navigation,
			        	        	   press : function () {
			        	        		   oController.onTypePress("OTH");
			        	        	   },
			        	        	   content : [
			        	        	              new sap.ui.core.Icon({
			        	        	            	  src : "sap-icon://Flaticon/full22"
			        	        	              }).addStyleClass("flaticon-typeIcon"),
			        	        	              new sap.m.Label({
			        	        	            	  text : "Other"
			        	        	              })
			        	        	              ],
			        	           })
 			        	           ]
 			          })
 			          ]
 		});
	}
});