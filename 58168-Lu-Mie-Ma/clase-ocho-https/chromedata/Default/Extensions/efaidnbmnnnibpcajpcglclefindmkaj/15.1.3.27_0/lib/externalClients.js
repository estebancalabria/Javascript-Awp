/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2015 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by all applicable intellectual property laws,
* including trade secret and or copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/
function dependOn(){"use strict";return[require("communicate"),require("util"),require("privateApi")]}var def;require=function(e){"use strict";return e},def=window.define?window.define:function(e,t){"use strict";return t.apply(null,[{ajax:$.ajax.bind($)}])};var exports=acom_analytics={};def(dependOn(),(function(e,t,r){function s(){let e;return t.getCookie("pdfViewer")?"true"===t.getCookie("pdfViewer")?e="enabled":"false"===t.getCookie("pdfViewer")&&(e="disabled"):e="neverEnabled",e}chrome.extension.onMessageExternal.addListener((function(a,i,c){"use strict";if(/^https:\/\/([a-zA-Z\d-]+\.){0,}(adobe|acrobat)\.com(:[0-9]*)?$/.test(i.origin))if("WebRequest"===a.type)switch(a.task){case"detect_extension":c({status:"success",result:"true"});break;case"detect_desktop":try{if(0!=e.version&&1!=e.version){c(e.version===SETTINGS.READER_VER||e.version===SETTINGS.ERP_READER_VER?{status:"success",result:"Reader"}:{status:"success",result:"Acrobat"})}else c({status:"success",result:"NoApp"})}catch(e){c({status:"error",code:"error"})}break;case"detect_viewer_enabled":try{c({status:"success",result:s()})}catch(e){c({status:"error",code:"error"})}break;case"enable_viewer":if(!/^https:\/\/((dev|stage)+\.){0,}acrobat\.adobe\.com?$/.test(i.origin)&&!i.origin.includes("local-test.acrobat.com:11010"))return;try{t.setCookie("pdfViewer","true"),r.setViewerState("enabled"),c({status:"success"})}catch(e){c({status:"error",code:"error"})}break;default:c({status:"error",code:"invalid_task"})}else c({status:"error",code:"invalid_type"})}))}));