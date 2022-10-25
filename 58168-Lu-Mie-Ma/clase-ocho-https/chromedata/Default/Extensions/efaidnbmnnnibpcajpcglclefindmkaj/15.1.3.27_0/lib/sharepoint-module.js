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
function dependOn(){"use strict";return[]}var def;require=function(t){"use strict";return t},def=window.define?window.define:function(t,n){"use strict";return n.apply(null,[{ajax:$.ajax.bind($)}])};var exports=acom_analytics={};def(dependOn(),(function(){"use strict";let t=null;t||(t=new function(){const t=new Set;this.setAllowListedSharePointUrls=function(t){t=t},this.isAllowListedSharePointUrlDomain=function(n){return t.has(n)},this.isAllowListedSharePointURL=function(t){try{const n=new URL(t);return this.isAllowListedSharePointUrlDomain(n.origin)}catch(t){return!1}},this.isFeatureEnabled=function(){return SETTINGS.SHAREPOINT_ENABLED},this.setFeatureEnabled=function(t){SETTINGS.SHAREPOINT_ENABLED=!!t},this.handleAllowedListFromNativeHost=function(n){if(n&&this.isFeatureEnabled()&&n.length>0&&n.length<5e3){n.split("|").forEach(n=>{if(n.length>0)try{const e=new URL(n);t.add(e.origin)}catch(t){}})}}});for(const n in t)t.hasOwnProperty(n)&&("function"==typeof t[n]?exports[n]=t[n].bind(t):exports[n]=t[n]);return t}));