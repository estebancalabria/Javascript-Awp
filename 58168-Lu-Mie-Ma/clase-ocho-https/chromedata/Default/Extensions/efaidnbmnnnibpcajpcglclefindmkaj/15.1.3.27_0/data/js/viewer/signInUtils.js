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
var signInUtil={imsURL:util.getCookie("imsURL"),c_id:util.getCookie("viewerImsClientId"),SCOPES:["AdobeID","openid","DCAPI","sign_user_read","sign_user_write","sign_user_login","sign_library_read","sign_library_write","agreement_send","agreement_read","agreement_write","ab.manage","additional_info.account_type","sao.ACOM_ESIGN_TRIAL","widget_read","widget_write","workflow_read","workflow_write"],socialSignIn:function(e,t){const i=util.uuid();t.hash=t.hash+"signIn=true";const n={idp_flow:"social.native",provider_id:"google",idp_token:e,client_id:signInUtil.c_id,state:JSON.stringify(Object.assign({},window.adobeid&&window.adobeid.api_parameters&&window.adobeid.api_parameters.authorize&&window.adobeid.api_parameters.authorize.state,{ac:util.isEdge()?"adobe.com_acrobatextension_edge_login":"adobe.com_acrobatextension_chrome_login",csrf:i})),scope:signInUtil.SCOPES.join(","),response_type:"token",redirect_uri:t,device_id:i};util.setTabCookie("csrf",i);const r=new URL(signInUtil.imsURL+"/ims/authorize/v1"),a=window.document,o=a.getElementById("google-yolo-authorize-form");o.setAttribute("action",r),Object.entries(n).forEach(([e,t])=>{const i=a.createElement("input");i.setAttribute("type","hidden"),i.setAttribute("id",e),i.setAttribute("name",e),i.setAttribute("value",t),o.appendChild(i)}),o.submit()},getSearchParamFromURL:function(e,t){const i=new URL(t);return new URLSearchParams(i.search).get(e)},parseCSRF:function(e){if(e.href.indexOf("signInError")>-1)try{const t=decodeURIComponent(e.href.split("#")[1]);return new URLSearchParams(t).get("state")}catch(e){return null}else{let t=new URLSearchParams(decodeURIComponent(e.hash).substr(1)).get("state");t||(t=new URLSearchParams(decodeURIComponent(e.search)).get("state"));try{const{csrf:e}=JSON.parse(t);return e}catch(e){return null}}},sign_out:function(e){const t=new URL(signInUtil.imsURL+"/ims/logout/v1?");t.searchParams.append("client_id",signInUtil.c_id),e&&e.indexOf("#")>-1&&(e=e.split("#")[0]),t.searchParams.append("redirect_uri",e),chrome.tabs.update({url:t.href,active:!0})}};