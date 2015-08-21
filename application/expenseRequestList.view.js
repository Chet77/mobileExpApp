sap.ui.jsview("application.expenseRequestList", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf application.expenseRequestList
	*/ 
	getControllerName : function() {
		return "application.expenseRequestList";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf application.expenseRequestList
	*/ 
	createContent : function(oController) {
 		return new sap.m.Page({
 			customHeader : new sap.m.Bar({
 				contentLeft : new sap.m.Button("btnHome", {
 					icon : "sap-icon://home",
 		 			press : mainController.goHome
 		 		}),
 		 		contentMiddle : new sap.m.Text("title", {
 		 			text : "Requests"
 		 		}).addStyleClass("HeaderText")
 			}),
 			content : [
// 			           new sap.m.SearchField({
// 			        	   width : '100%',
// 			        	   placeholder : 'Search...',
// 			        	   search : oController.onSearchPress
// 			           }),
 			           new sap.m.List({
 			        	   items : {
 			        		   path : "expenseRequests>/results",
 			        		   sorter: new sap.ui.model.Sorter("expenseRequests>status",false,oController.groupExpRequestsByStatus),
 			        		   template : new sap.m.ObjectListItem({
 			        			   title : "{expenseRequests>customer} {expenseRequests>project}",
 			        			   number : "{expenseRequests>totalAmount}",
 			        			   numberUnit : "GBP",
 			        			   type : sap.m.ListType.Active,
 			        			   attributes : [
 			        			                 new sap.m.ObjectAttribute({
 			        			                	 text : {
 			        			                		 parts : [
 			        			                		          {path : "expenseRequests>fromDate"},
 			        			                		          {path : "expenseRequests>toDate"} 							   
 			        			                		          ],
 			        			                		          formatter: Formatter.formatFromAndToDate
 			        			                	 }
 			        			                 }),
 			        			                 new sap.m.ObjectAttribute({
 			        			                	 text : {
 			        			                		 path : "expenseRequests>itemCount",
 			        			                		 formatter : Formatter.getItemCountText
 			        			                	 }
 			        			                 })
 			        			                 ],
 			        			                 press : oController.onExpenseRequestPress
 			        		   }),
 			        	   }
 			           })
 			           ]
 		});
	}
});