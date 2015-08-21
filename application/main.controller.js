sap.ui.controller("application.main", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf js.application.main
*/
	onInit: function() {
		mainController = this;
		mainController.getView().setDisplayBlock(true);
		//this model is used to track the position in the app 
		var breadcrumb = {};
		var oModel = new sap.ui.model.json.JSONModel(breadcrumb);
		sap.ui.getCore().setModel(oModel,"breadcrumb");
		
		var bInitializedEAO = citApp.initialiseEAO("http://q12gw20.eai-ltd.co.uk:8012/sap/opu/odata/CITEXP/EMP_EXPENSE_SRV/", false, null, null);
		if(!bInitializedEAO){
			return;
		}
		
		var arrURIRead = [];
		arrURIRead.push("ApplicationConfigs");
		arrURIRead.push("CustomerProjects");
		
		citApp.getEAO().batchRead(arrURIRead, mainController.onApplicationInitCallback);
		
		sap.ui.core.IconPool.addIcon("airplane105", "Flaticon", "Flaticon", "e000");
		sap.ui.core.IconPool.addIcon("arrow66", "Flaticon", "Flaticon", "e001");
		sap.ui.core.IconPool.addIcon("back28", "Flaticon", "Flaticon", "e002");
		sap.ui.core.IconPool.addIcon("camera33", "Flaticon", "Flaticon", "e003");
		sap.ui.core.IconPool.addIcon("diskette4", "Flaticon", "Flaticon", "e004");
		sap.ui.core.IconPool.addIcon("dwelling1", "Flaticon", "Flaticon", "e005");
		sap.ui.core.IconPool.addIcon("food7", "Flaticon", "Flaticon", "e006");
		sap.ui.core.IconPool.addIcon("full22", "Flaticon", "Flaticon", "e007");
		sap.ui.core.IconPool.addIcon("gear14", "Flaticon", "Flaticon", "e008");
		sap.ui.core.IconPool.addIcon("light33", "Flaticon", "Flaticon", "e009");
		sap.ui.core.IconPool.addIcon("multiple25", "Flaticon", "Flaticon", "e00a");
		sap.ui.core.IconPool.addIcon("party1", "Flaticon", "Flaticon", "e00b");
		sap.ui.core.IconPool.addIcon("petrol", "Flaticon", "Flaticon", "e00c");
		sap.ui.core.IconPool.addIcon("phone16", "Flaticon", "Flaticon", "e00d");
		sap.ui.core.IconPool.addIcon("piggy7", "Flaticon", "Flaticon", "e00e");
	},

	onApplicationInitCallback : function(oResponse){
		var application = {};
		if (oResponse.statusCode == 200) {
			if (oResponse.model !== undefined) {	
				application.properties = oResponse.model.__batchResponses[0].data.results[0];
				application.expenseTypes =[];
				application.projects=oResponse.model.__batchResponses[1].data.results;
				for (var i = 0; i<application.projects.length; i++) {
					var row = application.projects[i];
					row.customerProject = row.customer + " " + row.project;
					application.projects[i] = row;
				}
				sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel(application),"applicationModel");
			}
		} else {
			throw {message : "Error, could not retrieve the data required to drive the application."};
		}
	},
	goHome:function(){
		citApp.toPage("application.navigation", null);
	}

});