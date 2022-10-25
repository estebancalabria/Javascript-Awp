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
function dependOn(){"use strict";return[require("communicate"),require("common"),require("util"),require("proxy"),require("analytics"),require("feat"),require("googlequeryanalyzer"),require("frictionless-handler"),require("floodgate"),require("externalClients"),require("privateApi"),require("user-subscription"),require("viewer-module")]}var def;require=function(e){"use strict";return e},def=window.define?window.define:function(e,t){"use strict";return t.apply(null,[{ajax:$.ajax.bind($)}])};var exports=acom_analytics={};def(dependOn(),(function(e,t,i,o,n,a,s,r,l,p,d,c){"use strict";var u,m,f,h,g=null;for(m in f=function(){return e.getModule("upload")},h=function(){return e.getModule("session")},u=function(){this.proxy=o.proxy.bind(this),this.LOG=t.LOG,this.uploadHandler=function(e){var o=["application/illustrator","image/bmp","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/vnd.adobe.form.fillsign","image/gif","application/x-indesign","image/jpeg","image/jpeg","application/vnd.oasis.opendocument.formula","application/vnd.oasis.opendocument.graphics","application/vnd.oasis.opendocument.presentation","application/vnd.oasis.opendocument.spreadsheet","application/vnd.oasis.opendocument.text","image/png","application/vnd.ms-powerpoint","application/vnd.openxmlformats-officedocument.presentationml.presentation","application/mspowerpoint","application/postscript","image/vnd.adobe.photoshop","application/vnd.ms-publisher","application/x-tika-msoffice","text/rtf","application/vnd.sun.xml.writer.template","application/vnd.sun.xml.draw","application/vnd.sun.xml.calc","application/vnd.sun.xml.impress","application/vnd.sun.xml.writer","text/plain","image/tiff","image/tiff","text/plain","application/vnd.ms-excel","application/msexcel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/zip"],a=e.request;e.id&&(a.assetId=e.id,i.ajax({url:t.settings.files_api+"assets/"+e.id+"/metadata",type:"GET",headers:t.GET_headers()}).done(this.proxy((function(t){if(delete a.create_path,delete a.export_path,delete a.form_path,delete a.preview_path,a.preview_path="file/"+e.id,a.send_path="send/file/"+e.id,a.fillsign=!1,n.event(n.e.UPLOAD_COMPLETE),"application/pdf"===t.content_type&&(a.export_path="exportpdf/"+e.id,a.fillsign=!0),-1!==o.indexOf(t.content_type)&&(a.create_path="convertpdf/"+e.id,a.fillsign=!1),"fillsign"===a.handleResult)delete a.handleResult,this.fill_sign(a);else if(a.handleResult){i.consoleLog("handleResult: "+a.handleResult);var s={preview:a.preview_path,image_preview:a.preview_path,export:a.export_path,send:a.send_path,to_pdf:a.create_path}[a.handleResult];n.event(n.e.REDIRECT),delete a.handleResult,h().gotoPath(s)}}))))},this.do_upload=function(e,t){var i={"upload-image":n.e.CONTEXT_UPLOAD_IMAGE,upload_link:n.e.CONTEXT_UPLOAD_LINK,upload:n.e.CONTEXT_UPLOAD_PDF_PAGE}[e.menuItem];i&&(n.event(i),delete e.menuItem),f().upload(e).done(this.proxy(this.uploadHandler))},this.sign_out=function(e,t){h().signOut()},this.dismiss=function(e,t){i.consoleLog("dismiss/ok")},this.specialCases=SETTINGS.USE_FLICKR?[{regex:/http[s]:\/\/www\.flickr\.com/,action:"flickr",lastPromptTime:null}]:[],this.handleSpecialUrl=function(t,o){var n=!1;return i.each(this.specialCases,(function(a,s){if(s.regex.test(t)){var r=!0,l=(new Date).getTime();s.lastPromptTime&&l-s.lastPromptTime<1e4&&(r=!1),r&&(s.lastPromptTime=l,i.consoleLog("INVITE: "+l),e.deferMessage({panel_op:s.action,tabId:o})),n=!0}})),n},this.fill_sign=function(e,a,s){(e.userSelectPromise||i.Deferred().resolve().promise()).then(this.proxy((function(){i.consoleLog("fill and sign");var a={url:t.settings.fillsign_api+"createform",contentType:"application/json",accept:t.GET_headers().Accept,type:"POST",dataType:"json",xhrFields:{withCredentials:!0},headers:t.POST_headers()};a.data=JSON.stringify({asset_id:e.assetId}),h().message("Preparing for Fill and Sign",!0),n.event(n.e.CREATE_FORM_PROGRESS_SHOWN),i.ajax(a).then(this.proxy((function(t){i.consoleLog("form created"),i.consoleLogDir(t),e.form_path="fillsign/"+t.form_id,n.event(n.e.CREATE_FORM_COMPLETE),n.event(n.e.REDIRECT),h().gotoPath(e.form_path),s&&s("OP_SUCCESS")})),this.proxy((function(e){return i.consoleLog("form create failed"),o.REST_error(e,this),s&&s("OP_FAILURE"),e})))})))},this.newTab=function(i,o,a){var s=chrome.runtime.getURL("data/js/options.html");if(SETTINGS.CHROME_VERSION<SETTINGS.SUPPORTED_VERSION)return chrome.browserAction.setIcon({path:"data/images/acrobat_dc_appicon_24.png",tabId:o}),void chrome.browserAction.enable(o);0!==i.indexOf(t.settings.redirect_uri+"?code=")?i.includes(s)?n.event(n.e.OPTIONS_PAGE):(h().checkSessionTab(o,i),e.avoidUrl(i)?e.disable(o):g.handleSpecialUrl(i,o)||e.loaded(o)):h().foundCode(i)},this.startup=function(t,o){if(this.started||(this.newTab(t.url,o.tab.id,t.is_pdf?"application/pdf":"text/html"),d.isMimeHandlerAvailable().then(e=>{e&&fetch("https://acrobat.adobe.com/proxy/chrome-viewer/index.html",{method:"GET"}).then(e=>{if(200!==e.status&&window.navigator.onLine)d.setViewerState("disabled"),localStorage.setItem("cdnFailure","true"),chrome.tabs.reload(),n.event(n.e.VIEWER_FALLBACK_TO_NATIVE_CDN_OFFLINE);else if("true"===localStorage.getItem("cdnFailure")){localStorage.setItem("cdnFailure","false");const e="true"===localStorage.getItem("pdfViewer")?"enabled":"disabled";d.setViewerState(e),chrome.tabs.reload()}}).catch(e=>{})}),this.started=!0),t.is_pdf&&(e.setIsPDF(o.tab.id,!0),l.getReleaseVariant("dc-cv-pdf-fte-experiments").then(e=>{t.fteFeatureFlag=e}).finally(()=>e.pdf_menu(t,o))),i.showFrictionlessMenu(t)&&(t.show_frictionless=!0,null==e.getCookieStatus())){let e={tabId:o.tab.id,content_op:"check_cookie_settings"};i.sendMessage(e)}if(t.startup_time){r.startNewInteraction(t.tabId).startup_time=t.startup_time}if(SETTINGS.FRICTIONLESS_ENABLED&&(SETTINGS.TEST_MODE||t.show_frictionless)&&"false"!==i.getCookie("always-show-pdftools")&&1!=t.suppress_frictionless&&s&&s.isGoogleQuery(t)){const e=s.getSearchQuery(t);e&&s.mapQueryStringToAction(e,t)}}},g||(g=new u,e.registerModule("download-manager",g)),g)g.hasOwnProperty(m)&&("function"==typeof g[m]?exports[m]=g[m].bind(g):exports[m]=g[m]);return e.registerHandlers({do_upload:g.proxy(g.do_upload),dismiss:g.proxy(g.dismiss),ok:g.proxy(g.dismiss),fillsign:g.proxy(g.fill_sign),"sign-out":g.proxy(g.sign_out),"html-startup":g.proxy(g.startup),"pdf-menu":g.proxy(g.startup)}),i.isChrome()&&chrome.tabs.onUpdated.addListener(g.proxy((function(t,i,o){"complete"===i.status?g.newTab(o.url,t):"loading"===i.status&&e.loading({id:t})}))),i.isFF()&&(g.proxy((function(){var t=require("chrome").Cu,o=t.import("resource://gre/modules/Downloads.jsm").Downloads,n=t.import("resource://gre/modules/Task.jsm").Task,a={onDownloadAdded:function(t){if(i.consoleLog("Added",t),i.consoleLog("Added Content type: "+t.contentType),!e.avoidUrl(t.source.url)){var o={filename:t.target.path.replace(/\S*(\\|\/)/,""),url:t.source.url,panel_op:"pdf_menu"};e.deferMessage(o)}}};n.spawn((function(){try{o.getList(o.ALL).then((function(e){i.consoleLogDir(e),e.addView(a)}))}catch(e){i.consoleError(e)}}))}))(),require("sdk/tabs").on("ready",(function(e){e.url;g.newTab(e.url,e.id,e.contentType)})),require("chrome").Cu.import("resource://gre/modules/Services.jsm")),d.isMimeHandlerAvailable().then(e=>{e?c.startUserPolling():c.stopUserPolling()}),g}));