if(typeof NOF == "undefined") {
function NOF_NS() {
this.__proto__ = NOF_NS.prototype;
}
}
var NOF = new NOF_NS();
if(typeof NOF.ProgramVersion == "undefined")
{
function NOF_ProgramVersion (majorNumber, minorNumber, revisionNumber) {
this.__proto__ = NOF_ProgramVersion.prototype;
if (arguments.length != 3) throw "Illegal arguments exception";
this.majorNumber = majorNumber;
this.minorNumber = minorNumber;
this.revisionNumber = revisionNumber;
}
{
var method = NOF_ProgramVersion.prototype;
method.getMajorNumber = function () {
return this.majorNumber;
}
method.getMinorNumber = function () {
return this.minorNumber;
}
method.getRevisionNumber = function () {
return this.revisionNumber;
}
method.eq = function (programVersion) {
return this.majorNumber == programVersion.getMajorNumber()
&& this.minorNumber == programVersion.getMinorNumber()
&& this.revisionNumber == programVersion.getRevisionNumber();
}
method.lt = function (programVersion) {
var retValue = false;
if (this.majorNumber < programVersion.getMajorNumber() ) {
retValue = true;
} else if (this.majorNumber == programVersion.getMajorNumber()) {
if (this.minorNumber < programVersion.getMinorNumber()) {
retValue = true;
} else if (this.minorNumber == programVersion.getMinorNumber()) {
if (this.revisionNumber < programVersion.getRevisionNumber()) {
retValue = true;
}
}
}
return retValue;
}
method.lte = function (programVersion) {
return this.lt(programVersion) && this.eq(programVersion);
}
method.gt = function (programVersion) {
return !this.lte(programVersion);
}
method.gte = function (programVersion) {
return !this.lt(programVersion);
}
method.toString = function () {
return this.majorNumber + "." + this.minorNumber + "." + this.revisionNumber;
}
}
NOF.__proto__.ProgramVersion = NOF_ProgramVersion;
}
if (typeof NOF.Util == "undefined") {
function NOF_Util() {
this.__proto__ = NOF_Util.prototype;
}
NOF.Util = new NOF_Util();
function NOF_Util_FramesIterator (wnd) {
this.__proto__ = NOF_Util_FramesIterator.prototype;
this.currentIndex = 0;
this.array = wnd.frames;
NOF_Util_FramesIterator.prototype.next = function () {
return (this.currentIndex < this.array.length ) ? this.array[this.currentIndex++] : null;
}
}
NOF.Util.__proto__.FramesIterator = NOF_Util_FramesIterator;
NOF.Util.GetFrameWndByName = function GetFrameWndByName(name) {
var stack = new Array();
stack[0] = new NOF.Util.FramesIterator(window);
var wnd = null;
var found = false;
while (stack.length > 0 && !found)
{
if ((wnd = stack[stack.length -1].next()) != null)
{
if (wnd.name == name)
{
found = true;
break;
}
else if (wnd.frames.length > 0)
{
stack[stack.length] = new NOF.Util.FramesIterator(wnd);
}
}
else
{
stack[stack.length-1] = null;
stack.length--;
}
}
return wnd;
}
}
if(typeof NOF.Event == "undefined") {
function NOF_Event(source, type, state) {
this.__proto__ = NOF_Event.prototype;
this.source = source;
this.type = type;
this.state = state;
}
var member = NOF_Event.prototype;
member.MOUSEDOWN_EVENT = 0x001;
member.MOUSEUP_EVENT = 0x002;
member.MOUSEMOVE_EVENT = 0x004;
member.MOVIE_INITIALIZED_EVENT = 0x008;
member.MOVIE_RENDERED_EVENT = 0x010;
var method = NOF_Event.prototype;
method.getSource = function() {
return this.source;
};
method.getType = function() {
return this.type;
};
method.getState = function() {
return this.state;
};
NOF.Event = new NOF_Event();
NOF.EventObject = NOF_Event;
}
if(typeof NOF.Flash == "undefined") {
function NOF_Flash() {
this.__proto__ = NOF_Flash.prototype;
}
NOF.Flash = new NOF_Flash();
}
if(typeof NOF.Flash.HtmlCtrl == "undefined")
{
function NOF_Flash_HtmlCtrl_Base()
{
this.__proto__ = NOF_Flash_HtmlCtrl_Base.prototype;
}
{
var member = NOF_Flash_HtmlCtrl_Base.prototype;
member.MOVIE_LISTENER = 0x001;
member.MOUSE_LISTENER = 0x002;
member.NETSCAPE_PLUGIN_NAME = "Shockwave Flash";
member.IE_PLUGIN_NAME = "ShockwaveFlash.ShockwaveFlash";
member.FOOTPRINT_SUFFIX = "_footprint";
member.CONTAINER_SUFFIX = "_container";
member.LAYER_SUFFIX = "LYR";
member.PARAM_ALLOWSCRIPTACCESS = "allowScriptAccess";
member.PARAM_QUALITY = "quality";
member.PARAM_WMODE = "wmode";
member.DEFAULT_QUALITY_VALUE = "high";
member.DEFAULT_WMODE_VALUE = "transparent";
member.cDELTA = 5;
member.DEFAULT_HIGHEST_ZINDEX = 2000;
var method = NOF_Flash_HtmlCtrl_Base.prototype;
method.ctr = function ( id, movieSrc, width, height, align, htmlDocument) {
if (arguments.length > 0) {
if (id == undefined || id.length <=0 ) {
throw "IllegalArgumentException: id cannot be empty";
}
if (movieSrc == undefined || movieSrc.length <=0 ) {
throw "IllegalArgumentException: movieSrc cannot be null";
}
}
this.movieListeners= new Array();
this.mouseListeners= new Array();
this.params = new Array();
this.variables = new Array();
this.cssType;
this.cssValue;
this.id = id;
this.movieSrc = movieSrc;
this.width = (width != null) ? width : null;
this.height = (height != null) ? height : null;
this.align = (align != null) ? align : null;
this.htmlDocument = (htmlDocument != undefined) ? htmlDocument : document;
this.position = {left : -1, top: -1};
this.isFSCEventsSupportEnabled = true;
this.areFSCEventsEnabled = true;
this.setParam(this.PARAM_ALLOWSCRIPTACCESS, "sameDomain");
this.setParam(this.PARAM_QUALITY, this.DEFAULT_QUALITY_VALUE);
this.setParam(this.PARAM_WMODE, this.DEFAULT_WMODE_VALUE);
this.requiredPlayerVersion = "8,0,0,0";
this.closedMenuSize = {width : 0, height: 0};
this.foHtmlInstance = null;
this.foContainer = null;
this.foFootprint = null;
this.foParentLYR = null;
this.isWritten = false;
this.bReady = false;
this.capturedEventsMask = 0;
this.owner = null;
this.ASVersion = "2";
}
method.isReady = function () { return this.bReady;};
method.getOwner = function () { return this.owner;};
method.setOwner = function (owner) { this.owner = owner;};
method.getWidth = function () { return this.width;};
method.setWidth = function (width) { this.width = width;};
method.getHeight = function () { return this.height;};
method.setHeight = function (height) { this.height = height;};
method.getPosition = function () { return this.position;};
method.setPosition = function (position) { this.position = position;};
method.getMovieSrc = function () { return this.movieSrc;};
method.setMovieSrc = function (movieSrc) { this.movieSrc = movieSrc;};
method.getAlign = function () { return this.align;};
method.setAlign = function (align) { this.align = align;};
method.getId = function () {return this.id;};
method.getParam = function(name) { return this.params[name.toLowerCase()];};
method.setParam = function(name, value) { this.params[name.toLowerCase()] = value;};
method.getParams = function() { return this.params; };
method.setCSSParam = function(name, value) { this.cssType = name; this.cssValue = value;};
method.getVariable = function(name) {return this.variables[name];};
method.setVariable = function(name, value) { this.variables[name] = value;};
method.getVariables = function() { return this.variables;};
method.getFootprint = function() {
if (!this.foFootprint) {
this.foFootprint = this.findObject(this.id + this.FOOTPRINT_SUFFIX);
}
return this.foFootprint;
};
method.getParentLYR = function() {
if (!this.foParentLYR) {
this.foParentLYR = this.findObject(this.id + this.LAYER_SUFFIX);
if (this.foParentLYR != null && typeof (this.foParentLYR.length) == 'number') {
this.foParentLYR = this.foParentLYR[0];
}
}
return this.foParentLYR;
}
method.getHtmlInstance = function() {
if (!this.foHtmlInstance) {
this.foHtmlInstance = this.findObject(this.id);
}
return this.foHtmlInstance;
};
method.getContainer = function() {
if (!this.foContainer) {
this.foContainer = this.findObject(this.id + this.CONTAINER_SUFFIX);
}
return this.foContainer;
};
method.enableFSCEventsSupport = function (enable) {
this.isFSCEventsSupportEnabled = enable;
};
method.enableFSCEvents = function (enable) {
this.areFSCEventsEnabled = enable;
};
method.restart = function () {
try {
this.getHtmlInstance().Rewind();
this.getHtmlInstance().Play();
this.log("restarting");
} catch (e) {}
};
method.repaint = function () {
var position = this.getObjectPosition(this.getFootprint());
this.log("onRepaint -> " + position[0] + ", " + position[1]);
};
method.onRepaint = function () {
this.repaint();
};
method.onMove = function (left, top) {
this.setStyle("left",left + "px");
this.setStyle("top", top + "px");
this.position.left = left;
this.position.top = top;
};
method.setStyle = function (name, value, obj) {
if (!obj) { obj = this.getContainer()}
if (obj != null && typeof(obj.style) == "object") {
obj.style[name] = value;
}
};
method.getStyle = function (name, obj) {
if (!obj) { obj = this.getContainer()}
return (obj != null && typeof(obj.style) == "object") ? obj.style[name] : null;
};
method.onResize = function (width, height) {
this.log("onResize -> " + width + ", " + height);
if (width == this.width && height == this.height) return;
this.adjustZIndexOnSizeChange(width, height);
this.width = width;
this.height = height;
var htmlInstance = this.getHtmlInstance();
if (htmlInstance) {
htmlInstance.width = width;
htmlInstance.height = height;
}
};
method.onPostInit = function (width, height) {
this.log("PostInit");
this.closedMenuSize.width = width;
this.closedMenuSize.height = height;
var parentLYR = this.getParentLYR();
this.parentZIndex = this.getStyle("zIndex", parentLYR);
if (this.getFootprint()) {
this.doInitialPositioning(width, height);
NOF.Flash.HtmlCtrl.instancePtr = this;
setTimeout("if (NOF.Flash.HtmlCtrl.instancePtr && typeof NOF.Flash.HtmlCtrl.instancePtr.doPostInitCallBack == 'function' ) { NOF.Flash.HtmlCtrl.instancePtr.doPostInitCallBack(); };", 100);
} else {
this.onResize(width,height);
}
if (this.capturedEventsMask & NOF.Event.MOVIE_INITIALIZED_EVENT) {
this.notifyMovieListeners(new NOF.EventObject(this, NOF.Event.MOVIE_INITIALIZED_EVENT, {w: width, h: height}));
}
this.log("/PostInit");
};
method.onRenderComplete = function () {
this.log("RenderComplete");
if (typeof(jshandler) != "undefined" && jshandler != null) {
window.setTimeout("jshandler.OnRenderComplete()", 100);
}
this.log("/RenderComplete");
};
method.doInitialPositioning = function (width, height) {
var footprint = this.getFootprint();
if (footprint) {
this.setStyle("width",width + "px", footprint);
this.setStyle("height", height + "px", footprint);
var position = this.getObjectPosition(footprint);
this.onResize(width,height);
this.bReady = true;
}
};
method.doPostInitCallBack = function ()
{
if ( typeof(this.postInitCallBack) == 'object'
&& this.postInitCallBack != null
&& typeof(this.postInitCallBack.callback_handler) == 'function' )
{
this.postInitCallBack.callback_handler('PostInit');
};
}
method.play = function (postInitCallBack) {
this.postInitCallBack = postInitCallBack;
try {
this.getHtmlInstance().Play();
} catch (e) {}
this.log("playing");
};
method.toHTML = function () {throw "Abstract method 'toHTML' cannot called!";};
method.write = function () {
if (!this.isWritten) {
var str = this.toHTML();
this.log("\n-------\n" + str + "\n-------\n", 1);
this.htmlDocument.write(str);
this.isWritten = true;
} else {
throw "write method cannot be called twice!";
}
};
method.findObject = function (objectID, doc) {
var p, i, foundObj;
if(!doc) {
doc = this.htmlDocument;
}
if( (p = objectID.indexOf("?")) > 0 && parent.frames.length) {
doc = parent.frames[objectID.substring(p+1)].document;
objectID = objectID.substring(0,p);
}
if(!(foundObj = doc[objectID]) && doc.all) {
foundObj = doc.all[objectID];
}
for (i=0; !foundObj && i < doc.forms.length; i++) {
foundObj = doc.forms[i][objectID];
}
for(i=0; !foundObj && doc.layers && i < doc.layers.length; i++) {
foundObj = this.findObject(objectID, doc.layers[i].document);
}
if(!foundObj && doc.getElementById) {
foundObj = doc.getElementById(objectID);
}
return foundObj;
};
method.getObjectPosition = function (o) {
var curLeft = 0;
var curTop = 0;
if (o.offsetParent) {
while (o.offsetParent) {
curLeft += o.offsetLeft;
curTop += o.offsetTop;
o = o.offsetParent;
}
} else if (o.x && o.y) {
curLeft += o.x;
curTop += o.y;
}
return [curLeft, curTop];
};
method.getListenerByType = function (type) {
var listeners;
if (type == this.MOUSE_LISTENER)
listeners = this.mouseListeners;
else if (type == this.MOVIE_LISTENER)
listeners = this.movieListeners;
else {
alert ("Listener not supported.");
return null;
}
return listeners;
};
method.addListener = function ( type, listener) {
var listeners = this.getListenerByType(type);
if (listeners != null) {
for (var i=0; i<listeners.length; i++)
if ( listeners[i] == listener )
return;
listeners[listeners.length] = listener;
}
};
method.removeListener = function ( type, listener ){
var listeners = this.getListenerByType(type);
if (listeners != null) {
for (var i = 0; i < listeners.length; i++ )
if ( listeners[i] == listener ) {
listeners[i] = listeners[listeners.length -1];
listeners.length--;
}
}
};
method.addMovieListener = function ( listener ){
this.addListener(this.MOVIE_LISTENER, listener);
};
method.removeMovieListener = function ( listener ){
this.removeListener(this.MOVIE_LISTENER, listener);
};
method.notifyMovieListeners = function ( event ){
for (var i = 0; i < this.movieListeners.length; i++ ) {
switch (event.getType()) {
case NOF.Event.MOVIE_INITIALIZED_EVENT:
this.movieListeners[i].onMovieInitialized( event );
break;
case NOF.Event.MOVIE_RENDERED_EVENT:
this.movieListeners[i].onMovieRendered( event );
break;
}
}
};
method.addMouseListener = function ( listener ){
this.addListener(this.MOUSE_LISTENER, listener);
};
method.removeMouseListener = function ( listener ){
this.removeListener(this.MOUSE_LISTENER, listener);
};
method.notifyMouseListeners = function ( event ){
for (var i = 0; i < this.mouseListeners.length; i++ ) {
switch (event.getType()) {
case NOF.Event.MOUSEDOWN_EVENT:
this.mouseListeners[i].onMouseDown( event );
break;
case NOF.Event.MOUSEUP_EVENT:
this.mouseListeners[i].onMouseUp( event );
break;
case NOF.Event.MOUSEMOVE_EVENT:
this.mouseListeners[i].onMouseMove( event );
break;
}
}
};
method.captureEvents = function(eventsMask) {
this.capturedEventsMask = eventsMask;
};
method.onMouseDown = function (_x, _y, _btn, _cnt) {
if (this.capturedEventsMask & NOF.Event.MOUSEDOWN_EVENT) {
this.notifyMouseListeners(new NOF.EventObject(this, NOF.Event.MOUSEDOWN_EVENT, {x: _x, y: _y, btn: _btn, cnt: _cnt}));
this.log(["mouse down", _x, _y, _btn, _cnt]);
}
};
method.onMouseUp = function (_x, _y) {
if (this.capturedEventsMask & NOF.Event.MOUSEUP_EVENT) {
this.notifyMouseListeners(new NOF.EventObject(this, NOF.Event.MOUSEUP_EVENT, {x: _x, y: _y}));
this.log(["mouse up", _x, _y]);
}
};
method.onMouseMove = function (_x, _y) {
if (this.capturedEventsMask & NOF.Event.MOUSEMOVE_EVENT) {
this.notifyMouseListeners(new NOF.EventObject(this, NOF.Event.MOUSEMOVE_EVENT, {x: _x, y: _y}));
this.log(["mouse move", _x,_y]);
}
};
method.onLog = function (msg, level) {
this.log(msg, level);
};
method.log = function (msg, level) {
return;
if (this.htmlDocument.forms[0] && this.htmlDocument.forms[0]["log"]) {
this.htmlDocument.forms[0]["log"].value += this.id + ": " + msg + "\n";
}
};
method.setRequiredPlayerVersion = function (reqPlayerVersion) {
this.requiredPlayerVersion = reqPlayerVersion;
};
method.processFSCEvent = function (eventName, args) {
this.log("processFSCEvent -> " + eventName + "[" + args + "]");
var auxStr = "";
for (var i=0; i<args.length; i++) {
auxStr += "args[" + i + "]" + (i != args.length -1 ? ", " : "");
}
return eval("this.on" + eventName + "( " + auxStr + " )");
};
method.onSetASVersion = function(vers) {
this.ASVersion = vers;
}
method.callFlashMethod = function (methodName, arg) {
try {
if (this.ASVersion && parseInt(this.ASVersion) > 2) {
var m = arg.split(",");
this.getHtmlInstance().setProperty(m[0], m[1]);
} else {
this.getHtmlInstance().SetVariable("hostEventsMonitor", methodName + ":" + arg);
}
} catch (e) {}
};
method.getNextHighestIndex = function() {
return this.DEFAULT_HIGHEST_ZINDEX;
}
method.adjustZIndexOnSizeChange = function (width, height) {
if (Math.abs(this.closedMenuSize.width - width) > this.cDELTA
|| Math.abs(this.closedMenuSize.height - height) > this.cDELTA)
{
var parentLYR = this.getParentLYR();
if (parentLYR) {
this.log("setting high Z-Index on flyouts");
this.setStyle("zIndex", this.getNextHighestIndex(), parentLYR);
}
}
else
{
if (this.parentZIndex != null) {
var parentLYR = this.getParentLYR();
if (parentLYR) {
this.log("setting Z-Index on original size to " + this.parentZIndex);
this.setStyle("zIndex", this.parentZIndex, parentLYR);
}
}
}
}
}
function NOF_Flash_HtmlCtrl_IE(id, movieSrc, width, height, align, htmlDocument){
this.__proto__ = NOF_Flash_HtmlCtrl_IE.prototype;
this.ctr(id, movieSrc, width, height, align, htmlDocument);
}
NOF_Flash_HtmlCtrl_IE.prototype = new NOF_Flash_HtmlCtrl_Base;
{
var method = NOF_Flash_HtmlCtrl_IE.prototype;
method.getFSCommandHandlerDef = function() {
var str = "";
str += "<script>";
str += " function " + this.id +"_DoFSCommand(command, argsStr) {";
str += "var args;\n";
str += "if (typeof argsStr == 'object') { args = argsStr;} else {eval ('args = ' + argsStr + ';');}\n";
str += " NOF.Flash.MovieCollectionMgr.getCollection(" + this.owner.getId() + ").getMovieById('" + this.id + "').processFSCEvent(command, args);";
str += "}";
str += "\<\/script\>";
str += "<script event=\"FSCommand\" for=" + "\"" + this.id + "\">";
str += "var args;\n";
str += "if (typeof arguments[1] == 'object') { args = arguments[1];} else {eval ('args = ' + arguments[1] + ';');}\n";
str += this.id +"_DoFSCommand(arguments[0], args);";
str += "\<\/script\>";
return str;
}
method.toHTML = function () {
var htmlStr = "";
if (this.isFSCEventsSupportEnabled) {
htmlStr = this.getFSCommandHandlerDef();
}
htmlStr += '<OBJECT CLASSID="CLSID:D27CDB6E-AE6D-11cf-96B8-444553540000"';
htmlStr += ' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=' + this.requiredPlayerVersion + '"';
htmlStr += ' WIDTH="' + this.width +'" HEIGHT="'+ this.height +'" ID="'+ this.id +'" '+ this.cssType +'="'+this.cssValue+'">' + "\n";
htmlStr += '<PARAM NAME="movie" VALUE="' + this.movieSrc + '" />' + "\n";
for(var key in this.params) {
if ((key != "______array") && typeof this.params[key] != 'function') {
htmlStr += '<PARAM NAME="' + key + '" VALUE="' + this.params[key] + '" />' + "\n";
}
}
if (NOF.Flash.HtmlCtrl.getPlatform() == NOF.Flash.HtmlCtrl.PLATFORM_WINDOWS) {
this.variables["nof_isFSCommandAvailable"] = true;
}
if (this.capturedEventsMask) {
this.variables["nof_capturedEventsMask"] = this.capturedEventsMask;
}
this.variables["nof_objectID"] = this.id;
var flashVars = "";
for(var key in this.variables) {
if ((key != "______array") && typeof this.variables[key] != 'function') {
flashVars = key + "=" + escape(this.variables[key]) + (flashVars.length == 0 ? "" : "&") + flashVars;
}
}
delete this.variables["nof_isFSCommandAvailable"];
delete this.variables["nof_capturedEventsMask"];
delete this.variables["nof_objectID"];
if(flashVars.length > 0) {
htmlStr += '<PARAM NAME="FlashVars" VALUE="'+ flashVars +'" />' + "\n";
}
htmlStr += '</OBJECT>' + "\n";
return htmlStr;
};
}
function NOF_Flash_HtmlCtrl_NetscapeGeneric(id, movieSrc, width, height, align, htmlDocument){
this.__proto__ = NOF_Flash_HtmlCtrl_NetscapeGeneric.prototype;
this.ctr(id, movieSrc, width, height, align, htmlDocument);
}
NOF_Flash_HtmlCtrl_NetscapeGeneric.prototype = new NOF_Flash_HtmlCtrl_Base;
{
var method = NOF_Flash_HtmlCtrl_NetscapeGeneric.prototype;
method.PARAM_SWLIVECONNECT = "swliveconnect";
method.super_onResize = method.onResize;
method.onResize = function (width, height) {
this.super_onResize(width, height);
var htmlInstance = this.getHtmlInstance();
if (htmlInstance) {
this.setStyle("width",width + "px", htmlInstance);
this.setStyle("height", height + "px", htmlInstance);
}
};
method.toHTML = function () {
var htmlStr = "";
if (this.isFSCEventsSupportEnabled) {
htmlStr += "<script type=\"text/javascript\">\n";
htmlStr += " function " + this.id +"_DoFSCommand(command, strArgs) {\n";
htmlStr += " NOF.Flash.MovieCollectionMgr.getCollection(" + this.owner.getId() + ").getMovieById('" + this.id + "').processFSCEvent(command, strArgs);";
htmlStr += "}\n";
htmlStr += "</script>\n";
}
htmlStr += '<EMBED TYPE="application/x-shockwave-flash"';
htmlStr += ' pluginspage="http://www.macromedia.com/go/getflashplayer"';
htmlStr += ' SRC="'+ this.movieSrc +'" WIDTH="'+ this.width +'" HEIGHT="'+ this.height +'" ID="'+ this.id + '" NAME="'+ this.id +'"';
htmlStr += ' ' + this.cssType + '="' + this.cssValue + '"';
for(var key in this.params) {
if ((key != "______array") && typeof this.params[key] != 'function') {
htmlStr += " " + key + '=' + this.params[key];
}
}
var flashVars = "";
if (this.capturedEventsMask) {
this.variables["nof_capturedEventsMask"] = this.capturedEventsMask;
}
this.variables["nof_objectID"] = this.id;
for(var key in this.variables) {
if ((key != "______array") && typeof this.variables[key] != 'function') {
flashVars = key + "=" + escape(this.variables[key]) + (flashVars.length == 0 ? "" : "&") + flashVars;
}
}
delete this.variables["nof_capturedEventsMask"];
delete this.variables["nof_objectID"];
if(flashVars.length > 0) {
htmlStr += ' FlashVars="'+ flashVars + '"';
}
htmlStr += '>';
htmlStr += '</EMBED>';
return htmlStr;
};
}
function isHostNetscapeCompatible() {return navigator.mimeTypes.length ? true : false;};
function isHostActiveXCompatible() { return window.ActiveXObject ? true : false; };
if (isHostActiveXCompatible()) {
NOF.Flash.HtmlCtrl = NOF_Flash_HtmlCtrl_IE;
} else {
NOF.Flash.HtmlCtrl = NOF_Flash_HtmlCtrl_NetscapeGeneric;
}
NOF.Flash.HtmlCtrl.PLATFORM_WINDOWS = "Windows";
NOF.Flash.HtmlCtrl.PLATFORM_MAC = "Mac";
NOF.Flash.HtmlCtrl.PLATFORM_UNKNOWN = "Unknown";
NOF.Flash.HtmlCtrl.getPlatform = function () {
if ((navigator.platform && navigator.platform.substring(0,3) == "Win")
|| navigator.appVersion.indexOf("Windows") != -1 ) {
return NOF.Flash.HtmlCtrl.PLATFORM_WINDOWS;
} else if ((navigator.platform && navigator.platform.substring(0,3) == "Mac")
|| navigator.appVersion.indexOf("Macintosh") != -1 ) {
return NOF.Flash.HtmlCtrl.PLATFORM_MAC;
}
return NOF.Flash.HtmlCtrl.PLATFORM_UNKNOWN;
};
NOF.Flash.HtmlCtrl.isHostNetscapeCompatible = isHostNetscapeCompatible;
NOF.Flash.HtmlCtrl.isHostActiveXCompatible = isHostActiveXCompatible;
NOF.Flash.HtmlCtrl.getCurrentPlayerVersion = function () {
if (NOF.Flash.HtmlCtrl.playerVersion == null) {
var playerVer = new NOF.ProgramVersion(0,0,0);
if(NOF.Flash.HtmlCtrl.isHostNetscapeCompatible() ) {
var plugin = navigator.plugins[member.NETSCAPE_PLUGIN_NAME];
if (plugin && plugin.description) {
var parts = plugin.description.replace(/([a-z]|[A-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split(".")
playerVer = new NOF.ProgramVersion(parts[0], parts[1], parts[2]);
}
} else if (NOF.Flash.HtmlCtrl.isHostActiveXCompatible()) {
try {
var player = new ActiveXObject(member.IE_PLUGIN_NAME);
var parts = player.GetVariable("$version").split(" ")[1].split(",");
playerVer = new NOF_ProgramVersion(parts[0], parts[1], parts[2]);
} catch (e) {}
}
NOF.Flash.HtmlCtrl.playerVersion = playerVer;
}
return NOF.Flash.HtmlCtrl.playerVersion;
};
NOF.Flash.HtmlCtrl.launchURL = function (args) {
var url = args[0];
var targetName = args[1];
var windowRef = null;
if (targetName == undefined || targetName == null || targetName == "") {
if ( document.getElementsByTagName )
{
var coll = document.getElementsByTagName('BASE');
if ( coll && coll.length && coll.length > 0 )
targetName = coll[0].target;
if ( targetName == undefined || targetName == "" )
windowRef = window;
}
}
if (windowRef == null) {
switch (targetName)
{
case undefined:
case null:
case "":
if ( document.getElementsByTagName )
{
var coll = document.getElementsByTagName('BASE');
if ( coll && coll.length && coll.length > 0 )
targetName = coll[0].target;
if ( targetName == undefined || targetName == "" )
windowRef = window;
}
if (windowRef != null)
break;
case "_self" :
windowRef = window;
break;
case "_parent" :
windowRef = parent;
break;
case "_top" :
windowRef = top;
break;
case "_blank" :
break;
default:
windowRef = NOF.Util.GetFrameWndByName(targetName);
break;
}
}
if (windowRef != null) {
windowRef.location.href = url;
} else {
window.open(url, targetName);
}
};
}
if(typeof NOF.Flash.MovieCollectionMgr == "undefined")
{
function NOF_Flash_MovieCollectionMgr() {
this.__proto__ = NOF_Flash_MovieCollectionMgr.prototype;
this.collections = new Array();
}
var method = NOF_Flash_MovieCollectionMgr.prototype;
method.createCollection = function() {
var coll = new NOF.Flash.MovieCollection(this.collections.length);
this.collections[this.collections.length] = coll;
return coll;
};
method.getCollection = function(index) {
return (index>=0 && index<this.collections.length) ? this.collections[index] : null;
};
NOF.Flash.__proto__.MovieCollectionMgr = new NOF_Flash_MovieCollectionMgr();
}
if(typeof NOF.Flash.MovieCollection == "undefined")
{
function NOF_Flash_MovieCollection (id) {
this.__proto__ = NOF_Flash_MovieCollection.prototype;
this.id = id;
this.movies = new Array();
this.moviesHash = new Array();
this.currentMovieIndex = 0;
}
var method = NOF_Flash_MovieCollection.prototype;
method.createMovie = function (id, src, width, height) {
var movie = new NOF.Flash.HtmlCtrl(id, src, width, height);
movie.setOwner(this);
this.movies[this.movies.length] = movie;
this.moviesHash[id] = movie;
return movie;
};
method.getId = function () {
return this.id;
}
method.getMovieById = function (id) {
return this.moviesHash[id];
}
method.getMovieByIndex = function (index) {
return (index>=0 && index<this.movies.length) ? this.movies[index] : null;
}
method.startAll = function () {
if (this.currentMovieIndex < this.movies.length) {
this.movies[this.currentMovieIndex++].play(this);
} else {
this.setZIndex();
}
};
method.resizeAll = function () {
var i=0;
while (i < this.movies.length) {
this.movies[i++].repaint();
}
this.setZIndex();
}
method.setZIndex = function () {
var maxTop = 0;
for (var i=0; i<this.movies.length; i++) {
var pos = this.movies[i].getPosition();
if (maxTop < pos.top) {maxTop = pos.top}
}
for (i=0;i<this.movies.length; i++) {
var pos = this.movies[i].getPosition();
this.movies[i].log("setZIndex to " + (-1 * (pos.top - maxTop)));
this.movies[i].setStyle("zIndex", -1 * (pos.top - maxTop));
}
};
method.callback_handler = function (eventName) {
if (eventName == 'PostInit') {
this.startAll();
}
};
NOF.Flash.__proto__.MovieCollection = NOF_Flash_MovieCollection;
}
if(typeof NOF.Flash.ComponentsMouseListener == "undefined")
{
function NOF_Flash_ComponentsMouseListener() {
this.__proto__ = NOF_Flash_ComponentsMouseListener.prototype;
}
var method = NOF_Flash_ComponentsMouseListener.prototype;
method.bubbleUp = function (event) {
var movId = event.getSource().getId();
var lyrObj = document.getElementById(movId + "LYR");
if (typeof(lyrObj) != 'undefined') {
switch (event.getType()) {
case NOF.Event.MOUSEDOWN_EVENT:
if (typeof(lyrObj.onMouseDown) == 'function') {
F_sndMsg(movId, F_MD, '');
}
break;
case NOF.Event.MOUSEUP_EVENT:
if (typeof(lyrObj.onMouseUp) == 'function') {
F_sndMsg(movId, F_MU, '');
}
break;
case NOF.Event.MOUSEMOVE_EVENT:
if (typeof(lyrObj.onMouseMove) == 'function') {
F_sndMsg(movId, F_MV, '');
}
break;
}
}
}
method.onMouseDown = function (event) {
this.bubbleUp(event);
}
method.onMouseMove = function(event) {
this.bubbleUp(event);
}
method.onMouseUp = function(event) {
this.bubbleUp(event);
}
method.onMouseRight = function(event) {
this.bubbleUp(event);
}
NOF.Flash.__proto__.ComponentsMouseListener = NOF_Flash_ComponentsMouseListener;
}

