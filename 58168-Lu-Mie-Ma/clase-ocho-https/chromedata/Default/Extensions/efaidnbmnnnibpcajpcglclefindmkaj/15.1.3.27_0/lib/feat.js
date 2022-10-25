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
var communicate=require("communicate");chrome.extension.onMessageExternal.addListener((function(e,t,a){"use strict";if("Automation"!==e.type)return;if("bngnhmnppadfcmpggglniifohlkmddfc"!==t.id)return;SETTINGS.TEST_MODE=!0;let o=void 0;const n="to_html",c="to_append",r="doAcrobat",s="check_toggle_state",i="update_toggle_state",l=0,u=1,m=2,d=5,h=7,g=8,p=9,b=10;switch(e.task){case l:o=n;break;case u:o=c;break;case m:o=r;break;case d:!function(){let t=chrome.i18n.getMessage("@@ui_locale");e.locale&&(t=e.locale);const a=chrome.runtime.getURL("data/data/"+t+"/searchterms.json");fetch(a).then(e=>{if(e.status>=200&&e.status<=299)return e.json();throw Error(analytics.e.GOOGLE_SEARCHTERM_FETCH_ERROR)}).then(t=>{if(e&&e.data){let a={},o=communicate.getModule("googlequeryanalyzer");for(let n=0;n<e.data.length;++n){const c=o.findAction(t,e.data[n]);a[e.data[n]]=c}const n=JSON.stringify(a),c=new Blob([n],{type:"text/plain;charset=UTF-8"}),r=window.URL.createObjectURL(c);chrome.downloads.download({url:r,filename:"output.json"})}}).catch(e=>{const t=JSON.stringify(e),a=new Blob([t],{type:"text/plain;charset=UTF-8"}),o=window.URL.createObjectURL(a);chrome.downloads.download({url:o,filename:"output.json"})})}();break;case h:o=s;break;case g:o=i;break;case p:chrome.runtime.openOptionsPage(e=>{chrome.runtime.lastError?a({error:chrome.runtime.lastError,success:!1}):a({success:!0})});break;case b:chrome.tabs.query({active:!0},(function(e){e.length>0&&e[0].url.startsWith("chrome-extension://")&&chrome.tabs.remove(e[0].id),a({success:!0})}))}o&&chrome.tabs.sendMessage(communicate.activeTab(),{panel_op:"test",test_extension:o,outputPath:e.path,openPDF:e.openPDF,toggleId:e.toggleId,toggleVal:e.toggleVal},a)}));