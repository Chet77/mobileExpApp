sap.ui.controller("application.expenseTypeList", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf application.expenseTypeList
*/
	onInit: function() {
		expenseTypeListController = this;
		this.getView().addEventDelegate({
			onBeforeShow: function(evt) {
				expenseTypeListController.onBeforeShow(evt);
			}
		});
	},
	
	onBeforeShow:function(evt){
		var oModel = {};
		
		if (evt.data.customerProject != undefined) {
			expenseTypeListController.customerProject = evt.data.customerProject;
			oModel.previousPage = "REQUEST";
		} else if (evt.backData.created) {
			oModel = {
					previousPage : "REQUEST"
			};
			
		} else {
			oModel = {
					previousPage : "BACK"
			};
		}
		
		var jModel = new sap.ui.model.json.JSONModel(oModel);
		sap.ui.getCore().setModel(jModel, "backButton");
	},
	
	navigateBack : function () {
		citApp.backPage();
	},
	
	onTypePress:function(type){
		expItemData = {
			accountCode: "",
			amount: "",
			ctc: false,
			customer: "",
			date: "",
			expenseItemID: "",
			expenseRequestId: "",
			expenseType: type,
			hasReceipt: "",
			isVatable: "",
			net: "",
			noOfMiles: "",
			project: "",
			reason: "",
			travelFrom: "",
			travelTo: "",
			vat: "",
			vatableId: "",
			customerProject : expenseTypeListController.customerProject
		};
		citApp.toPage('application.inputExpenseItem', expItemData);			
	}
});