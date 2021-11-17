(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[947],{16894:function(H,A,e){"use strict";var T=e(94237),C=e(5403);A.ZP=C.Z},69176:function(H,A,e){"use strict";var T=e(34792),C=e(48086),E=e(11849),R=e(3182),W=e(94043),U=e.n(W),g=e(67294),b=e(71975),I=e(15196),L=e(5966),c=e(64317),D=e(31199),y=e(45510),B=e(90672),h=e(57895),K=e(21010),Z=e(64172),t=e(85893),p={recordID:"",name:"",sex:0,state:"",treatID:"",remark:"",diseaseRemark:"",reason:"",info:"",createTime:new Date().getTime(),strokeTime:new Date().getTime(),prevHemorrhage:0,highBloodPressure:0,diabetes:0,fibrillation:0,prevStroke:0,warfarin:0},S=function(P){var F=P.title,j=F===void 0?"":F,x=P.trigger,a=P.defaultData,r=a===void 0?p:a,s=P.finishCallback,n=s===void 0?function(){}:s,_=(0,g.useRef)(),o=(0,K.YB)(),l=(0,g.useCallback)(function(){var v=(0,R.Z)(U().mark(function d(u){var i,M,O;return U().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return i=o.formatMessage({id:"message.error.addPatient",defaultMessage:"\u63D0\u4EA4\u4FE1\u606F\u9519\u8BEF\uFF01"}),M=o.formatMessage({id:"message.success.addPatient",defaultMessage:"\u63D0\u4EA4\u4FE1\u606F\u6210\u529F\uFF01"}),f.prev=2,f.next=5,(0,Z.b$)((0,E.Z)({},u));case 5:O=f.sent,O.data.status==="success"?(C.default.success(M),typeof n=="function"&&n()):C.default.error(i),f.next=12;break;case 9:f.prev=9,f.t0=f.catch(2),C.default.error(i);case 12:return f.abrupt("return",!0);case 13:case"end":return f.stop()}},d,null,[[2,9]])}));return function(d){return v.apply(this,arguments)}}(),[]);return(0,t.jsxs)(b.Z,{title:j,formRef:_,trigger:x,drawerProps:{forceRender:!0,destroyOnClose:!0,maskClosable:!1},initialValues:(0,E.Z)({},r),onFinish:l,children:[(0,t.jsx)(h.ZP,{title:"\u4E2A\u4EBA\u4FE1\u606F",bordered:!0,headerBordered:!0,collapsible:!0,style:{marginBottom:16,minWidth:800,maxWidth:"100%"},children:(0,t.jsxs)(I.ZP.Group,{children:[(0,t.jsx)(L.Z,{name:"recordID",width:"md",label:"\u75C5\u6848\u53F7",placeholder:"\u8BF7\u8F93\u5165\u75C5\u6848\u53F7",rules:[{required:!0}]}),(0,t.jsx)(L.Z,{name:"treatID",width:"md",label:"\u6EB6\u6813\u6CBB\u7597\u7F16\u53F7",placeholder:"\u8BF7\u8F93\u5165\u6EB6\u6813\u6CBB\u7597\u7F16\u53F7"}),(0,t.jsx)(L.Z,{name:"name",width:"md",label:"\u60A3\u8005\u59D3\u540D",placeholder:"\u8BF7\u8F93\u5165\u60A3\u8005\u59D3\u540D",rules:[{required:!0}]}),(0,t.jsx)(c.Z,{name:"sex",width:"md",label:"\u60A3\u8005\u6027\u522B",placeholder:"\u8BF7\u8F93\u5165\u60A3\u8005\u6027\u522B",options:[{label:"\u7537",value:0},{label:"\u5973",value:1}]}),(0,t.jsx)(D.Z,{name:"age",precision:0,width:"md",label:"\u60A3\u8005\u5E74\u9F84",placeholder:"\u8BF7\u8F93\u5165\u60A3\u8005\u5E74\u9F84"}),(0,t.jsx)(y.Z,{name:"createTime",width:"md",label:"\u5C31\u8BCA\u65F6\u95F4",rules:[{required:!0}]}),(0,t.jsx)(y.Z,{name:"strokeTime",width:"md",label:"\u53D1\u75C5\u65F6\u95F4",rules:[{required:!0}]}),(0,t.jsx)(c.Z,{name:"diabetes",width:"md",label:"\u7CD6\u5C3F\u75C5",options:[{label:"\u5426",value:0},{label:"\u662F",value:1}]}),(0,t.jsx)(c.Z,{name:"fibrillation",width:"md",label:"\u623F\u98A4",options:[{label:"\u5426",value:0},{label:"\u662F",value:1}]}),(0,t.jsx)(c.Z,{name:"highBloodPressure",width:"md",label:"\u9AD8\u8840\u538B",options:[{label:"\u5426",value:0},{label:"\u662F",value:1}]}),(0,t.jsx)(B.Z,{name:"remark",width:"lg",label:"\u4E2A\u4EBA\u4FE1\u606F\u5907\u6CE8",placeholder:"\u8BF7\u8F93\u5165\u4E2A\u4EBA\u4FE1\u606F\u5907\u6CE8"})]})}),(0,t.jsx)(h.ZP,{title:"\u75BE\u75C5\u4FE1\u606F",bordered:!0,headerBordered:!0,collapsible:!0,style:{marginBottom:16,minWidth:800,maxWidth:"100%"},children:(0,t.jsxs)(I.ZP.Group,{children:[(0,t.jsx)(B.Z,{name:"reason",width:"lg",label:"\u4E3B\u8BC9",placeholder:"\u8BF7\u8F93\u5165\u4E3B\u8BC9",rules:[{required:!0}]}),(0,t.jsx)(B.Z,{name:"info",width:"lg",label:"\u8BCA\u65AD\u7ED3\u8BBA",placeholder:"\u8BF7\u8F93\u5165\u8BCA\u65AD\u7ED3\u8BBA"}),(0,t.jsx)(c.Z,{name:"state",width:"md",label:"\u8111\u635F\u4F24\u9636\u6BB5",options:[{label:"0-6\u5C0F\u65F6",value:1},{label:"6-24\u5C0F\u65F6",value:2},{label:"24\u5C0F\u65F6-2\u5468",value:3},{label:"\u5927\u4E8E2\u5468",value:4}]}),(0,t.jsx)(c.Z,{name:"prevHemorrhage",width:"md",label:"\u65E2\u5F80\u8111\u51FA\u8840",options:[{label:"\u5426",value:0},{label:"\u662F",value:1}]}),(0,t.jsx)(c.Z,{name:"prevStroke",width:"md",label:"\u65E2\u5F80\u5352\u4E2D",options:[{label:"\u5426",value:0},{label:"\u662F",value:1}]}),(0,t.jsx)(c.Z,{name:"warfarin",width:"md",label:"\u670D\u7528\u534E\u6CD5\u6797",options:[{label:"\u5426",value:0},{label:"\u662F",value:1}]}),(0,t.jsx)(D.Z,{name:"T",width:"md",label:"T(\u2103)",rules:[{required:!0}]}),(0,t.jsx)(D.Z,{name:"P",width:"md",label:"P(min)",rules:[{required:!0}]}),(0,t.jsx)(D.Z,{name:"R",width:"md",label:"R(min)",rules:[{required:!0}]}),(0,t.jsx)(D.Z,{name:"systolicPressure",width:"md",label:"\u6025\u8BCA\u6536\u7F29\u538B(mmHg)",rules:[{required:!0}]}),(0,t.jsx)(B.Z,{name:"diseaseRemark",width:"lg",label:"\u75BE\u75C5\u4FE1\u606F\u5907\u6CE8",placeholder:"\u8BF7\u8F93\u5165\u75BE\u75C5\u4FE1\u606F\u5907\u6CE8"})]})})]})};A.Z=S},96267:function(H,A,e){"use strict";e.r(A);var T=e(57663),C=e(71577),E=e(34792),R=e(48086),W=e(3182),U=e(49111),g=e(19650),b=e(2824),I=e(94043),L=e.n(I),c=e(67294),D=e(67265),y=e(21010),B=e(16894),h=e(64172),K=e(69176),Z=e(49101),t=e(73727),p=e(85893),S=function(){var P=(0,c.useState)([]),F=(0,b.Z)(P,2),j=F[0],x=F[1],a=(0,y.tT)("patient"),r=a.setPatientID,s=a.setCurrentPatient,n=(0,c.useRef)(),_=(0,y.YB)(),o=[{title:"\u59D3\u540D",dataIndex:"name",copyable:!0,width:100,fixed:"left",key:"name"},{title:"\u75C5\u4EBA\u7F16\u53F7",dataIndex:"id",key:"id",width:80,ellipsis:!1,copyable:!0},{title:"\u75C5\u6848\u53F7",dataIndex:"recordID",key:"recordID",ellipsis:!1,copyable:!0},{title:"\u6027\u522B",dataIndex:"sex",key:"sex",initialValue:"all",onFilter:!0,filters:!0,valueType:"select",valueEnum:{all:{text:"\u5168\u90E8",status:"Default"},0:{text:"\u7537",status:"Processing"},1:{text:"\u5973",status:"Warning"}}},{title:"\u5E74\u9F84",dataIndex:"age",key:"age"},{title:"\u8111\u635F\u4F24\u9636\u6BB5",dataIndex:"state",key:"state",ellipsis:!1,onFilter:!0,filters:!0,valueType:"select",initialValue:"all",valueEnum:{all:{text:"\u5168\u90E8",status:"Default"},1:{text:"0-6\u5C0F\u65F6",status:"Error"},2:{text:"6-24\u5C0F\u65F6",status:"Success"},3:{text:"24\u5C0F\u65F6-2\u5468",status:"Processing"},4:{text:"\u5927\u4E8E2\u5468",status:"Default"}}},{title:"\u8D1F\u8D23\u533B\u5E08",dataIndex:"doctor",key:"doctor",ellipsis:!1},{title:"\u53D1\u75C5\u65E5\u671F",dataIndex:"strokeTime",key:"strokeTime",ellipsis:!1,hideInSearch:!0,valueType:"date"},{title:"\u5C31\u8BCA\u65F6\u95F4",dataIndex:"createTime",key:"createTime",ellipsis:!1,sorter:function(u,i){return u.createTime-i.createTime},hideInSearch:!0,valueType:"date"},{title:"\u66F4\u65B0\u65F6\u95F4",dataIndex:"updateTime",key:"updateTime",ellipsis:!1,sorter:function(u,i){return u.updateTime-i.updateTime},hideInSearch:!0,valueType:"date"},{title:"\u64CD\u4F5C",dataIndex:"id",key:"action",fixed:"right",width:120,align:"center",render:function(u,i){return(0,p.jsxs)(g.Z,{onClick:function(O){r(u),s(i)},children:[(0,p.jsx)(t.OL,{to:"manage/message",children:"\u8BE6\u60C5"}),(0,p.jsx)(t.OL,{to:"manage/predict",children:"\u9884\u6D4B"}),(0,p.jsx)(t.OL,{to:"manage/image",children:"\u8BB0\u5F55"})]})}}],l=(0,c.useCallback)((0,W.Z)(L().mark(function d(){var u,i,M;return L().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:return m.prev=0,m.next=3,(0,h.Eg)();case 3:if(u=m.sent,i=u.data.status,i!=="success"){m.next=8;break}return x(u.data.data.patientList),m.abrupt("return");case 8:R.default.error(u.data.msg),x([]),m.next=17;break;case 12:m.prev=12,m.t0=m.catch(0),x([]),M=_.formatMessage({id:"app.error.network",defaultMessage:"\u7F51\u7EDC\u8FDE\u63A5\u9519\u8BEF\uFF01"}),R.default.error(M);case 17:case"end":return m.stop()}},d,null,[[0,12]])})),[]),v=(0,c.useCallback)(function(){console.log("\u70B9\u51FB\u5237\u65B0\u6309\u94AE"),l()},[]);return(0,c.useEffect)(function(){l()},[]),(0,p.jsx)(D.ZP,{fixedHeader:!0,children:(0,p.jsx)(B.ZP,{scroll:{x:1200},columns:o,actionRef:n,dataSource:j,rowKey:"id",search:!1,pagination:{pageSize:5},dateFormatter:"string",toolBarRender:function(){return[(0,p.jsx)(K.Z,{finishCallback:v,title:"\u65B0\u5EFA\u75C5\u60A3\u8BB0\u5F55",trigger:(0,p.jsxs)(C.Z,{type:"primary",children:[(0,p.jsx)(Z.Z,{}),"\u65B0\u5EFA"]})},"add")]},options:{show:!0,density:!1,fullScreen:!0,setting:!0,reload:v}})})};A.default=S},73727:function(H,A,e){"use strict";e.d(A,{rU:function(){return t},OL:function(){return j}});var T=e(51615),C=e(41788),E=e(67294),R=e(97175),W=e(45697),U=e.n(W),g=e(22122),b=e(19756),I=e(2177),L=function(a){(0,C.Z)(r,a);function r(){for(var n,_=arguments.length,o=new Array(_),l=0;l<_;l++)o[l]=arguments[l];return n=a.call.apply(a,[this].concat(o))||this,n.history=(0,R.lX)(n.props),n}var s=r.prototype;return s.render=function(){return E.createElement(T.F0,{history:this.history,children:this.props.children})},r}(E.Component),c=function(a){(0,C.Z)(r,a);function r(){for(var n,_=arguments.length,o=new Array(_),l=0;l<_;l++)o[l]=arguments[l];return n=a.call.apply(a,[this].concat(o))||this,n.history=(0,R.q_)(n.props),n}var s=r.prototype;return s.render=function(){return E.createElement(T.F0,{history:this.history,children:this.props.children})},r}(E.Component),D=function(r,s){return typeof r=="function"?r(s):r},y=function(r,s){return typeof r=="string"?(0,R.ob)(r,null,null,s):r},B=function(r){return r},h=E.forwardRef;typeof h=="undefined"&&(h=B);function K(a){return!!(a.metaKey||a.altKey||a.ctrlKey||a.shiftKey)}var Z=h(function(a,r){var s=a.innerRef,n=a.navigate,_=a.onClick,o=(0,b.Z)(a,["innerRef","navigate","onClick"]),l=o.target,v=(0,g.Z)({},o,{onClick:function(u){try{_&&_(u)}catch(i){throw u.preventDefault(),i}!u.defaultPrevented&&u.button===0&&(!l||l==="_self")&&!K(u)&&(u.preventDefault(),n())}});return B!==h?v.ref=r||s:v.ref=s,E.createElement("a",v)}),t=h(function(a,r){var s=a.component,n=s===void 0?Z:s,_=a.replace,o=a.to,l=a.innerRef,v=(0,b.Z)(a,["component","replace","to","innerRef"]);return E.createElement(T.s6.Consumer,null,function(d){d||(0,I.Z)(!1);var u=d.history,i=y(D(o,d.location),d.location),M=i?u.createHref(i):"",O=(0,g.Z)({},v,{href:M,navigate:function(){var f=D(o,d.location),N=_?u.replace:u.push;N(f)}});return B!==h?O.ref=r||l:O.innerRef=l,E.createElement(n,O)})});if(!1)var p,S;var w=function(r){return r},P=E.forwardRef;typeof P=="undefined"&&(P=w);function F(){for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return r.filter(function(n){return n}).join(" ")}var j=P(function(a,r){var s=a["aria-current"],n=s===void 0?"page":s,_=a.activeClassName,o=_===void 0?"active":_,l=a.activeStyle,v=a.className,d=a.exact,u=a.isActive,i=a.location,M=a.sensitive,O=a.strict,m=a.style,f=a.to,N=a.innerRef,k=(0,b.Z)(a,["aria-current","activeClassName","activeStyle","className","exact","isActive","location","sensitive","strict","style","to","innerRef"]);return E.createElement(T.s6.Consumer,null,function(V){V||(0,I.Z)(!1);var $=i||V.location,X=y(D(f,$),$),Y=X.pathname,J=Y&&Y.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1"),Q=J?(0,T.LX)($.pathname,{path:J,exact:d,sensitive:M,strict:O}):null,G=!!(u?u(Q,$):Q),q=G?F(v,o):v,ee=G?(0,g.Z)({},m,{},l):m,z=(0,g.Z)({"aria-current":G&&n||null,className:q,style:ee,to:X},k);return w!==P?z.ref=r||N:z.innerRef=N,E.createElement(t,z)})});if(!1)var x}}]);
