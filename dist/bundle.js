!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";let n;r.r(t);new class{constructor(e){this.DOMMirror=document.querySelector(e),this.facingMode="user",this.constraints={audio:!1,video:{facingMode:this.facingMode}},n=this}getParameterByName(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var r=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return r?r[2]?decodeURIComponent(r[2].replace(/\+/g," ")):"":null}getMyUser(){return this.getParameterByName("my")}getFriendUser(){return this.getParameterByName("FriendUser")}site_session(){return this.getParameterByName("session")}askForPermision(){const e=this.getMyUser(),t=this.getFriendUser(),r=this.site_session();navigator.mediaDevices.getUserMedia(this.constraints).then((function(o){const i={userId:e,friendUser:t,session:r};n.DOMMirror.srcObject=o;const s=io.connect("http://localhost:8768");setInterval((function(){var e=new MediaRecorder(o);e.onstart=function(e){this.chunks=[]},e.ondataavailable=function(e){this.chunks.push(e.data)},e.onstop=function(e){var t=new Blob(this.chunks,{type:"video/x-matroska;codecs=avc1"});s.emit("sendStream",t)},e.start(),setTimeout((function(){e.stop()}),2e3)}),2e3),s.on("voice",(function(e){var t=new Blob([e],{type:"video/x-matroska;codecs=avc1"}),r=document.querySelector("#myMirror-1");r.src=window.URL.createObjectURL(t),r.play(),console.log(1)})),n.DOMMirror.onloadedmetadata=function(e){var t;t=o.id,i.sessionID=t,s.emit("sessionJoin",i)},n.DOMMirror.on}))}}("#myMirror").askForPermision()}]);