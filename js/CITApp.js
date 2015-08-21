function CITApp(sLocalResources, sViewType, sPlaceAt, sAppViewName, sErrorViewName, bIsMobile) {
	
	this.sLocalResources = sLocalResources;
	this.sViewType = sViewType;
	this.sPlaceAt = sPlaceAt;
	this.sAppViewName = sAppViewName;
	this.sErrorViewName = sErrorViewName;
	this.bIsMobile = bIsMobile;
	
	/**
	 * @param debugMode : String to distinguish whether the application is in debug mode or not.
	 * This is used for when switching between minifed and non-minifed files
	 */
	this.debugMode = "false";
	this.logLevel = "error";
	this.splitApp = null;
	this.app = null;
	this.eao = null;
	this.messageManager = null;
	
	var functionName = this.init;
	var that = this;
	setTimeout(function () {
		functionName(that);
	}, 0);
	
	return this;
}

/**
 * Initialisation of CITApplication
 */
CITApp.prototype.init = function (citApp) {
	try {
		citApp.loadBootstrap();
		citApp.checkForLogLevel();
		citApp.loadMainView();
		$(document).ready(function(){
			citApp.initialiseMessageManager();
		});
	} catch (e) {
		alert("Could not load application because " + e.message);
		console.log(e.stack);
	}
};

/**
 * Function to load application main view
 * This method takes the value from CITApp initialise method
 * and set the main view with the splitApp created for the 
 * application (cater for error scenario as well) 
 * @class CITApp
 * 
 * @param none
 * @return none
 * @version {@link CITApp}
 */
CITApp.prototype.loadMainView = function () {
	sap.ui.localResources(this.sLocalResources);
	
	try {
		var viewName = this.sLocalResources + "." + this.sAppViewName;
		var view = sap.ui.view({viewName:viewName, type:this.sViewType});
		if(this.sPlaceAt !==null && this.sPlaceAt !==""){
			view.placeAt(this.sPlaceAt);
		}
		this.app = view.getController().app;
		this.splitApp = view.getController().splitApp;
	} catch (e) {
		Logger.error(e.message);
		Logger.error(e.stack);
		var viewName = this.sLocalResources + "." + this.sErrorViewName;
		var view = sap.ui.view({viewName:viewName, type:this.sViewType});
		view.setModel(e,"errorModel");
		if(this.sPlaceAt !== null && this.sPlaceAt !==""){
			view.placeAt(this.sPlaceAt);
		}else{
			view.placeAt("body");
		}
	}
};

/**
 * Function to initialise Message Manager class, a position variable could 
 * be passed to set the position of message box on application layout 
 *   
 * @class CITApp
 * 
 * @param {String} sPosition - Position on the Layout
 * @return {Boolean} bInitialisedMessageManager -  Boolean to verify if the Message Manager is initialised
 * @version {@link CITApp}
 */
CITApp.prototype.initialiseMessageManager = function(sPosition){
	var bInitialisedMessageManager = false;
	try{
		var messageManager = new MessageManager(sPosition,this.bIsMobile);
		this.messageManager = messageManager;
		bInitialisedMessageManager = true;
	}catch(e){
		Logger.error(e.stack);
		Logger.error(e.message);
	}
	
	return bInitialisedMessageManager;
};

CITApp.prototype.checkForLogLevel = function () {
	var logLevel = $.sap.getUriParameters().get("logLevel");
	if(logLevel !== null && logLevel !== "info" && logLevel !== "warn" && logLevel !== "debug") {
		this.logLevel = "error";
	} else {
		this.logLevel = logLevel;
	}
	Logger.setLogLevel(this.logLevel);
};

/**
 * Function to load all files for the project from bootstrap.js
 * (decides to load minified or non-minified version)
 * This method iterate over the nameSpaces & register the module 
 * path, iterate over the CSS array & include style sheets and 
 * iterate over the JS array & include JS files
 *   
 * @class CITApp
 * @param none
 * @return none
 * @version {@link CITApp}
 */
CITApp.prototype.loadBootstrap = function () {
	try {
		$.sap.registerModulePath("js", "js");
		$.sap.require("js.bootstrap");
		
		if (bootstrap !== undefined) {
			//call the method to check whether the application is debug mode
			if (bootstrap.debugMode==="forcedTrue") { 
				this.debugMode = true; // DEV Mode when always non-minified versions of file is needed.
			}else if(bootstrap.debugMode==="true"){
				this.checkForDebugMode();// UAT when URL may influence having minified version or not.
			}else if(bootstrap.debugMode==="false"){
				this.debugMode = false;// Production where always minified version is used.
			}
			
			//iterate over the nameSpaces & register the module path
			if (bootstrap.namespaces !== undefined) {
				for (var i = 0; i < bootstrap.namespaces.length; i++) {
					var item = bootstrap.namespaces[i];
					$.sap.registerModulePath(item.nameSpace, item.filesLocation);
					if (item.registerCaching) {
						sap.ui.core.AppCacheBuster.register(item.filesLocation);
					}
				}
			}
			//iterate over the CSS array & include style sheets
			if (bootstrap.cssFiles !== undefined) {
				for (var i = 0; i < bootstrap.cssFiles.length; i++) {
					var item = bootstrap.cssFiles[i];
					$.sap.includeStyleSheet(item);
				}
			}
			
			//iterate over the JS array & include JS files
			if (bootstrap.jsFiles !== undefined) {
				for (var i = 0; i < bootstrap.jsFiles.length; i++) {
					var item = bootstrap.jsFiles[i];
					if (this.debugMode) {
						$.sap.require(item);
					} else {
						$.sap.require(item+"-min");
					}
				}
			}
		}
	} catch (e) {
		console.error("Could not load bootstrap configuration. Because ; "+e.stack);
	}
};

/**
 * Function to check if the "debug" parameter is in the URL & whether 
 * it is set to true or false
 *   
 * @class CITApp
 * @param none
 * @return {Boolean} debugMode -  Boolean to verify is debug mode ON?
 * @version {@link CITApp}
 */
CITApp.prototype.checkForDebugMode = function () {
	var debugMode = $.sap.getUriParameters().get("debug");
	if(debugMode === null) {
		//register module path - minified
		this.debugMode = false;
	} else {
		if (debugMode==="true") {
			this.debugMode = true; //register module path for non-minified files
		} else {
			this.debugMode = false; //register module path - minified
		}
	}
};


/**
 * Function to initialise EAO class, with passed in credentials and 
 * service URL. This method return a boolean based on successful 
 * initialisation 
 *   
 * @class CITApp
 * 
 * @param {String} sServiceUrl - Service URL string
 * @param {String} bJson - Boolean value for choosing JSON (true/false) 
 * @param {String} sUsername - For accessing Gateway services User Name
 * @param {String} sPassword - For accessing Gateway services User Password
 * @return {Boolean} bInitialisedEAO -  Boolean to verify if the EAO is initialised
 * @version {@link CITApp}
 */
CITApp.prototype.initialiseEAO = function (sServiceUrl, bJson, sUsername, sPassword){
	var bInitialisedEAO = false;
	try{
		var eao = new EAO(sServiceUrl, bJson, sUsername, sPassword);
		this.eao = eao;
		bInitialisedEAO = true;
	}catch(e){
		Logger.error(e.stack);
		Logger.error(e.message);
	}
	
	return bInitialisedEAO;
};

/**
 * Function to load a new view or existing view.
 * Developers need to make sure that the view is already not a part of the DOM.
 * Also, if a particular view needs to be created more than once, then this function 
 * should not be used. Use framework method instead.
 *   
 * @class CITApp
 * 
 * @param {String} sPage - Full qualified page name e.g. application.master.mainPage
 * @param {String} sViewType -  data object or null (not mandatory)
 * @return oView - new view created having Id as qualified name of the View, with the passed in View Type
 * @version {@link CITApp}
 */
CITApp.prototype.loadNewView = function (sPage){
       var sId = this.replaceAllInString(sPage, ".", "_");
       var oView = sap.ui.view({id: sId, viewName:sPage, type:this.sViewType});
       return oView;
};
 
CITApp.prototype.replaceAllInString = function(sVariable, existingCharacter, newCharacter){
       var sReplacedString =  sVariable;
       for(var i=0;i<sVariable.split(".").length-1;i++){
             sReplacedString = sReplacedString.replace(existingCharacter, newCharacter);
       }
       return sReplacedString;
};

/**
 * Function to navigate to a master view page
 *   
 * @class CITApp
 * 
 * @param {String} sPage - Full qualified page name e.g. application.master.mainPage
 * @param {Object} oData -  data object or null (not mandatory)
 * @return none
 * @version {@link CITApp}
 */
CITApp.prototype.toMasterPage = function (sPage, oData) {
	//check to see if sPage already exists in DOM
	var sId = this.replaceAllInString(sPage, ".", "_");
	var page = sap.ui.getCore().byId(sId);
	
	if (page === undefined) {
		//load view
		var view = this.loadNewView(sPage);
		//add view
		this.splitApp.addMasterPage(view);
	}
	
	//In the case where the page is already visible, but we want to re run the navigation
	if (this.splitApp.getCurrentMasterPage().getId() == sId) {
		var evt = {};
		evt.data = oData;
		this.splitApp.getCurrentMasterPage().getController().onBeforeShow(evt);
	} else {
		this.splitApp.toMaster(sId, "", oData, null);
	}
};

/**
 * Function to navigate to a detail view page
 *   
 * @class CITApp
 * 
 * @param {String} sPage - Full qualified page name e.g. application.detail.mainPage
 * @param {Object} oData -  data object or null (not mandatory)
 * @return none
 * @version {@link CITApp}
 */
CITApp.prototype.toDetailPage = function (sPage, oData) {
	//check to see if sPage already exists in DOM
	var sId = this.replaceAllInString(sPage, ".", "_");
	var page = sap.ui.getCore().byId(sId);
	
	if (page === undefined) {
		//load view
		var view = this.loadNewView(sPage);
		//add view
		this.splitApp.addDetailPage(view);
	}
	
	if (this.splitApp.getCurrentDetailPage().getId() == sId) {
		var evt = {};
		evt.data = oData;
		this.splitApp.getCurrentDetailPage().getController().onBeforeShow(evt);
	} else {
		this.splitApp.toDetail(sId, "", oData, null);
	}
};



CITApp.prototype.toPage = function (sPage, oData) {
	//check to see if sPage already exists in DOM
	var sId = this.replaceAllInString(sPage, ".", "_");
	var page = sap.ui.getCore().byId(sId);
	
	if (page === undefined) {
		//load view
		var view = this.loadNewView(sPage);
		//add view
		this.app.addPage(view);
	}
	
	if (this.app.getCurrentPage().getId() == sId) {
		var evt = {};
		evt.data = oData;
		this.app.getCurrentPage().getController().onBeforeShow(evt);
	} else {
		this.app.to(sId, "", oData, null);
	}
};

CITApp.prototype.backPage = function (oBackData) {
	this.app.back(oBackData);
};

CITApp.prototype.backMasterPage = function (oBackData) {
	this.splitApp.backMaster(oBackData);
};

CITApp.prototype.backDetailPage = function (oBackData) {
	this.splitApp.backDetail(oBackData);
};

CITApp.prototype.setSplitApp = function (splitApp) {
	this.splitApp = splitApp;
};

CITApp.prototype.getSplitApp = function () {
	return this.splitApp;
};

/**
 * Function to initialise EAO class, with passed in credentials and 
 * service URL. This method return a boolean based on successful 
 * initialisation 
 *   
 * @class CITApp
 * 
 * @param {String} sContainerId - Id of container 
 * @param {String} sToViewId - Id of the view
 * @param {Object} oData - Object to pass onto next page while navigation
 * @param {String} sTransition - Choice of a particular transition (not mandatory)
 * @return none
 * @version {@link CITApp}
 */
CITApp.prototype.navigate = function (sContainerId, sToViewId, oData, sTransition) {
	var oToView = sap.ui.getCore().byId(sToViewId);
	
	var oContainerView = sap.ui.getCore().byId(sContainerId);
	
	if (oToView === undefined) {
		//load the view
		var view = sap.ui.view({id: sToViewId, viewName:sToViewId, type:this.sViewType});
		
		//add content to the container 
		oContainerView.addContent(view);
		
		//pass oData
		if (view.getController().onBeforeShow !== undefined) {
			view.getController().onBeforeShow(oData);
		}
		
		//do $ transition
		var visible = $('.currentlyVisible');
		visible.animate({"left":"-1000px"}, "slow").removeClass('currentlyVisible');
	}
};

CITApp.prototype.getEAO = function () {
	return this.eao;
};

CITApp.prototype.getMessageManager = function () {
	return this.messageManager;
};