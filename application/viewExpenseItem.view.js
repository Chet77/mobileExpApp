sap.ui.jsview("application.viewExpenseItem", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf application.viewExpenseItem
	*/ 
	getControllerName : function() {
		return "application.viewExpenseItem";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf application.viewExpenseItem
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
 					press : oController.onEditIconPress,
 					visible : {
 						path : "expRequestHeader>/status",
 						formatter : Formatter.statusForSubmitBtn
 					},
 				}),
 				contentMiddle : new sap.m.Label({
 					text:'Item details'
 				}).addStyleClass("HeaderText")
 			}),
 			content: [	
 			          new sap.m.Carousel({
 			        	  pages : [
 			        	           new sap.m.ObjectHeader({
 			        	        	   path :"itemModel",
 			        	        	   icon : {
 			        	        		   path : "itemModel>/expenseType",
 			        	        		   formatter : Formatter.expneseTypeIcons
 			        	        	   }, 
 			        	        	   iconDensityAware :false,
 			        	        	   title :"{itemModel>/customer} - {itemModel>/project}", 
 			        	        	   number :"Gross \u00A3{itemModel>/amount}",
 			        	        	   attributes : [
 			        	        	                 new sap.m.ObjectAttribute({
 			        	        	                	 text : {
 			        	        	                		 path : "itemModel>/date",
 			        	        	                		 formatter : Formatter.formatSingleDate
 			        	        	                	 }
 			        	        	                 }),
 			        	        	                 new sap.m.ObjectAttribute({
 			        	        	                	 text : "{itemModel>/reason}",
 			        	        	                 }),
 			        	        	                 new sap.m.ObjectAttribute({
 			        	        	                	 title : "Charge to customer",
 			        	        	                	 text : {
 			        	        	                		 path :"itemModel>/ctc",
 			        	        	                		 formatter : Formatter.costToCustomer
 			        	        	                	 },
 			        	        	                 }),
 			        	        	                 new sap.m.ObjectAttribute({
 			        	        	                	 text : {
 			        	        	                		 parts : [
 			        	        	                		          {path : "itemModel>/expenseType"},
 			        	        	                		          {path : "itemModel>/noOfMiles"} 							   
 			        	        	                		          ],
 			        	        	                		          formatter: Formatter.getNoOfMiles
 			        	        	                	 }
 			        	        	                 })
 			        	        	                 ],
 			        	        	                 statuses :	[
 			        	        	                           	 new sap.m.ObjectStatus({
 			        	        	                           		 title:"Net",
 			        	        	                           		 text :"{itemModel>/net}",
 			        	        	                           	 }),
 			        	        	                           	 new sap.m.ObjectStatus({
 			        	        	                           		 title:"VAT",
 			        	        	                           		 text :"{itemModel>/vat}",
 			        	        	                           	 })
 			        	        	                           	 ],
 			        	           }),
 			        	           new sap.m.List({
 			        	        	   noDataText:"No Receipts", 
 			        	        	   items : {
 			        	        		   path : 'itemImageModel>/images',
 			        	        		   template : new sap.m.StandardListItem({
 			        	        			   type : sap.m.ListType.Navigation ,
 			        	        			   icon : "{itemImageModel>item}"								        				 
 			        	        		   }),
 			        	        	   }
 			        	           })
 			        	           ]
 			          })
 			          ]
 		});
	}
});