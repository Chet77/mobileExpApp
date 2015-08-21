sap.ui.controller("application.expenseRequestDetail", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf application.expenseRequestDetail
*/
	onInit: function() {
		expReqDetailController = this;
		
		this.getView().addEventDelegate({
			onBeforeShow: function(evt) {
				expReqDetailController.onBeforeShow(evt);
			}
		});	
	},
	
	onBeforeShow : function(evt){
		var oExpReqHeaderModel = new sap.ui.model.json.JSONModel(evt.data);
		sap.ui.getCore().setModel(oExpReqHeaderModel, "expRequestHeader");
		
		sUrl = "ExpenseRequests(expenseRequestId='"+ oExpReqHeaderModel.oData.expenseRequestId +"')?$expand=ExpenseItems";
		citApp.getEAO().read(sUrl, expReqDetailController.fnGetExpItemsCallback);	
	},
	
	fnGetExpItemsCallback : function(oResponse){
		if (oResponse.statusCode == 200) {
			if (oResponse.model !== undefined) {
				oResponse.model.ExpenseItems = oResponse.model.ExpenseItems.results;
				var oExpItemsModel = new sap.ui.model.json.JSONModel(oResponse.model);
				sap.ui.getCore().setModel(oExpItemsModel, "expenseItemsData");
			}
		}else {
			//error
		}
	},
	
	onBackButtonPress : function(){
		citApp.backPage();
	},
	
	onExpenseItemPress : function(evt){
		var oExpenseData = sap.ui.getCore().getModel("expRequestHeader").getData();
		var oExpItem = evt.getSource().getBindingContext("expenseItemsData").getObject();
		oExpItem.customer = oExpenseData.customer;
		
		if (oExpItem.ctc === "") {
			oExpItem.ctc = false;
		} else {
			oExpItem.ctc = true;
		}
		
		oExpItem.project = oExpenseData.project;
		citApp.toPage("application.viewExpenseItem", oExpItem);
	},
	
	onSubmitIconPress : function(evt){
		var submitDialog = new sap.m.Dialog({
			title: "Submit Confirmation",
			type: sap.m.DialogType.Message,
			content: [
				new sap.m.Text({
					text: "By submitting you are agreeing to the terms and conditions",
					wrapping: true
				})
			]			
		});
		submitDialog.setBeginButton(new sap.m.Button({
			text: "Cancel",
			type: sap.m.ButtonType.Reject,
			press : function() {
				submitDialog.close();
			}
		}));
		submitDialog.setEndButton(new sap.m.Button({
			text: "Submit",
			type: sap.m.ButtonType.Accept,
			press : function() {
				expReqDetailController.onSubmitConfirmPress();
				submitDialog.close();
				
			}
		}));
		submitDialog.open();
	},
	
	onSubmitConfirmPress : function(){
		data = sap.ui.getCore().getModel("expRequestHeader").getData();		
		
		//call EAO
		var sURL = "Submit?requestId='"+data.expenseRequestId+"'";
		citApp.getEAO().read(sURL, expReqDetailController.fnSubmitExpReqCallback);
	},
	
	fnSubmitExpReqCallback : function(oResponse){
		if (oResponse.statusCode == 200) {
			if (oResponse.model !== undefined) {
				//hide the button
				var oHeaderData = sap.ui.getCore().getModel("expRequestHeader").getData();
				oHeaderData.status = "SUBMITTED";
				sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel(oHeaderData), "expRequestHeader");
				//show message 
				var msg = "Expense request is successfully submitted.";
				jQuery.sap.require("sap.m.MessageToast");
				sap.m.MessageToast.show(msg, {
					width : "30em"
				});
				
			}
		} else {
			var submitBtn = sap.ui.getCore().byId("btnAction");
			submitBtn.setVisible(true);
			//show message 
			var msg = "Error submitting expense request.";
			jQuery.sap.require("sap.m.MessageToast");
			sap.m.MessageToast.show(msg, {
				width : "30em"
			});
		}
	},
	
	groupExpItemsByDate : function(oContext){
		var date = oContext.getProperty("date");
		var text = "";
		if (date != undefined){
			var dateFormated = DateFormatter.parseDate(date,"");
			text = DateFormatter.format(dateFormated, "dd/mm/yyyy", false);
		}
		return {
			key:text,
			text:text
		};
	},
	
	navToExpenseType : function () {
		var expenseItemsData = sap.ui.getCore().getModel("expenseItemsData").getData();
		var customerProject = expenseItemsData.customer + " " + expenseItemsData.project;
		citApp.toPage("application.expenseTypeList", {customerProject: customerProject});
	},
	
	onDeleteItemPress : function(){  
		var expenseItemsList = sap.ui.getCore().byId("expenseItemsList");
		var oSwipedItem = expenseItemsList.getSwipedItem();
		var expenseID = oSwipedItem.oBindingContexts.expenseItemsData.getObject().expenseItemID;
		
		sURL = "ExpenseItems('"+expenseID+"')";
		citApp.getEAO().remove(sURL, expReqDetailController.fnDeleteItemCallback);
	},
	
	fnDeleteItemCallback : function(oResponse){
		if (oResponse.statusCode == 200) {
			var expenseItemsList = sap.ui.getCore().byId("expenseItemsList");
			var oSwipedItem = expenseItemsList.getSwipedItem();
			var oExpItmModel = sap.ui.getCore().getModel("expenseItemsData").getData();
			oExpItmModel.ExpenseItems.splice(oSwipedItem.getBindingContext("expenseItemsData").getPath(), 1);
			if(oExpItmModel.__metadata !== undefined){
				delete oExpItmModel.__metadata;
			}
			sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel(oExpItmModel), "expenseItemsData");
			var msg = "Expense Item deleted successfully.";
			jQuery.sap.require("sap.m.MessageToast");
			sap.m.MessageToast.show(msg, {
				width : "30em"
			});
			citApp.backPage();
		}else {
			var msg = "Error deleting expense item.";
			jQuery.sap.require("sap.m.MessageToast");
			sap.m.MessageToast.show(msg, {
				width : "30em"
			});
		}
	}
});