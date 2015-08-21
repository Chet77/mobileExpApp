var bootstrap = {
		
		namespaces : [
			{nameSpace : "citLib", filesLocation : "../z_cit_eexp_m", registerCaching : true},
		],
		
		jsFiles :
			[
			 	"js.Formatter",
			 	"js.utils.DateFormatter",
			 	"js.utils.Logger",
			 	"js.utils.Util",
			 	"js.utils.EAO",
			 	"js.utils.MessageManager"
	        ],
	        
	    cssFiles :
	    	[
	    	 	"css/messageManager.css",
	    	 	"css/common.css",
	    	 	"fonts/flaticon.css"
	    	],
	    debugMode : "forceTrue",
	    //development = "forcedTrue", uat = "true", production = "false"
	    logLevel : "error" //info, warn, debug, error
	    //development = info, uat = warn, production = error
};