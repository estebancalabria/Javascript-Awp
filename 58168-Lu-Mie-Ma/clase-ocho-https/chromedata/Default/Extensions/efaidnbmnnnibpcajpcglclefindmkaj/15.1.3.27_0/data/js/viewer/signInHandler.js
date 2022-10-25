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
!function(){let e;function n(e){const n={main_op:"analytics"};n.analytics=[[e]],chrome.runtime.sendMessage(n)}function i(){const i=util.getTabCookie("csrf"),o=signInUtil.parseCSRF(new URL(e));util.removeTabCookie("csrf");!i||!o||o!==i?(n("DCBrowserExt:Viewer:User:Error:NonMatchingCsrfToken:FailedToLogin"),signInUtil.sign_out(e)):function(){try{let i=e;if(i&&i.indexOf("#")>-1)if(i.indexOf("signIn=true")>-1){n("DCBrowserExt:Viewer:Ims:Sign:In:"+(util.getTabCookie("signInSource")?util.getTabCookie("signInSource"):"Unknown")+":Successful"),n("DCBrowserExt:Viewer:Ims:Sign:In:Successful"),util.removeTabCookie("signInSource")}else if(i.indexOf("signUp=true")>-1){n("DCBrowserExt:Viewer:Ims:Sign:Up:"+(util.getTabCookie("signUpSource")?util.getTabCookie("signUpSource"):"Unknown")+":Successful"),n("DCBrowserExt:Viewer:Ims:Sign:Up:Successful"),util.removeTabCookie("signUpSource")}let o=signInUtil.getSearchParamFromURL("mimePdfUrl",e),t=o&&decodeURIComponent(o);chrome.tabs.update({url:t})}catch(e){}}()}const o=()=>{chrome.tabs.query({active:!0,lastFocusedWindow:!0},(function(n){if(n[0]){e=n[0].url;if(!(e.indexOf("access_token")>-1)){let n=signInUtil.getSearchParamFromURL("mimePdfUrl",e),i=n&&decodeURIComponent(n);return void chrome.tabs.update({url:i})}i()}}))};chrome.tabs.query({active:!0,lastFocusedWindow:!0},(function(n){if(n[0])if(e=n[0].url,new URLSearchParams(new URL(e).search).get("socialSignIn")){const n=util.getTabCookie("idp_token");let i=function(e){let n=new URL(window.location.href),i=new URLSearchParams(new URL(window.location.href).search);return i.delete(e),n.search=i,n}("socialSignIn");e=i.href,signInUtil.socialSignIn(n,i),util.removeTabCookie("idp_token")}else o()}))}();