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
!function(){let e,t,i,n,r,a,o,s,l,c,d,u,g,p,m,f;const h=chrome.extension.getURL("viewer.html"),w=chrome.extension.getURL("signInHandler.html"),C=["https:","http:","file:"],b=e=>{if(!e)return!1;try{const t=new URL(e),i=t.protocol;let n=-1!==C.indexOf(i);return n="file:"===i?t.pathname.toLowerCase().endsWith(".pdf"):n,n}catch(e){return!1}};function y(e){const t=util.getTabCookie("search");return new URLSearchParams(t).get(e)}function k(e,t){p?(m=m||1,e.tabId=m,e.mimeHandled=!0,chrome.runtime.sendMessage(e,t)):chrome.runtime.sendMessage(e,t)}function _(e,t){return new URLSearchParams(e).get(t)||""}function v(t=!1){if(p)try{t||k({main_op:"viewer-type",viewer:"mime-native"}),setTimeout(()=>{privateApi.reloadWithNativeViewer({contentLength:parseInt(e)||0})},100)}catch(e){I("DCBrowserExt:Viewer:FallbackToNative:MimeHandler:Failed")}else try{setTimeout(()=>{chrome.tabs.getCurrent((function(e){util.setCookie("reloadurl-"+e.id,n),window.location.href=n}))},500)}catch(e){I("DCBrowserExt:Viewer:FallbackToNative:Failed")}}const E=e=>{try{const t=new URL(util.getCookie("cdnUrl")),i=[/^https:\/\/([a-zA-Z\d-]+\.){0,}(adobe|acrobat)\.com(:[0-9]*)?$/];return e===t.origin&&!!i.find(t=>t.test(e))}catch(e){return!1}};function I(e){const t={main_op:"analytics"};t.analytics=[[e]],k(t)}function S(){let e,t=h;return p?(e="?mimePdfUrl="+encodeURIComponent(n),t=w):(e=util.getTabCookie("search"),e||(e="?pdfurl="+n)),new URL(t+e)}const D=["AdobeID","openid","DCAPI","sign_user_read","sign_user_write","sign_user_login","sign_library_read","sign_library_write","agreement_send","agreement_read","agreement_write","ab.manage","additional_info.account_type","sao.ACOM_ESIGN_TRIAL","widget_read","widget_write","workflow_read","workflow_write"],L=util.getCookie("viewerImsClientId"),T=util.getCookie("viewerImsClientIdSocial"),R=util.getCookie("imsURL");function x(e={}){const t=new URL(R+"/ims/authorize/v1?"),i=S(),n=util.uuid(),r={csrf:n};e.sign_up?(t.searchParams.append("idp_flow","create_account"),i.hash=i.hash+"signUp=true"):i.hash=i.hash+"signIn=true",util.setTabCookie("csrf",n),t.searchParams.append("response_type","token"),t.searchParams.append("client_id",L),t.searchParams.append("redirect_uri",i),t.searchParams.append("scope",D.join(",")),t.searchParams.append("locale",util.getCookie("locale")),t.searchParams.append("state",JSON.stringify(r)),chrome.tabs.update({url:t.href,active:!0})}function U(){let e;e=p?S().href:window.location.href,signInUtil.sign_out(e)}function P(e){let t=new URL(w);return t.searchParams.append("socialSignIn","true"),t.searchParams.append("mimePdfUrl",encodeURIComponent(n)),util.setTabCookie("idp_token",e),t.href}const B={isSharePointURL:!1,isSharePointFeatureEnabled:!1,isFrictionlessEnabled:!0,featureFlags:[],isFillAndSignRegisteryEnabled:!1};class F{constructor(e){this.iframeElement=void 0,this.parentDiv=e}createIframe=e=>{const t=window.document,i=t.createElement("iframe");i.setAttribute("src",e),i.setAttribute("id","dc-view-frame"),i.setAttribute("allowfullscreen","allowfullscreen"),i.style.width="100vw",i.style.height="100vh",i.style.border="none",i.style.overflow="hidden",this.parentDiv.appendChild(i),this.iframeElement=t.getElementById("dc-view-frame")};_sendMessage=(e,t)=>{this.iframeElement&&E(t)&&function(e){var t=Date.now();return new Promise((function i(n,o){a&&(r||p)?n(r||p):e&&Date.now()-t>=e?o(new Error("timeout")):setTimeout(i.bind(this,n,o),30)}))}(1e6).then(i=>i&&this.iframeElement.contentWindow.postMessage(e,t))};sendNativeConfigs=e=>{this._sendMessage({type:"nativeConfigs",nativeConfigs:B},e)};sendFileMetaData=(e,t,i,n,r,a,o,s)=>{this._sendMessage({fileUrl:r,fileName:a,fileSize:i,acceptRanges:n,handShakeTime:t,type:e,isFrictionlessEnabled:B.isFrictionlessEnabled,isReloadOrBackForward:s},o)};sendRecentUrl=(e,t,i,n=!1)=>{this._sendMessage({type:"RecentUrls",permission:e,showOverlay:n,recentUrls:t},i)};sendProgress=(e,t,i,n)=>{this._sendMessage({total:t,loaded:i,type:e},n)};sendInitialBuffer=(e,t,i,n,r)=>{this._sendMessage({type:e,downLoadstartTime:t,downLoadEndTime:i,buffer:n},r)};sendBufferRanges=(e,t,i,n)=>{this._sendMessage({type:e,range:t,buffer:i},n)};preview=(e,t,i,n,r,a,o)=>{this._sendMessage({fileSize:i,type:e,fileBuffer:t,fileName:n,downLoadstartTime:r,downLoadEndTime:a},o)};openInAcrobatResponse=(e,t,i)=>{this._sendMessage({type:e,res:t},i)};postLog=(e,t,i,n,r)=>{this._sendMessage({type:e,reqId:t,message:i,error:n},r)}}function V(e,i){try{d=void 0!==d?d:"false"!==util.getCookie("logAnalytics")&&"false"!==util.getCookie("ANALYTICS_OPT_IN"),d&&(l&&t?l.postLog("log",c,e,i,t.origin):setTimeout(()=>{l&&t&&l.postLog("log",c,e,i,t.origin)},500))}catch(e){}}function A(){let e;return e=p?n:window.location.href,e}function M(e,t,i,n,r){r&&e.forEach(e=>{i.has(e)&&t.searchParams.append(e,i.get(e))}),n&&e.forEach(e=>{util.getCookie(e)&&t.searchParams.append(e,util.getCookie(e))})}const O=()=>{try{!function(){const e=A();if(e.indexOf("access_token")>-1){const t=util.getTabCookie("csrf"),i=signInUtil.parseCSRF(new URL(e));util.removeTabCookie("csrf");(!t||!i||i!==t)&&(I("DCBrowserExt:Viewer:User:Error:NonMatchingCsrfToken:FailedToLogin"),U())}}(),function(){try{let e=A();if(e&&e.indexOf("#")>-1){if(e.indexOf("signIn=true")>-1){I("DCBrowserExt:Viewer:Ims:Sign:In:"+(util.getTabCookie("signInSource")?util.getTabCookie("signInSource"):"Unknown")+":Successful"),I("DCBrowserExt:Viewer:Ims:Sign:In:Successful"),util.removeTabCookie("signInSource")}else if(e.indexOf("signUp=true")>-1){I("DCBrowserExt:Viewer:Ims:Sign:Up:"+(util.getTabCookie("signUpSource")?util.getTabCookie("signUpSource"):"Unknown")+":Successful"),I("DCBrowserExt:Viewer:Ims:Sign:Up:Successful"),util.removeTabCookie("signUpSource")}e=e.split("#")[0],p?n=e:window.location.href=e}}catch(e){}}();const i=window.document.getElementById("Adobe-dc-view");p||(e=y("clen")||-1),l=new F(i);const r=(()=>{try{const e=util.getCookie("cdnUrl"),i=new URL(e);if(!E(i.origin))return V("Invalid CDN URL detected","Invalid Origin"),void v();t||(t=i);let r=util.getCookie("viewer-locale");r||(r=util.getCookie("locale"));const a="false"!==util.getCookie("logAnalytics"),o="false"!==util.getCookie("ANALYTICS_OPT_IN"),s="true"===util.getCookie("betaOptOut");i.searchParams.append("locale",r),i.searchParams.append("logAnalytics",a&&o),i.searchParams.append("callingApp",chrome.runtime.id),i.searchParams.append("betaOptOut",s);const l=util.getCookie("installType")||"update";i.searchParams.append("version",`${chrome.runtime.getManifest().version}:${l}`),"false"===util.getCookie("staticFteCoachmarkShown")&&i.searchParams.append("showFTECoachmark","true"),"true"===y("googlePrint")&&"false"!==util.getTabCookie("googleAppsPrint")&&i.searchParams.append("googleAppsPrint","true");const c=["dropin!","provider!","app!"],d=["analytics","logToConsole","enableLogging","frictionless","sessionId","linearization"],u=["isReadAloudEnable","isModernViewerEnable","isDeskTop","isAcrobat","theme"];util.getCookie("env");let g;g=p?new URLSearchParams(new URL(n).search):new URLSearchParams(window.location.search),M(d,i,g,!1,!0),M(u,i,g,!0,!1);let m=i.href;return c.forEach(e=>{g.forEach((t,i)=>{i.startsWith(e)&&(m=m+"&"+i+"="+t)})}),m}catch(e){I("DCBrowserExt:Viewer:Iframe:Creation:Failed"),v()}})();l.createIframe(r),window.addEventListener("message",e=>{!e.data||!E(e.origin)||o||"hsready"!==e.data.type&&"ready"!==e.data.type||(o=!0,s=(new Date).getTime(),c=e.data.requestId,"on"===e.data.killSwitch?(I("DCBrowserExt:Viewer:KillSwitch:Turned:On"),util.setCookie("pdfViewer",!1),privateApi.setViewerState("disabled"),util.setCookie("killSwitch","on"),p?v(!0):setTimeout(()=>{window.location.href=n},200)):util.getCookie("killSwitch")&&(I("DCBrowserExt:Viewer:KillSwitch:Turned:Off"),util.removeCookie("killSwitch")))})}catch(e){V("Error create Iframe",e)}};function z(e){if(i)return i;let t=e;try{const i=e.split("?")[0].split("/").filter(e=>e.length>0),n=i.length>0?i[i.length-1]:"untitled";t=n;const r=n.length-4;(n.length<4||n.toLowerCase().indexOf(".pdf")!==r)&&(t+=".pdf")}catch(e){V("Error in getFileNameFromURL",e)}return t}function H(t,i){return new Promise((n,r)=>{const a=(new Date).getTime(),o=new XMLHttpRequest;o.open("GET",t.url),o.responseType="arraybuffer",o.setRequestHeader("Range",`bytes=${i.start}-${i.end}`),o.onload=()=>{if(4===o.readyState&&206===o.status)n({buffer:o.response,startTime:a,endTime:(new Date).getTime()});else if(200===o.status){const t={status:o.status,statusText:o.statusText,fileSize:e,rangeBufferSize:o.response.byteLength,range:i};r({message:"Unexpected response to get file buffer range",error:t})}else{const t={status:o.status,statusText:o.statusText,fileSize:e,range:i};r({message:"Invalid response to get file buffer ranger",error:t})}},o.onerror=e=>{r({message:"Error to get file buffer range",error:e})},o.ontimeout=e=>{r({message:"Timeout to get file buffer range due to timeout",error:e})},o.send()})}function N(e,t){"PDF"===function(e){if(e)try{var t=new URL(e).pathname;return t.substr(t.lastIndexOf(".")+1).toUpperCase()}catch(e){return""}return""}(e)&&(r=!0);const i=new XMLHttpRequest;i.open("GET",e),i.responseType="arraybuffer",i.onreadystatechange=function(){4===i.readyState&&(200!==i.status&&0!=i.status||t({buffer:i.response,mimeType:i.getResponseHeader("content-type")}))},i.send(null)}function $(t,i,a){return new Promise((o,s)=>{const l=n;if(l.startsWith("file://"))return void N(l,o);const c=new XMLHttpRequest;var d;c.open("GET",l),c.responseType="arraybuffer",i&&c.setRequestHeader("If-Range","randomrange"),c.onreadystatechange=(d=c,function(e){if(this.readyState==this.HEADERS_RECEIVED){if(!function(e,t){const i=e.getResponseHeader("content-type"),n=e.getResponseHeader("content-disposition");if(i){const e=i.toLowerCase().split(";",1)[0].trim();if(n&&/^\s*attachment[;]?/i.test(n))return!1;if("application/pdf"===e)return!0;if("application/octet-stream"===e&&n&&/\.pdf(["']|$)/i.test(n))return!0}return!1}(d))return V("Fall back to native - not pdf from headers"),v();r=!0}}),c.onprogress=function(t,i){return function(n){n.lengthComputable&&(e=n.total,t.sendProgress("progress",n.total,n.loaded,i))}}(t,a),c.onload=()=>{if(c.status>=200&&c.status<400)o({buffer:c.response,mimeType:c.getResponseHeader("content-type"),downLoadEndTime:(new Date).getTime()});else{const e={status:c.status,statusText:c.statusText};s({message:"Invalid response fetching content",error:e})}},c.onerror=e=>{s({message:"Error to download file contents",error:e})},c.ontimeout=e=>{s({message:"Timeout to download file contents",error:e})},c.send()})}function W(e,t,i=!1){p?chrome.storage.local.get("recentFilesData",(function(n){if(n.recentFilesData&&n.recentFilesData.isSyncedWithHistory){const r=n.recentFilesData.recentFilesPath?[...n.recentFilesData.recentFilesPath]:[],a=[];for(let e=r.length-1;e>=0;e--)a.push({...r[e],chromeHistory:!0,url:`chrome-extension://${chrome.runtime.id}/viewer.html?pdfurl=${r[e].url}`,mimeUrl:r[e].url});e.sendRecentUrl(!0,a,t,i)}})):chrome.history.search({text:chrome.extension.getURL("viewer.html"),startTime:0,maxResults:1e3},(function(n){const r=n.filter(e=>e.url.startsWith(chrome.extension.getURL("viewer.html"))),a=[];for(let e=0;e<r.length;++e){const{url:t,title:i}=r[e],{lastVisitTime:n}=r[e];a.push({filename:i,url:t,lastVisited:n,chromeHistory:!0})}e.sendRecentUrl(!0,a,t,i)}))}function q(e,i){switch(i.data.main_op){case"open_in_acrobat":case"fillsign":!function(e,t){const i={main_op:"open_in_acrobat"};if("fillsign"===t.data.main_op&&(i.paramName="FillnSign"),i.url=t.data.url,i.click_context="pdfviewer",i.timeStamp=Date.now(),t.data.fileBuffer){const e=new Blob([t.data.fileBuffer],{type:"application/pdf"});i.dataURL=URL.createObjectURL(e)}f=function(i){"fillsign"===t.data.main_op?e.openInAcrobatResponse("FILLSIGN_IN_DESKTOP_APP",i,t.origin):e.openInAcrobatResponse("OPEN_IN_DESKTOP_APP",i,t.origin),V(`Open In Acrobat - (${t.data.main_op}) response- ${i}`)},"true"===util.getCookie("isSharepointFeatureEnabled")?B.isSharePointURL?(i.workflow_name="SharePoint",i.isSharePointURL=!0,k(i,f)):util.checkForSharePointURL(i.url,e=>{i.isSharePointURL=e,i.isSharePointURL&&(i.workflow_name="SharePoint"),k(i,f)}):k(i,f)}(e,i);break;case"complete_conversion":I("DCBrowserExt:Viewer:Verbs:Conversion:Redirection"),function(e){const t={};t.main_op=e.data.main_op,t.conversion_url=decodeURIComponent(e.data.conversion_url),t.timeStamp=Date.now(),k(t)}(i);break;case"updateLocale":I("DCBrowserExt:Viewer:User:Locale:Updated"),util.setCookie("viewer-locale",i.data.locale),chrome.tabs.reload();break;case"setInitialLocale":let a=!1;util.getCookie("viewer-locale")||(a=!0,util.setCookie("viewer-locale",i.data.locale),I("DCBrowserExt:Viewer:User:Locale:Initial")),i.data.reloadReq&&a&&chrome.tabs.reload();break;case"error-sign-in":!function(e){const t=util.uuid();util.setTabCookie("csrf",t);const i=new URL(e),n=S();n.hash=n.hash+`state=${t}&signInError=true`,i.searchParams.set("redirect_uri",n),chrome.tabs.update({url:i.href,active:!0})}(i.data.url);break;case"deleteViewerLocale":util.getCookie("viewer-locale")&&(util.removeCookie("viewer-locale"),chrome.tabs.reload());break;case"signin":I("DCBrowserExt:Viewer:Ims:Sign:In"),util.setTabCookie("signInSource",i.data.source),I("DCBrowserExt:Viewer:Ims:Sign:In:"+i.data.source),x();break;case"googleSignIn":I("DCBrowserExt:Viewer:Ims:Sign:In"),I("DCBrowserExt:Viewer:Ims:Sign:In:"+i.data.source),util.setTabCookie("signInSource",i.data.source),function(){const e=util.uuid(),t=S();t.hash=t.hash+"signIn=true";const i=new URL(R+"/ims/authorize/v1"),n={ac:util.isEdge()?"adobe.com_acrobatextension_edge_login":"adobe.com_acrobatextension_chrome_login",csrf:e};util.setTabCookie("csrf",e),i.searchParams.append("response_type","token"),i.searchParams.append("idp_flow","social.deep_link.web"),i.searchParams.append("client_id",T),i.searchParams.append("provider_id","google"),i.searchParams.append("redirect_uri",t),i.searchParams.append("scope",D.join(",")),i.searchParams.append("locale",util.getCookie("locale")),i.searchParams.append("state",JSON.stringify(n)),i.searchParams.append("xApiClientId",T),i.searchParams.append("xApiClientLocation ","google"),chrome.tabs.update({url:i.href,active:!0})}();break;case"signup":I("DCBrowserExt:Viewer:Ims:Sign:Up"),util.setTabCookie("signUpSource",i.data.source),I("DCBrowserExt:Viewer:Ims:Sign:Up:"+i.data.source),x({sign_up:!0});break;case"fetchLocalRecents":const o=new URL(util.getCookie("cdnUrl")).origin;chrome.permissions.contains({permissions:["history"],origins:["https://www.google.com/"]},e=>{if(i.data.fetchRecents){const t=i.data.showOverlay;e?W(l,o,t):(I("DCBrowserExt:Permissions:History:DialogTriggered"),chrome.permissions.request({permissions:["history"],origins:["https://www.google.com/"]},e=>{e?(I("DCBrowserExt:Permissions:History:Granted"),W(l,o,t)):(I("DCBrowserExt:Permissions:History:Denied"),l.sendRecentUrl(!1,null,o))}))}else e?l.sendRecentUrl(!0,null,o):l.sendRecentUrl(!1,null,o)});break;case"socialSignIn":I("DCBrowserExt:Viewer:Ims:Sign:In"),I("DCBrowserExt:Viewer:Ims:Sign:In:"+i.data.source),util.setTabCookie("signInSource",i.data.source),r=i.data.idp_token,p?chrome.tabs.update({url:P(r),active:!0}):signInUtil.socialSignIn(r,S());break;case"openRecentFileLink":const s={};s.main_op=i.data.main_op,s.recent_file_url=decodeURIComponent(i.data.recent_file_url),k(s);break;case"userSubscriptionData":if(p){const e={};e.eventType=i.data.main_op,e.userSubscriptionData=i.data.userSubscriptionData,e.data=i.data,e.main_op=i.data.main_op;k(e,(function(e){"showUninstallPopUp"===e.main_op&&l._sendMessage({type:"showUninstallPopUp"},t.origin)}))}break;case"uninstall":chrome.runtime.setUninstallURL(n),util.removeCookie("userEligibleForUninstall"),setTimeout(()=>{I("DCBrowserExt:UninstallDialog:Uninstalled:Successful"),chrome.management.uninstallSelf()},500);break;case"openAcrobatOptions":chrome.runtime.openOptionsPage(),I("DCBrowserExt:Viewer:ManagePref:clicked:"+i.data.source)}var r}function G(e){try{const i=new TextDecoder("utf-8").decode(e.buffer);let n=!1;-1!=i.indexOf("Linearized 1")?(n=!0,I("DCBrowserExt:Viewer:Linearization:Linearized:Version:1")):-1!=i.indexOf("Linearized")?I("DCBrowserExt:Viewer:Linearization:Linearized:Version:Other"):I("DCBrowserExt:Viewer:Linearization:Linearized:False"),l._sendMessage({type:"Linearization",linearized:n},t.origin)}catch(e){I("DCBrowserExt:Viewer:Linearization:Linearized:Detection:Failed"),V("Linearization Detection failed",e)}}class j{constructor(){this.request={main_op:"analytics"}}analytics=e=>{this.request.analytics||(this.request.analytics=[]),this.request.analytics.push([e])};sendAnalytics=()=>{k(this.request)}}function J(r,o,c,d){return m=>{try{if(m.data&&m.origin&&E(m.origin)&&(e=>{try{return e&&e.source&&e.source.top.location.origin==="chrome-extension://"+chrome.runtime.id}catch(e){return!1}})(m)){if(m.data.main_op)return q(r,m);switch(m.data.type){case"ready":p?function(t,r,o,c){var d=new j;a=!0;const u=n,g="true"===util.getCookie("isReload"),p="true"===util.getCookie("isBackForward"),m=g||p;g&&(u.startsWith("file://")?d.analytics("DCBrowserExt:Viewer:Processing:LocalPDFFile:Reload"):d.analytics("DCBrowserExt:Viewer:PDFOpenedinMimeViewer:Reload")),document.title=i;const f=c.responseHeaders["Accept-Ranges"],h=!(!f||"bytes"!==f.toLowerCase())&&"true";t.sendFileMetaData("metadata",s,c.responseHeaders["Content-Length"],h,u,i,r.origin,m),o?(d.analytics("DCBrowserExt:Viewer:Linearization:Range:Supported"),o.then(e=>{t.sendInitialBuffer("initialBuffer",e.startTime,e.endTime,e.buffer,r.origin),G(e)}).catch(e=>{t.sendInitialBuffer("initialBuffer",0,0,-1,r.origin),d.analytics("DCBrowserExt:Viewer:Error:Linearization:InitialBufiled")})):d.analytics("DCBrowserExt:Viewer:Linearization:Range:Not:Supported"),util.removeCookie("isReload"),util.removeCookie("isBackForward");const w=window.performance&&window.performance.timing&&window.performance.timing.navigationStart;fetch(c.streamUrl).then(e=>{let i=0;return new Response(new ReadableStream({start(n){const a=e.body.getReader();!function e(){a.read().then(({done:a,value:o})=>{a?n.close():(i+=o.byteLength,t.sendProgress("progress",c.responseHeaders["Content-Length"],i,r.origin),n.enqueue(o),e())}).catch(e=>{n.error(e)})}()}}))}).then(e=>e.arrayBuffer()).then(n=>{e=n.byteLength,t.preview("preview",n,n.byteLength,i,w,(new Date).getTime(),r.origin),l._sendMessage({type:"NavigationStartTime",time:window.performance&&window.performance.timing&&window.performance.timing.navigationStart},r.origin)}).catch(e=>(d.analytics("DCBrowserExt:Viewer:Error:FallbackToNative:Mimehandler:FileDownload:Failed"),v())),d.sendAnalytics(),V("Viewer loaded")}(r,m,c,o):function(r,o,c,d,u){a=!0;const g=n,p=y("chunk")||"false",m=window.performance.getEntriesByType("navigation").map(e=>e.type).includes("reload"),f=window.performance.getEntriesByType("navigation").map(e=>e.type).includes("back_forward");r.sendFileMetaData("metadata",s,e,p,encodeURI(g),i,o.origin,m||f),c?(I("DCBrowserExt:Viewer:Linearization:Range:Supported"),c.then(e=>{r.sendInitialBuffer("initialBuffer",e.startTime,e.endTime,e.buffer,o.origin),G(e)}).catch(e=>{r.sendInitialBuffer("initialBuffer",0,0,-1,o.origin),I("DCBrowserExt:Viewer:Error:Linearization:InitialBuffer:Failed")})):(I("DCBrowserExt:Viewer:Linearization:Range:Not:Supported"),r.sendInitialBuffer("initialBuffer",0,0,-1,o.origin)),d.then(n=>{const a=n.downLoadEndTime,s=n.buffer;n.buffer.byteLength;r.preview("preview",s,e,i,u,a,o.origin),l._sendMessage({type:"NavigationStartTime",time:window.performance&&window.performance.timing&&window.performance.timing.navigationStart},t.origin)}).catch(e=>(I("DCBrowserExt:Viewer:Error:FallbackToNative:FileDownload:Failed"),v())),V("Viewer loaded")}(r,m,c,o,d);break;case"getFileBufferRange":!function(e,t){H({url:n},e.data.range).then(i=>{g||(I("DCBrowserExt:Viewer:Linearization:Range:Called"),g=!0),t.sendBufferRanges("bufferRanges",`${e.data.range.start}-${e.data.range.end}`,i.buffer,e.origin)}).catch(i=>{I("DCBrowserExt:Viewer:Error:Linearization:Range:Failed"),t.sendBufferRanges("bufferRanges",`${e.data.range.start}-${e.data.range.end}`,-1,e.origin)})}(m,r);break;case"previewFailed":u||(I(p?"DCBrowserExt:Viewer:Error:FallbackToNative:Mimehandler:Preview:Failed":"DCBrowserExt:Viewer:Error:FallbackToNative:Preview:Failed"),u=!0,v());break;case"signin":I("DCBrowserExt:Viewer:Ims:Sign:In"),x();break;case"signout":I("DCBrowserExt:Viewer:Ims:Sign:Out"),util.removeCookie("viewer-locale"),util.removeCookie("userDetailsFetchedTimeStamp"),util.removeCookie("discoveryExpiryTime"),util.removeCookie("viewer-locale"),U();break;case"coachMarkClosed":util.setCookie("staticFteCoachmarkShown","true"),I("DCBrowserExt:Staticpdf:fte:CoachMark:Closed");break;case"coachmarkManageSettings":chrome.runtime.openOptionsPage(),util.setCookie("staticFteCoachmarkShown","true"),I("DCBrowserExt:Staticpdf:fte:CoachMark:ManageSettings:clicked");break;case"coachMarkDisplayed":util.setCookie("staticFteCoachmarkShown","true"),I("DCBrowserExt:Staticpdf:fte:CoachMark:Shown");break;case"googleAppsPrintShown":util.setTabCookie("googleAppsPrint","false"),I("DCBrowserExt:Viewer:GoogleApps:Print:Shown");break;case"signInExperimentShown":chrome.tabs.query({active:!0,currentWindow:!0},(function(e){const t=e[0],i=(new Date).getTime();util.setCookie("signInExperimentShown",JSON.stringify({currTabId:t.id,timestamp:i}))}));break;case"signInExperimentClosed":case"signInExperimentSkipped":util.setCookie("signInExperimentSuppressed","true");break;case"enableBeta":util.setCookie("betaOptOut",!1),chrome.tabs.reload();break;case"disableBeta":util.setCookie("betaOptOut",!0),chrome.tabs.reload()}}}catch(e){I("DCBrowserExt:Viewer:Error:MessageHandler:Unknown")}}}function K(){if(!o)return I(p?"DCBrowserExt:Viewer:Error:Mimehandler:Handshake:TimedOut":"DCBrowserExt:Viewer:Error:Handshake:TimedOut"),v(),!1}const X=r=>{try{const a=r.responseHeaders["Content-Length"];e=a;const o=r.responseHeaders["Accept-Ranges"],s=o&&"bytes"===o.toLowerCase();n=r.originalUrl,O(),i=function(e){let t;const i=e.responseHeaders["Content-Disposition"];if(i&&/\.pdf(["']|$)/i.test(i)){const e=/filename[^;=\n\*]?=((['"]).*?\2|[^;\n]*)/.exec(i);null!=e&&e.length>1&&(t=e[1].replace(/['"]/g,""))}return t||(t=z(n)),decodeURIComponent(t)}(r);const c={url:n},d=new URL(util.getCookie("cdnUrl"));t||(t=d);let u=null;const g="false"!==y("linearization");g&&s&&a>0&&(u=H(c,{start:0,end:1024})),window.addEventListener("message",J(l,r,u)),Y(),setTimeout(K,25e3)}catch(e){V("InitMimeHandlerScript failed",e),v()}};function Y(){window.addEventListener("storage",(function(e){"theme"===e.key&&l._sendMessage({type:"themeChange",theme:util.getCookie("theme")},t.origin)})),k({main_op:"viewer-startup",url:n,startup_time:Date.now(),viewer:!0},e=>{B.isSharePointURL=!!e.isSharePointURL,B.isSharePointFeatureEnabled=!!e.isSharePointEnabled,B.isFrictionlessEnabled=!!e.isFrictionlessEnabled,B.featureFlags=e.featureFlags,B.isFillAndSignRegisteryEnabled=e.isFillnSignEnabled,l.sendNativeConfigs(t.origin)}),k({main_op:"get-features&groups",cachePurge:"LAZY"},e=>{l._sendMessage({type:"featureGroups",featureGroups:e.featureGroups,featureFlags:e.featureFlags},t.origin)}),p&&(m&&chrome.storage.local.get("loadedTabsInfo",(function(e){var t;e.loadedTabsInfo&&e.loadedTabsInfo.tabsInfo?(t=e.loadedTabsInfo.tabsInfo).includes(m)||t.push(m):t=[m],chrome.storage.local.set({loadedTabsInfo:{tabsInfo:t}})})),chrome.storage.local.get("recentFilesData",(function(e){if(e.recentFilesData&&e.recentFilesData.isSyncedWithHistory){const t=e.recentFilesData.recentFilesPath?[...e.recentFilesData.recentFilesPath]:[];1e3===t.length&&t.shift(),t.push({url:n,filename:i,lastVisited:Date.now()}),chrome.storage.local.set({recentFilesData:{recentFilesPath:t,isSyncedWithHistory:!0}})}else chrome.history.search({text:chrome.extension.getURL("viewer.html"),startTime:0,maxResults:999},(function(e){const t=e.filter(e=>e.url.startsWith(chrome.extension.getURL("viewer.html"))),r=[];for(let e=t.length-1;e>=0;e--){const{url:i,title:n,lastVisitTime:a}=t[e];let o=i;const s=i.split("viewer.html");s[1]&&(o=_(s[1],"pdfurl"),r.push({url:o,filename:n,lastVisited:a}))}r.push({url:n,filename:i,lastVisited:Date.now()}),chrome.storage.local.set({recentFilesData:{recentFilesPath:r,isSyncedWithHistory:!0}})}))})))}function Z(e){const t=document.getElementById("__acrobatDialog__");t&&0!==t.length?t&&"none"===t.style.display&&"visible"===e.frame_visibility?t.style.display="block":t&&e.trefoilClick&&(delete e.trefoilClick,t.remove()):function(e){const t=e.base64PDF;delete e.base64PDF;const i="message="+encodeURIComponent(JSON.stringify(e));e.base64PDF=t;const n=null===e.locale;let r=e.version>13||n?"210px":"130px",a="block";"hidden"===e.frame_visibility&&(a="none");const o=document.createElement("iframe");o.setAttribute("src",`${chrome.extension.getURL("data/js/frame.html")}?${i}`),o.setAttribute("id","__acrobatDialog__"),o.style.border="0px",o.style.zIndex="999999999999",o.style.position="fixed",o.style.top="-5px",o.style.right="80px",o.style.width="294px",o.style.height=r,o.style.display=a,o.style.margin="auto",document.getElementById("trefoil_m").appendChild(o)}(e)}function Q(e){if(e.panel_op&&(1==e.trefoilClick?(delete e.trefoilUI,delete e.newUI,Z(e)):!0===e.reload_in_native&&(delete e.is_viewer,chrome.tabs.reload(e.tabId))),"relay_to_content"!==e.main_op||"dismiss"!==e.content_op)return"reset"===e.main_op?l._sendMessage({type:"toggleAnalytics",logAnalytics:e.analytics_on},t.origin):"showUninstallPopUp"===e.main_op&&l._sendMessage({type:"showUninstallPopUp"},t.origin),!1;{delete e.content_op,delete e.trefoilClick,delete e.reload_in_native;let t=document.getElementById("__acrobatDialog__");t&&(t.remove(),t=null)}}document.addEventListener("DOMContentLoaded",function(e){const t=(new Date).getTime();var i=window.setInterval((function(){(function(){const e=document.getElementById("dc-view-frame");return e&&e.contentWindow&&1===e.contentWindow.length}()||(new Date).getTime()-t>15e3)&&(window.clearInterval(i),e.call(this))}),200)}((function(){const e=document.getElementById("dc-view-frame");e&&e.contentWindow&&e.contentWindow.focus()}))),void 0!==chrome.runtime&&privateApi.isMimeHandlerAvailable().then((async function(e){if(chrome.runtime.onMessage.addListener(Q),e){if(p=!0,!window.navigator.onLine)return void v();const e=await privateApi.getStreamInfo()||{};m=e.tabId,k({main_op:"viewer-preview",startup_time:Date.now(),viewer:!0},()=>X(e))}else!function(){if(n=_(document.location.search,"pdfurl"),!b(n))return void(r=!1);const e=util.getTabCookie("search");(!e||_(e,"pdfurl")!==n||e.length<document.location.search)&&util.setTabCookie("search",document.location.search),i=_(document.location.search,"pdffilename")||_(e,"pdffilename")||z(n),document.title=i;const t="/"+n+location.hash;history.replaceState({},i,t)}(),(()=>{try{if(!b(n))return void(r=!1);O();const e=y("clen")||-1,a=y("chunk")||!1,o="false"!==y("linearization"),s={url:n},c=(new Date).getTime(),d=new URL(util.getCookie("cdnUrl"));i=y("pdffilename")||z(n),document.title=decodeURIComponent(i),t||(t=d);let u=null;const g=o&&a&&e>0;g&&(u=H(s,{start:0,end:1024}));const p=$(l,g,d.origin);window.addEventListener("message",J(l,p,u,c)),setTimeout(K,25e3)}catch(e){V("InitScript failed",e),v()}})(),Y()}))}();