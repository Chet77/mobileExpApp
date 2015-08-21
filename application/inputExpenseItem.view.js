sap.ui.jsview("application.inputExpenseItem", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf application.inputExpenseItem
	*/ 
	getControllerName : function() {
		return "application.inputExpenseItem";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf application.inputExpenseItem
	*/ 
	createContent : function(oController) {
 		return new sap.m.Page({
 			title : "Enter Item",
 			showNavButton : true,
 			navButtonPress : oController.backPage, 			
 			footer : new sap.m.Bar({
 				design : sap.m.BarDesign.Header,
 				contentRight : [
 				                new sap.m.Button('saveIcon',{
 				                	text : "Save Item",
 				                	press : oController.saveItem,
 				                	type : sap.m.ButtonType.Emphasized,
 				                	icon : "sap-icon://save"
 				                })
 				                ]
 			}),
			content: [
			          new sap.m.Carousel({
			        	  pages : [
			        	           new sap.m.VBox('inputBox',{
			        	        	   items:[
			        	        	          new sap.m.Input("customerProject",{
			        	        	        	  placeholder:'Customer - Project',
			        	        	        	  value : "{expenseItemModel>/customerProject}",
			        	        	        	  showSuggestion:true,
			        	        	        	  valueState : "None",
			        	        	        	  suggestionItems : {
			        	        	        		  path:"applicationModel>/projects",
			        	        	        		  template:new sap.ui.core.ListItem({
			        	        	        			  text:"{applicationModel>customerProject}"
			        	        	        		  })
			        	        	        	  }
			        	        	          }),
			        	        	          new sap.m.DatePicker("dateField",{
			        	        	        	  valueFormat : "dd/MM/yyyy",
			        	        	        	  valueState : "None",
			        	        	        	  placeholder : "Select Date"
			        	        	          }).bindValue("expenseItemModel>/date"),
			        	        	          new sap.m.TextArea("description",{
			        	        	        	  value : "{expenseItemModel>/reason}",
			        	        	        	  valueState : "None",
			        	        	        	  placeholder:'Description',
			        	        	        	  liveChange:oController.charCount
			        	        	          }),
			        	        	          new sap.m.Label('charCount'),
			        	        	          new sap.m.VBox('lower',{
			        	        	        	  items:[
			        	        	        	         new sap.m.Input("milesIn",{
			        	        	        	        	 value : "{expenseItemModel>/noOfMiles}",
			        	        	        	        	 valueState : "None",
			        	        	        	        	 type:sap.m.InputType.Number,
			        	        	        	        	 placeholder:"Total Mileage",
			        	        	        	        	 change:oController.mathMiles,
			        	        	        	        	 visible : {
			        	        	        	        		 path : "expenseItemModel>/expenseType",
			        	        	        	        		 formatter : Formatter.mileageExpenseTypeFieldVisibility
			        	        	        	        	 }
			        	        	        	         }).addStyleClass("styleInputBox"),
			        	        	        	         new sap.m.Input('grossCostIn',{
			        	        	        	        	 value : "{expenseItemModel>/amount}",
			        	        	        	        	 valueState : "None",
//			        	        	        	        	 type:sap.m.InputType.Number,
			        	        	        	        	 placeholder:"Gross Cost",
			        	        	        	        	 change:oController.mathCost
//			        	        	        	        	 editable : {
//			        	        	        	        		 path : "expenseItemModel>/expenseType",
//			        	        	        	        		 formatter : Formatter.mileageExpenseTypeGrossEditable
//			        	        	        	        	 }
			        	        	        	         }).addStyleClass("styleInputBox"),
			        	        	        	         new sap.m.Label('netCost',{
			        	        	        	        	 text:{
			        	        	        	        		 path : "expenseItemModel>/net",
			        	        	        	        		 formatter : Formatter.amountToLabel
			        	        	        	        	 }
			        	        	        	         }).addStyleClass("styleBlock"),
			        	        	        	         new sap.m.Label('vatValue',{
			        	        	        	        	 text:{
			        	        	        	        		 path : "expenseItemModel>/vat",
			        	        	        	        		 formatter : Formatter.amountToLabel
			        	        	        	        	 }
			        	        	        	         }).addStyleClass("styleBlock"),
			        	        	        	         ]
			        	        	          }),
			        	        	          new sap.m.InputListItem({
			        	        	        	  label : "Charge to Customer",
			        	        	        	  content : new sap.m.Switch("ctcSwitch",{
			        	        	        		  customTextOn:'YES',
			        	        	        		  customTextOff:"NO",
			        	        	        		  state : "{expenseItemModel>/ctc}"
			        	        	        	  }).addStyleClass("styleSwitch")
			        	        	          }).addStyleClass("cowboy"),
			        	        	          new sap.m.InputListItem({
			        	        	        	  label : "Lost Receipt",
			        	        	        	  content : new sap.m.Switch("lostReceiptSwitch",{
			        	        	        		  customTextOn:'YES',
			        	        	        		  customTextOff:"NO"
			        	        	        	  }).addStyleClass("styleSwitch")
			        	        	          }).addStyleClass("cowboy")
			        	        	          ]
			        	           }),
			        	           new sap.m.CustomListItem({
			        	        	   content : [
			        	        	              new sap.ca.ui.AddPicture({
			        	        	            	  pictures : {
			        	        	            		  path:'itemImageModel>/images',
			        	        	            		  template:new sap.ca.ui.PictureItem({
			        	        	            			  source :"{itemImageModel>item}"
			        	        	            		  })
			        	        	            	  },
			        	        	            	  pictureAdded  : oController.pictureAdded,
			        	        	            	  buttonPageType:"Form",
			        	        	            	  imageUploadFailed : oController.onUploadFailed,
			        	        	            	  compression:"high",
			        	        	            	  fileNotSupported : oController.onFileNotSupported
			        	        	              }),
			        	        	              ]
			        	           })
			        	           ]
			          })
			          ]
 		});
	}
});