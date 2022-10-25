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
function dependOn(){"use strict";return[require("common"),require("util"),require("floodgate")]}var def;require=function(e){"use strict";return e},def=window.define?window.define:function(e,t){"use strict";return t.apply(null,[{ajax:$.ajax.bind($)}])};var exports=acom_analytics={};def(dependOn(),(function(e,t,a){var o;for(prop in o||(o=new function(){this.updateVariables=function(a){try{let o=0!=a&&1!=a,r=!(!o||a===SETTINGS.READER_VER||a===SETTINGS.ERP_READER_VER);localStorage.setItem("locale",t.getFrictionlessLocale(chrome.i18n.getMessage("@@ui_locale"))),localStorage.setItem("cdnUrl",e.getAcrobatViewerUri()),localStorage.setItem("isDeskTop",o),localStorage.setItem("env",e.getEnv()),localStorage.setItem("viewerImsClientId",e.getViewerIMSClientId()),localStorage.setItem("viewerImsClientIdSocial",e.getViewerIMSClientIdSocial()),localStorage.setItem("imsURL",e.getIMSurl()),localStorage.setItem("imsLibUrl",e.getImsLibUrl()),localStorage.setItem("dcApiUri",e.getDcApiUri()),localStorage.setItem("isAcrobat",r),this.checkDomainRollbackFlag({flag:"dc-cv-use-old-domain"}),this.checkFeatureEnable({flag:"dc-cv-modern-viewer",storageKey:"modernViewerEnable"}),this.checkFeatureEnable({flag:"dc-cv-dark-mode",storageKey:"darkModeEnable"}).then(e=>{localStorage.getItem("theme")&&!e?localStorage.removeItem("theme"):e&&!localStorage.getItem("theme")&&localStorage.setItem("theme","auto")}),this.checkFeatureEnable({flag:"dc-cv-read-aloud",storageKey:"isReadAloudEnable"})}catch(e){}},this.checkFeatureEnable=function(e){return a.hasFlag(e.flag).then(t=>(e.storageKey&&localStorage.setItem(e.storageKey,!!t),t))},this.checkDomainRollbackFlag=function(t){a.hasFlag(t.flag).then(t=>{e.setOldDomainRollback(!!t)})}}),o)o.hasOwnProperty(prop)&&("function"==typeof o[prop]?exports[prop]=o[prop].bind(o):exports[prop]=o[prop]);return o}));