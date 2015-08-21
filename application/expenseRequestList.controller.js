sap.ui.controller("application.expenseRequestList", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf application.expenseRequestList
*/
	onInit: function() {		
		expReqListController = this;		
		this.getView().addEventDelegate({
			onBeforeShow: function(evt) {
				expReqListController.onBeforeShow(evt);
			}
		});
	},
	
	onBeforeShow : function(evt){
		sUrl = "ExpenseRequests";
		citApp.getEAO().read(sUrl, expReqListController.fnGetExpReqListCallback);
	},

	fnGetExpReqListCallback : function(oResponse){		
		if (oResponse.statusCode == 200) {
			if (oResponse.model !== undefined) {	
				var oExpRequestsModel = new sap.ui.model.json.JSONModel(oResponse.model);
				sap.ui.getCore().setModel(oExpRequestsModel, "expenseRequests");
			}
		}
	},
	
	onSearchPress : function() {
		
	},
	
	onExpenseRequestPress : function(evt){
		var oData = evt.getSource().getBindingContext("expenseRequests").getObject();
		citApp.toPage("application.expenseRequestDetail", oData);
	},
	
	groupExpRequestsByStatus : function (oContext) {
		var status = oContext.getProperty("status");
		var text = "";
		if (status !== undefined && status === "SUBMITTED") {
			text = "Submitted";
		} else {
			text = "Saved";
		}
		return {
			key:text,
			text:text
		};
	}
});