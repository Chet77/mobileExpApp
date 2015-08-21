sap.ui.jsview("application.expenseRequestDetail", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf application.expenseRequestDetail
	*/ 
	getControllerName : function() {
		return "application.expenseRequestDetail";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf application.expenseRequestDetail
	*/ 
	createContent : function(oController) {
 		var expReqDetailPage = new sap.m.Page({
 			title : "Expense Request",
 			showNavButton : true,
 			navButtonPress : oController.onBackButtonPress,
 			footer : new sap.m.Bar({
 				design : sap.m.BarDesign.Header,
 				contentRight : [
 				                new sap.m.Button({
 				                	text : "Add Item",
 				                	press : oController.navToExpenseType,
 				                	type : sap.m.ButtonType.Emphasized,
 				                	icon : "sap-icon://add",
 				                	visible : {
 				        				path : "expRequestHeader>/status",
 				        				formatter : Formatter.statusForSubmitBtn
 				        			},
 				                })
 				                ]
 			}),
 			content : [
 			           new sap.m.ObjectHeader({
 			        	   path: "expenseItemsData",
 			        	   title : {
 			        		   parts : [
 			        		            {path: "expenseItemsData>/customer"},
 			        		            {path: "expenseItemsData>/project"}
 			        		            ],
 			        		            formatter : Formatter.customerProject,
 			        	   },
 			        	   number : "{expenseItemsData>/totalAmount}",
 			        	   numberUnit : " GBP",
 			        	   attributes : [ 					
 			        	                 new sap.m.ObjectAttribute({
 			        	                	 text : {
 			        	                		 parts : [
 			        	                		          {path : "expenseItemsData>/fromDate"},
 			        	                		          {path : "expenseItemsData>/toDate"} 							   
 			        	                		          ],
 			        	                		          formatter: Formatter.formatFromAndToDate
 			        	                	 } 						
 			        	                 })],
 			        	                 statuses : [
 			        	                             new sap.m.ObjectStatus({
 			        	                            	 title: "VAT", 
 			        	                            	 text : "{expenseItemsData>/totalVat}" + " GBP", 
 			        	                            	 state: "None"
 			        	                             }),
 			        	                             new sap.m.ObjectStatus({
 			        	                            	 title: "NET", 
 			        	                            	 text : "{expenseItemsData>/totalNet}" + " GBP", 
 			        	                            	 state: "None"
 			        	                             })
 			        	                             ],		
 			           }),
 			           new sap.m.List("expenseItemsList",{
 			        	   items : {
 			        		   path : "expenseItemsData>/ExpenseItems",
 			        		   sorter: new sap.ui.model.Sorter("expenseItemsData>date",false,oController.groupExpItemsByDate),
 			        		   template : new sap.m.ObjectListItem({
 			        			   icon : {
 			        				   path : "expenseItemsData>expenseType",
 			        				   formatter : Formatter.expneseTypeIcons
 			        			   }, 					
 			        			   title : "{expenseItemsData>expenseType}",
 			        			   number : "{expenseItemsData>amount}",
 			        			   numberUnit : "GBP",
 			        			   type : sap.m.ListType.Navigation, 
 			        			   attributes : [new sap.m.ObjectAttribute({text : "{expenseItemsData>reason}"})],
 			        			   press : oController.onExpenseItemPress
 			        		   }) 					
 			        	   },
 			        	   swipeContent : new sap.m.Button({
 			        		   text : "Delete",
 			        		   type : "Reject",
 			        		   tap : oController.onDeleteItemPress
 			        	   }) 			        	  
 			           })
 			           ]
 		});
 		
 		//Header ToolBar
 		var headerTBar = new sap.m.Toolbar(); 		
 		
 		var btnAction = new sap.m.Button("btnAction", {
 			icon : "sap-icon://action",
 			press : oController.onSubmitIconPress,
 			visible : {
 				path : "expRequestHeader>/status",
 				formatter : Formatter.statusForSubmitBtn
 			}
 		});
 		headerTBar.addContent(btnAction);
 		expReqDetailPage.addHeaderContent(headerTBar);
		
 		return expReqDetailPage;
	}
});