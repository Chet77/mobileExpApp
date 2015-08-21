var Formatter = {
		expneseTypeIcons : function(expenseType){
			
			switch (expenseType){
				case "TEL" :
					icon = "sap-icon://Flaticon/phone16";
					break;
				case "ENT" :
					icon = "sap-icon://Flaticon/multiple25";
					break;
				case "PUB" :
					icon = "sap-icon://Flaticon/airplane105";
					break;
				case "MIL" :
					icon = "sap-icon://Flaticon/petrol";
					break;
				case "ACC" :
					icon = "sap-icon://Flaticon/food7";
					break;
				case "COL" :
					icon = "sap-icon://Flaticon/multiple25";
					break;
				case "OTH" :
					icon = "sap-icon://Flaticon/full22";
					break;
				default :
					icon = "sap-icon://notification";
			}
			return icon;
		},
		
		formatFromAndToDate : function(fDate, tDate){
			var fromDate = DateFormatter.format(fDate, "dd/mm/yyyy");
			var toDate = DateFormatter.format(tDate, "dd/mm/yyyy");
			return fromDate +" - "+toDate;
		},
		
		formatSingleDate : function (sDate) {
			var parsedDate = DateFormatter.parseDate(sDate);
			var nDate = DateFormatter.format(parsedDate, "dd/mm/yyyy");
			return nDate;
		},
		
		getItemCountText : function(sItemCount){
			var itemCount = parseInt(sItemCount);
			var text = itemCount.toString() + " items";
			return text;
		},
		
		amountToLabel : function(value){
			if(value === "" || value === "0.00"){
				labelVal = "0.00 GBP";
			}else{
				labelVal = value + " GBP";
			}
			return labelVal;
		},
		
		customerProject : function (sCustomer, sProject) {
			return sCustomer + " " + sProject;
		},
		
		statusForSubmitBtn : function(status){
			if(status==="SUBMITTED"){
				return false;
			}else{
				return true;
			}
			
		},
		
		mileageExpenseTypeFieldVisibility : function (sExpenseType) {
			if (sExpenseType === "MIL") {
				return true;
			} else {
				return false;
			}
		},
		
		mileageExpenseTypeGrossEditable : function (sExpenseType) {
			if (sExpenseType === "MIL") {
				return false;
			} else {
				return true;
			}
		},
		
		getNoOfMiles : function(expenseType, noOfMiles){
			if(expenseType =="TRAVEL" ){
				return noOfMiles + " Miles";
			} else{
				return "";
			}
		},
		
		costToCustomer : function(sCtc){
			if (sCtc === "X" || sCtc === true){
				return "Yes";
			}else{
				return "No";
			}
		},
		
		expenseTypeListBackIcon : function (previousPage) {
			if (previousPage === "REQUEST") {
				return "sap-icon://nav-back";
			} else {
				return "sap-icon://home";
			}
		}
		
};