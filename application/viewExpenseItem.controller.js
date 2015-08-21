sap.ui.controller("application.viewExpenseItem", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf application.viewExpenseItem
*/
	onInit: function() {
		viewExpenseItemController = this;
		this.getView().addEventDelegate({
			onBeforeShow: function(evt) {
				viewExpenseItemController.onBeforeShow(evt);
			}
		});
	},
	
	onBeforeShow :function(evt){
		var oItemImageModel = {
				images:[]
		};
		var oModel = new sap.ui.model.json.JSONModel(oItemImageModel);
		sap.ui.getCore().setModel(oModel,"itemImageModel");
		
		var oItemModel = new sap.ui.model.json.JSONModel(evt.data);
		sap.ui.getCore().setModel(oItemModel,"itemModel");
		var oModel = oItemModel.oData;
		if( oModel != null ){
			if(oModel.hasReceipt == "X"){
				var sUrl= "ExpenseReceipts?$filter=expenseItemId eq '"+ oModel.expenseItemID +"'";	 
				citApp.getEAO().read(sUrl,viewExpenseItemController.fnGetImageReceiptsCallBack);
			}
		}
	},

	fnGetImageReceiptsCallBack : function(oResponse){		
		if (oResponse.statusCode == 200) {
			viewExpenseItemController.imageArray = [];
			if (oResponse.model !== undefined) {	
				var oImageRequestsModel = new sap.ui.model.json.JSONModel(oResponse.model.results);
				var oImagesList = oResponse.model.results;
				if(oImagesList.length > 0 ){
					for(var i=0; i< oImagesList.length; i++){
						var receiptNo = oImageRequestsModel.oData[i].receiptNo;
			    	    var sUrl= "ExpenseReceipts('"+receiptNo+"')/$value";
			    	    citApp.getEAO().read(sUrl,viewExpenseItemController.fnGetImageCallBack);
					}
				}
			}
		}else {
			//error
		}
	},
	
	fnGetImageCallBack : function(oResponse){
		if (oResponse.statusCode == 200) {	
			if (oResponse.response.body !== undefined) {
				var img  =  $.parseXML(oResponse.response.body);
				var xml = $(img);
				var imageValue = xml.find("value");
				var decodedImg = atob(imageValue.html());
				//  var imageArray = [];
				var imgitem = {};
				imgitem ["item"] = decodedImg;
				var imageArray = sap.ui.getCore().getModel("itemImageModel").getData().images;
				imageArray.push(imgitem);
				var data = {};
				data.images = imageArray;
				var jModel = new sap.ui.model.json.JSONModel(data);
				sap.ui.getCore().setModel(jModel,"itemImageModel" );
			}
		} else {
			var msg = "Unable to retrieve image(s).";
			jQuery.sap.require("sap.m.MessageToast");
			sap.m.MessageToast.show(msg, {
				width : "30em"
			});
		}
	},
	
	onBackButtonPress : function(){
		citApp.backPage();
	},

	onEditIconPress : function (evt){
		var oData = sap.ui.getCore().getModel('itemModel').getData();		
		citApp.toPage("application.inputExpenseItem",oData);			
	}	
});