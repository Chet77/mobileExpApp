sap.ui.controller("application.takeAPicture", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf application.takeAPicture
*/
	onInit: function() {
		takeAPictureController = this;
	},


	onBeforeShow :function(evt){
		
	},
	
	onBackButtonPress : function(){
		citApp.backPage();
	},
	
	onEditIconPress : function (evt){
		// get data from model and pass to edit page
		var oData = sap.ui.getCore().getModel('itemModel').getData();		
		citApp.toPage("application.inputExpenseItem",oData);		
	},
	
	pictureAdded  : function(oEvent) {
		    var sUrl = "ExpenseReceipts";	
	        var pictureItem = oEvent.mParameters.pictureItem;

	        if (pictureItem.isSourceDataUri()) {
	            extraInfo = " MimeType is '"+pictureItem.getMimeType()+"'";
	            var base64 = btoa(pictureItem.mProperties.source); //.getBase64Encoding();
	            var oModel = {};

	            // get hold of header and append slug value
	            citApp.getEAO().oServiceModel.setHeaders({
		            					"slug" : "00155DD305021ED4948C2E4693743DC7"
	            });
	            oModel.value = base64;
		    	
	            //call EAO
		    	citApp.getEAO().create(sUrl, oModel, takeAPictureController.fnSaveImageCallback);
	        } else {
	        	extraInfo = " URL is '"+pictureItem.getSource()+"'";
	        }
	},    
	
	fnSaveImageCallback : function(oResponse){
		if (oResponse.statusCode == 200) {
			if (oResponse.model !== undefined) {	
				var msg = "Image saved successfully.";
				jQuery.sap.require("sap.m.MessageToast");
				sap.m.MessageToast.show(msg, {
					width : "30em"
				});
			}
		} else {		
			var msg = "Unable to save image .";
			jQuery.sap.require("sap.m.MessageToast");
			sap.m.MessageToast.show(msg, {
				width : "30em"
			});
		}
	},	    
	
	onUploadFailed : function(oEvent) {
		var errorStatus = oEvent.mParameters.reason;
		sap.m.MessageToast.show(errorStatus);
	},
	
	onFileNotSupported : function(oEvent){
		var errorMessage = oEvent.mParameters.fileNames + "\n Please upload image";
		sap.m.MessageToast.show(errorMessage);
	},
});