sap.ui.controller("application.inputExpenseItem", {

	onInit: function() {
		inputExpenseItemController = this;
		this.getView().addEventDelegate({
			onBeforeShow: function(evt) {
				inputExpenseItemController.onBeforeShow(evt);
			}
		});
	},
	
	onBeforeShow:function(evt){
		var imageArray = [];
		sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel(imageArray),"imageModel");
		 
		var oItemImageModel = {
				images:[]
		};
		sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel(oItemImageModel),"itemImageModel");
		
		//set the variable hBox
		inputExpenseItemController.setVariableSection(evt.data.expenseType);
		
		//set ValueState
		inputExpenseItemController.resetValueStates();
		if(evt.data.customerProject === undefined || evt.data.customerProject === ""){
			if (evt.data.customer == undefined || evt.data.customer == "") {
				evt.data.customerProject = "";
			} else {
				evt.data.customerProject = evt.data.customer +" "+ evt.data.project;
			}
		}
		
		//Setting the counter on load via Edit Item Route
		if(evt.data.expenseItemID !== ""){
			var countLabel = sap.ui.getCore().byId('charCount');
			count = evt.data.reason.length;
			var text = 100 - count;
			countLabel.setText(text);		
			if(text > 0){
				countLabel.addStyleClass('charOK');
				countLabel.removeStyleClass('charFail');
			}
		}
		
		//create a model for the form
		var oExpItemModel = new sap.ui.model.json.JSONModel(evt.data);
		this.getView().setModel(oExpItemModel, "expenseItemModel");
		
		// check if we have any images attached to the expense id
		if (oExpItemModel.getData() !== undefined){
			if(oExpItemModel.getData().hasReceipt =="X"){
				 var sUrl= "ExpenseReceipts?$filter=expenseItemId eq '"+ oExpItemModel.getData().expenseItemID +"'";	 
				 citApp.getEAO().read(sUrl,inputExpenseItemController.fnGetImageReceiptsCallBack);
			}	
		}
	},
	
	fnGetImageReceiptsCallBack : function(oResponse){		
		if (oResponse.statusCode == 200) {
			inputExpenseItemController.imageArray = [];
			
			if (oResponse.model !== undefined) {
				
				var oImageRequestsModel = new sap.ui.model.json.JSONModel(oResponse.model.results);
				var oImagesList = oResponse.model.results;
				
				if(oImagesList.length > 0 ){
					for(var i=0; i< oImagesList.length; i++){
						var receiptNo = oImageRequestsModel.oData[i].receiptNo;
					
						// need to get the expense item ID 
						// get Receipts Number to get image for request
			    	    var sUrl= "ExpenseReceipts('"+receiptNo+"')/$value";	  
			    	    citApp.getEAO().read(sUrl,inputExpenseItemController.fnGetImageCallBack);
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
				var imgitem = {};
				imgitem ["item"] = decodedImg;
				var imageArray = sap.ui.getCore().getModel("itemImageModel").getData().images;
				imageArray.push(imgitem);
				
				var data = {};
				data.images = imageArray;
				
				var jModel = new sap.ui.model.json.JSONModel(data);
				sap.ui.getCore().setModel(jModel,"itemImageModel" );
			}
		}else {
			var msg = "Unable retrievei mage .";
			jQuery.sap.require("sap.m.MessageToast");
			sap.m.MessageToast.show(msg, {
				width : "30em"
			});
		}
	},
	
	setVariableSection:function(type){
		if(type!=='MILEAGE'){
			//set the gross input to editable
			sap.ui.getCore().byId('grossCostIn').setEnabled(true);
		}else{
			//set the gross input to editable
			sap.ui.getCore().byId('grossCostIn').setEnabled(false);
		}
	},
	
	mathCost:function(){
		//MK commented out below line
		var gross = parseFloat(this.getValue()).toFixed(2);
		
		var vatPerc = parseFloat(sap.ui.getCore().getModel('applicationModel').getData().properties.vat).toFixed(2);
		
		if(this.getValue().length == 0){
			gross = 0;
		}
		
		if(!isNaN(gross)){
			var VAT = (vatPerc/100)* gross; 
			VAT = parseFloat(VAT).toFixed(2);
			var NET = gross-VAT;
			NET = parseFloat(NET).toFixed(2);
			//Set the calculated values to the expenseItemModel
			var expItemData = inputExpenseItemController.getView().getModel("expenseItemModel").getData();
			expItemData.vat = VAT;
			expItemData.net = NET;
			
			//MK commented out line and added line below that
//			expItemData.amount = gross;
			expItemData.amount = parseFloat(this.getValue());
			
			inputExpenseItemController.getView().setModel(new sap.ui.model.json.JSONModel(expItemData),"expenseItemModel");			
		}	
	},
	
	mathMiles:function(){
		var miles = parseInt(this.getValue());
		var rate = parseFloat(sap.ui.getCore().getModel('applicationModel').getData().properties.costpermile).toFixed(2);
		var vatPerc = parseFloat(sap.ui.getCore().getModel('applicationModel').getData().properties.vat).toFixed(2);
		
		var gross = (rate * miles);
		console.log(gross);
		gross = parseFloat(gross).toFixed(2);
		if(!isNaN(gross)){			
			var VAT = (vatPerc/100)* gross; 
			VAT = parseFloat(VAT).toFixed(2);
			var NET = gross-VAT;
			NET = parseFloat(NET).toFixed(2);
			//Set the calculated values to the expenseItemModel
			expItemData = inputExpenseItemController.getView().getModel("expenseItemModel").getData();
			expItemData.amount = parseFloat(parseFloat(gross).toFixed(2));
			expItemData.vat = VAT;
			expItemData.net = NET;
			expItemData.noOfMiles = miles;					
			inputExpenseItemController.getView().setModel(new sap.ui.model.json.JSONModel(expItemData),"expenseItemModel");			
		}	
	},
	
	charCount:function(){
		var count = this.getValue().length;
		var countLabel = sap.ui.getCore().byId('charCount');
		var maxCount = 100;
		var text = maxCount - count;
		countLabel.setText(text);		
		if(text > 0){
			countLabel.addStyleClass('charOK');
			countLabel.removeStyleClass('charFail');			
			//unable to save this item			
		}else{
			//sap.ui.getCore().byId('saveIcon').setEnabled(false);
			countLabel.addStyleClass('charFail');
			countLabel.removeStyleClass('charOK');
		}		
	},
	
	saveItem:function(evt){
		var dataModel = inputExpenseItemController.getView().getModel("expenseItemModel").getData();
		//Validate the Form
		if(inputExpenseItemController.validateData(dataModel.expenseType)){
			//Setting Date into "yyyyMMDD" format
			var str = dataModel.date;
			if(str.search("/")>0){
				dataModel.date = str.substring(6, 10)+str.substring(3, 5)+str.substring(0, 2);
			}

			//Customer/Project value		
			var value = dataModel.customerProject;
			var pos = value.search(" ");
			dataModel.customer = value.substring(0, pos);
			dataModel.project = value.substring(pos+1, value.length);
			
			//MK added new line
			dataModel.amount = dataModel.amount.toFixed(2);
			
			//remove the customerProject attribute
			delete dataModel.customerProject;
			
			dataModel = inputExpenseItemController.setPostExpItemData(dataModel);
			//non-specific values 
			dataModel.vatableId = "3001";
			dataModel.isVatable = "X";
			dataModel.accountCode = 1001;
			
			if (dataModel.ctc) {
				dataModel.ctc = "X";
			} else {
				dataModel.ctc = "";
			}
			
			if(dataModel.__metadata !== undefined){
				delete dataModel.__metadata;
			}
			var sUrl = "ExpenseItems";
			citApp.getEAO().create(sUrl, dataModel, inputExpenseItemController.fnSaveItemCallback);
		}else{
			var msg = "All highlighted fields are mandatory. Please complete the form.";
			jQuery.sap.require("sap.m.MessageToast");
			sap.m.MessageToast.show(msg, {
				width : "30em"
			});
		}
	},
	
	fnSaveItemCallback : function(oResponse){
		if (oResponse.statusCode == 200) {
			if (oResponse.model !== undefined) {
				if(oResponse.model.hasReceipt == "X"){
					var sUrl = "ExpenseReceipts";	
					var sExpenseID = oResponse.model.expenseItemID;
					var imageModel = sap.ui.getCore().getModel("imageModel");
					var oItemImages = imageModel.getData();
					for(var i=0; i< oItemImages.length; i++){
						// get hold of header and append slug value
			            citApp.getEAO().oServiceModel.setHeaders({"slug" : sExpenseID });
						//call EAO
				    	citApp.getEAO().create(sUrl, oItemImages[i], inputExpenseItemController.fnSaveImageCallback);

					}
				}
				
				var msg = "The expense item was saved.";
				jQuery.sap.require("sap.m.MessageToast");
				sap.m.MessageToast.show(msg, {
					width : "30em"
				});
				citApp.backPage({createdItem : true});
			}
		}else {
			//error
			var msg = "The expense item could not be saved at this point.";
			jQuery.sap.require("sap.m.MessageToast");
			sap.m.MessageToast.show(msg, {
				width : "30em"
			});
		}
	},

	setPostExpItemData : function(dataObj){		
		//Function to set the value(s) of the dataObject before the POST to GW
		dataObj.vatableId = "3001";
		dataObj.isVatable = "X";
		dataObj.accountCode = 1001;
		
		//convert string values to numeric
		if (dataObj.vat !== "") {
			dataObj.vat = parseFloat(dataObj.vat);
		} else {
			dataObj.vat = 0;
		}
		
		if (dataObj.net !== "") {
			dataObj.net = parseFloat(dataObj.net);
		} else {
			dataObj.net = 0;
		}
		
		if (dataObj.amount !== "") {
			dataObj.amount = parseFloat(dataObj.amount);
		} else {
			dataObj.amount = 0;
		}
		
		if (dataObj.noOfMiles !== "") {
			dataObj.noOfMiles = parseFloat(dataObj.noOfMiles);
		} else {
			dataObj.noOfMiles = 0;
		}
		
		return dataObj;
	},
	
	validateData : function(type){
		var inputs = [
		              sap.ui.getCore().byId("customerProject"),
		              sap.ui.getCore().byId("dateField"),
		              sap.ui.getCore().byId("description") 
		              ];

		if(type === "MILEAGE"){
			inputs.push(sap.ui.getCore().byId("milesIn"));
		}else{
			inputs.push(sap.ui.getCore().byId("grossCostIn"));
		}

		for(var i=0; i<inputs.length; i++){
			if (inputs[i].getValue() === "" || inputs[i].getValue() === undefined || inputs[i].getValue() == 0) {
				inputs[i].setValueState("Error");
			}else {
				inputs[i].setValueState("None");
			}
		}

		// check states of inputs
		var canContinue = true;
		for(var i=0; i<inputs.length; i++){
			if ("Error" === inputs[i].getValueState()) {
				canContinue = false;
			}
		}

		return canContinue;
	},
	
	resetValueStates : function(){
		sap.ui.getCore().byId("customerProject").setValueState("None");
		sap.ui.getCore().byId("dateField").setValueState("None");
		sap.ui.getCore().byId("description").setValueState("None"); 

		sap.ui.getCore().byId("milesIn").setValueState("None");
		sap.ui.getCore().byId("grossCostIn").setValueState("None");

		sap.ui.getCore().byId('charCount').setText(0);
	},
	
	backPage:function(){
		citApp.backPage();
	},
	
	pictureAdded  : function(oEvent) {
		// check if the model has a Receipt attached
		var oExpensModel = inputExpenseItemController.getView().getModel("expenseItemModel").getData();
		
		if (oExpensModel.hasReceipt == ""){
			// no Receipt found modify flag after save
			oExpensModel.hasReceipt="X";			
		}
		
        var pictureItem = oEvent.mParameters.pictureItem;
        
        if (pictureItem.isSourceDataUri()) {
            extraInfo = " MimeType is '"+pictureItem.getMimeType()+"'";
            var base64 = btoa(pictureItem.mProperties.source);
            var oModel = {};
            oModel.value = base64;
    	    var imageArray = sap.ui.getCore().getModel("imageModel").getData();
    	    imageArray.push(oModel);
    	    var jModel = new sap.ui.model.json.JSONModel(imageArray);
    	    sap.ui.getCore().setModel(jModel,"imageModel" );
        } else {
            extraInfo = " URL is '"+pictureItem.getSource()+"'";
        }
    },
   
	fnSaveImageCallback : function(oResponse){
		if (oResponse.statusCode == 200) {
			if (oResponse.model !== undefined) {	
//				var msg = "Image saved successfully.";
//				jQuery.sap.require("sap.m.MessageToast");
//				sap.m.MessageToast.show(msg, {
//					width : "30em"
//				});
			}
		} else {
			var msg = "Unable to save image.";
			jQuery.sap.require("sap.m.MessageToast");
			sap.m.MessageToast.show(msg, {
				width : "30em"
			});
		}
	},
    
	onUploadFailed : function(oEvent) {
		var errorStatus = oEvent.mParameters.reason;
		// don't directly use the status - it is not localised - this is just a sample
		sap.m.MessageToast.show(errorStatus);
	},

    onFileNotSupported : function(oEvent){
        var errorMessage = oEvent.mParameters.fileNames + "\n Please upload image";
        sap.m.MessageToast.show(errorMessage);
    }
});