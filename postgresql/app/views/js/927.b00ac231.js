"use strict";(self["webpackChunkvue_3_typescript"]=self["webpackChunkvue_3_typescript"]||[]).push([[927],{20602:function(e,s,t){var n=t(15166);class o{getAll(){return n.Z.get("/assessments")}get(e){return n.Z.get(`/assessments/${e}`)}getAssessmentsByModule(e){return n.Z.get(`/assessments/?moduleId=${e}`)}create(e){return n.Z.post("/assessments",e)}update(e,s){return n.Z.put(`/assessments/${e}`,s)}delete(e){return n.Z["delete"](`/assessments/${e}`)}}s["Z"]=new o},11656:function(e,s,t){var n=t(15166);class o{getAll(){return n.Z.get("/modules")}get(e){return n.Z.get(`/modules/${e}`)}create(e){return n.Z.post("/modules",e)}update(e,s){return n.Z.put(`/modules/${e}`,s)}delete(e){return n.Z["delete"](`/modules/${e}`)}}s["Z"]=new o},22070:function(e,s,t){t.r(s),t.d(s,{default:function(){return H}});var n=t(73396),o=t(87139),i=t(49242);const l=e=>((0,n.dD)("data-v-487f09fa"),e=e(),(0,n.Cn)(),e),r={class:"report-window"},a={class:"heading"},d={class:"title-container icon-centered"},u={class:"title"},c={class:"record-text"},m={class:"record-title"},f={class:"icon-centered"},h={style:{color:"rgb(170, 170, 170)"},href:"/home"},v={class:"main-page"},p={class:"table-container"},y={class:"input-box"},w={disabled:"",value:""},g=l((()=>(0,n._)("option",{value:""},"All",-1))),Z=["value"],b={class:"result-count"};function _(e,s,t,l,_,k){const C=(0,n.up)("LoadingScreen"),D=(0,n.up)("mdicon"),I=(0,n.up)("RecordTable");return(0,n.wg)(),(0,n.iD)(n.HY,null,[e.isLoading?((0,n.wg)(),(0,n.j4)(C,{key:0})):(0,n.kq)("",!0),(0,n._)("div",r,[(0,n._)("div",a,[(0,n._)("div",d,[(0,n._)("div",u,[(0,n.Wm)(D,{size:48,class:"icon icon-centered report-icon",name:"fileDocumentOutline"}),(0,n._)("div",c,[(0,n._)("div",m,(0,o.zw)(e.$t("assessments.assessments")),1)])])]),(0,n._)("span",f,[(0,n._)("a",h,[(0,n.Wm)(D,{size:36,class:"report-icon",name:"close"})])])]),(0,n._)("div",v,[(0,n._)("div",p,[(0,n._)("div",y,[(0,n.wy)((0,n._)("input",{type:"text",class:"form-control",placeholder:"Search","onUpdate:modelValue":s[0]||(s[0]=s=>e.title=s)},null,512),[[i.nr,e.title]]),(0,n._)("button",{class:"btn btn-outline-secondary",type:"button",onClick:s[1]||(s[1]=(...s)=>e.searchTitle&&e.searchTitle(...s))}," Search "),(0,n.wy)((0,n._)("select",{style:{"margin-left":"10px"},"onUpdate:modelValue":s[2]||(s[2]=s=>e.filteredModule=s)},[(0,n._)("option",w,(0,o.zw)(e.$t("assessments.assessmentModuleFilter")),1),g,((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e.modules,(e=>((0,n.wg)(),(0,n.iD)("option",{value:e["moduleCode"]},(0,o.zw)(e["moduleCode"]),9,Z)))),256))],512),[[i.bM,e.filteredModule]]),(0,n._)("div",b,(0,o.zw)(e.filteredAssessments.length)+" results",1)]),(0,n.Wm)(I,{columns:e.assessmentHeaders,fields:e.filteredAssessments,entity:e.entity},null,8,["columns","fields","entity"])])])])],64)}var k=t(82482),C=t(66520),D=t(11656),I=t(20602),A=t(40384),M=t(60169),j=t(53489),L=function(e,s,t,n){var o,i=arguments.length,l=i<3?s:null===n?n=Object.getOwnPropertyDescriptor(s,t):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)l=Reflect.decorate(e,s,t,n);else for(var r=e.length-1;r>=0;r--)(o=e[r])&&(l=(i<3?o(l):i>3?o(s,t,l):o(s,t))||l);return i>3&&l&&Object.defineProperty(s,t,l),l};let z=class extends C.w3{constructor(...e){super(...e),(0,k.Z)(this,"modules",[]),(0,k.Z)(this,"currentModule",{}),(0,k.Z)(this,"assessments",[]),(0,k.Z)(this,"filteredAssessments",[]),(0,k.Z)(this,"currentAssessment",{}),(0,k.Z)(this,"currentIndex",-1),(0,k.Z)(this,"title",""),(0,k.Z)(this,"assessmentHeaders",[]),(0,k.Z)(this,"entity","assessments"),(0,k.Z)(this,"isLoading",!1),(0,k.Z)(this,"filteredModule","")}retrieveAssessments(){this.isLoading=!0,I.Z.getAll().then((e=>{this.assessments=e.data,this.filteredAssessments=this.assessments,this.assessmentHeaders=["assessmentCode","assessmentDetail","assessmentType","assessmentWeight","assessmentKeywords"]})).catch((e=>{console.log(e)})),D.Z.getAll().then((e=>{this.modules=e.data})).catch((e=>{console.log(e)})),this.isLoading=!1}refreshList(){this.retrieveAssessments(),this.currentModule={},this.currentIndex=-1}setActiveModule(e,s){this.currentModule=e,this.currentIndex=s}searchTitle(){this.isLoading=!0,this.filteredAssessments=this.assessments.filter((e=>{var s=e.assessmentDetail.toLowerCase().includes(this.title.toLowerCase())||e.assessmentCode.toLowerCase().includes(this.title.toLowerCase())||e.assessmentKeywords&&e.assessmentKeywords.toLowerCase().includes(this.title.toLowerCase())&&(""==this.filteredModule||e.assessmentCode.includes(this.filteredModule));return s})),this.isLoading=!1}mounted(){this.retrieveAssessments()}};L([(0,j.R)("filteredModule")],z.prototype,"searchTitle",null),z=L([(0,C.Ei)({components:{RecordTable:A.Z,LoadingScreen:M.Z}})],z);var $=z,x=t(40089);const R=(0,x.Z)($,[["render",_],["__scopeId","data-v-487f09fa"]]);var H=R},40384:function(e,s,t){t.d(s,{Z:function(){return g}});var n=t(73396),o=t(87139);const i=e=>((0,n.dD)("data-v-413c9b20"),e=e(),(0,n.Cn)(),e),l={id:"tableComponent",class:"table table-bordered"},r=i((()=>(0,n._)("i",{class:"bi bi-sort-alpha-down","aria-label":"Sort Icon"},null,-1))),a={class:"data-row"},d={key:0},u={key:3};function c(e,s,t,i,c,m){const f=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)("table",l,[(0,n._)("thead",null,[(0,n._)("tr",null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e.columns,(s=>((0,n.wg)(),(0,n.iD)("th",{key:s},[(0,n.Uk)((0,o.zw)(e.$t(e.entity+"."+s))+" ",1),r])))),128))])]),(0,n._)("tbody",a,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e.fields,(s=>((0,n.wg)(),(0,n.iD)("tr",{key:s},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e.columns,(t=>((0,n.wg)(),(0,n.iD)("td",{key:t},["assessmentmarks"==e.entity?((0,n.wg)(),(0,n.iD)("div",d,(0,o.zw)(s[t]),1)):(0,n.kq)("",!0),"assessmentmarks"!=e.entity&&"moduleConvenor"!=t?((0,n.wg)(),(0,n.j4)(f,{key:1,to:"/"+e.entity+"/"+s["id"]},{default:(0,n.w5)((()=>[(0,n.Uk)((0,o.zw)(s[t]),1)])),_:2},1032,["to"])):(0,n.kq)("",!0),!s["individual"]||"staffMembers"!=e.entity&&"students"!=e.entity||"moduleConvenors"==e.secondaryEntity?(0,n.kq)("",!0):((0,n.wg)(),(0,n.j4)(f,{key:2,to:"/"+e.entity+"/"+s["id"]},{default:(0,n.w5)((()=>[(0,n.Uk)((0,o.zw)(s["individual"][t]),1)])),_:2},1032,["to"])),"assessmentWeight"==t&&s["assessment"]&&"assessmentmarks"==e.entity?((0,n.wg)(),(0,n.iD)("div",u,(0,o.zw)(s["assessment"][t]),1)):(0,n.kq)("",!0),"assessmentWeight"!=t&&s["assessment"]&&"assessmentmarks"==e.entity?((0,n.wg)(),(0,n.j4)(f,{key:4,to:"/assessments/"+s["assessment"]["id"]},{default:(0,n.w5)((()=>[(0,n.Uk)((0,o.zw)(s["assessment"][t]),1)])),_:2},1032,["to"])):(0,n.kq)("",!0),"moduleConvenor"==t&&s["moduleConvenor"]&&s["moduleConvenorIndividual"]&&"moduleConvenors"==e.secondaryEntity?((0,n.wg)(),(0,n.j4)(f,{key:5,to:"/staffMembers/"+s["moduleConvenor"][0]["staffMemberId"]},{default:(0,n.w5)((()=>[(0,n.Uk)((0,o.zw)(s["moduleConvenorIndividual"]["firstName"]+" "+s["moduleConvenorIndividual"]["lastName"]),1)])),_:2},1032,["to"])):(0,n.kq)("",!0)])))),128))])))),128))])])}var m=t(82482),f=t(66520),h=t(95183),v=function(e,s,t,n){var o,i=arguments.length,l=i<3?s:null===n?n=Object.getOwnPropertyDescriptor(s,t):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)l=Reflect.decorate(e,s,t,n);else for(var r=e.length-1;r>=0;r--)(o=e[r])&&(l=(i<3?o(l):i>3?o(s,t,l):o(s,t))||l);return i>3&&l&&Object.defineProperty(s,t,l),l};class p extends f.w3{constructor(...e){super(...e),(0,m.Z)(this,"columns",void 0),(0,m.Z)(this,"fields",void 0),(0,m.Z)(this,"joinedColumns",void 0),(0,m.Z)(this,"joinedFields",void 0),(0,m.Z)(this,"entity",void 0),(0,m.Z)(this,"secondaryEntity",void 0)}created(){}}v([(0,h.fI)()],p.prototype,"columns",void 0),v([(0,h.fI)()],p.prototype,"fields",void 0),v([(0,h.fI)()],p.prototype,"joinedColumns",void 0),v([(0,h.fI)()],p.prototype,"joinedFields",void 0),v([(0,h.fI)()],p.prototype,"entity",void 0),v([(0,h.fI)()],p.prototype,"secondaryEntity",void 0);var y=t(40089);const w=(0,y.Z)(p,[["render",c],["__scopeId","data-v-413c9b20"]]);var g=w}}]);
//# sourceMappingURL=927.b00ac231.js.map