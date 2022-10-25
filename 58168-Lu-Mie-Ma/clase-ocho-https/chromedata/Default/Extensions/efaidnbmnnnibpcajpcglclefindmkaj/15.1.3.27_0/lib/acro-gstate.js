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
function dependOn(){"use strict";return[require("communicate"),require("proxy"),require("common"),require("util"),require("analytics")]}var def;require=function(e){"use strict";return e},def=window.define?window.define:function(e,t){"use strict";return t.apply(null,[{ajax:$.ajax.bind($)}])};var exports=acom_analytics={};def(dependOn(),(function(e,t,n,r,i){"use strict";var s,o=null;for(s in o||(o=new function(){this.proxy=t.proxy.bind(this),this.LOG=n.LOG,this.CONVERSION_TIMEOUT=2e5,this.web2pdfCaller={MENU:0,TOOLBAR:1,AUTO:2},this.web2pdfAction={CONVERT:0,APPEND:1},this.web2pdfContext={PAGE:0,LINK:1};this.getViewResultsPreferenceState=function(){return"false"!==r.getCookie("ViewResultsPref")},this.viewPrefIsDefault=function(){return!r.getCookie("ViewResultsPref")},this.savePreferences=function(t,r,s){let o=!0;try{if(void 0!==t.analytics_on&&(i.setAnalyticsUsage(t.analytics_on,r.tab.id),1==t.analytics_on&&i.event(i.e.OPTIONS_ENABLED_ANALYTICS)),SETTINGS.DEBUG_MODE&&t.environment&&(n.reset(t.environment),i.environment=t.environment,i.event(i.e.OPTIONS_SET_ENV)),SETTINGS.DEBUG_MODE&&t.product)switch(t.product){case"acrobat":e.setVersion(21);break;case"reader":e.setVersion(13);break;case"no-app":e.setVersion(0),SETTINGS.FILL_N_SIGN_ENABLED=!1}}catch(e){o=!1}s({success:o})},this.fetchPreferences=function(t,i,s){const o=chrome.i18n.getMessage("@@ui_locale");s({environment:n.getEnv(),version:e.version,settings:SETTINGS,locale:r.getFrictionlessLocale(o)})}},e.registerModule("acro-gstate",o)),o)o.hasOwnProperty(s)&&("function"==typeof o[s]?exports[s]=o[s].bind(o):exports[s]=o[s]);return e.registerHandlers({"save-preferences":o.proxy(o.savePreferences),"fetch-preferences":o.proxy(o.fetchPreferences)}),o}));