(this.webpackJsonpcircles=this.webpackJsonpcircles||[]).push([[0],{86:function(e,t,c){},90:function(e,t,c){"use strict";c.r(t);var r=c(1),n=c.n(r),s=c(20),i=c.n(s),l=c(56),o=c(37),a=c(10),d=c(35),j=c(93),h=(c(86),c(95)),u=c(69),b=c(70),O=c(7);var x=function(){var e=Object(r.useState)((function(){var e=window.localStorage.getItem("theme");return e?JSON.parse(e):"light"})),t=Object(l.a)(e,2),c=t[0],s=t[1],i=Object(d.b)();return n.a.useEffect((function(){window.localStorage.setItem("theme",JSON.stringify(c)),i({type:"toggleTheme",payload:c}),"light"===c?(document.body.classList.remove("dark"),document.body.classList.add("light")):(document.body.classList.remove("light"),document.body.classList.add("dark"))}),[c]),Object(O.jsx)(h.a,{checkedChildren:Object(O.jsx)(u.a,{display:"flex"}),unCheckedChildren:Object(O.jsx)(b.a,{display:"flex"}),defaultChecked:"dark"===c,onChange:function(){return s("light"===c?"dark":"light")}})};function g(){return Object(O.jsx)("div",{children:"THIS IS HOME"})}function p(){return Object(O.jsx)("div",{children:"THIS IS COURSE SELECTOR"})}function E(){return Object(O.jsx)("div",{children:"THIS IS DEGREE SELECTOR"})}function S(){return Object(O.jsx)("div",{children:"THIS IS TERM PLANNER"})}function m(){return Object(O.jsx)("div",{children:"THIS IS PROGRESSION CHECKER"})}j.a.SubMenu;var f=function(){var e=Object(r.useState)("mail"),t=Object(l.a)(e,2),c=t[0],n=t[1];return Object(d.c)((function(e){return e.degree})),Object(d.b)(),Object(O.jsx)(O.Fragment,{children:Object(O.jsxs)(o.a,{children:[Object(O.jsxs)(j.a,{onClick:function(e){console.log("click ",e),n(e.key)},selectedKeys:[c],mode:"horizontal",children:[Object(O.jsx)(j.a.Item,{children:Object(O.jsx)(o.b,{to:"/",children:"Home"})},"home"),Object(O.jsx)(j.a.Item,{children:Object(O.jsx)(o.b,{to:"/degree-selector",children:"Degree Selector"})},"degree"),Object(O.jsx)(j.a.Item,{children:Object(O.jsx)(o.b,{to:"/course-selector",children:"Course Selector"})},"course"),Object(O.jsx)(j.a.Item,{children:Object(O.jsx)(o.b,{to:"/progression-checker",children:"Progression Checker"})},"progression"),Object(O.jsx)(j.a.Item,{children:Object(O.jsx)(o.b,{to:"/term-planner",children:"Term Planner"})},"planner"),Object(O.jsx)(j.a.Item,{children:Object(O.jsx)(x,{})},"toggle")]}),Object(O.jsxs)(a.c,{children:[Object(O.jsx)(a.a,{exact:!0,path:"/",children:Object(O.jsx)(g,{})}),Object(O.jsx)(a.a,{path:"/course-selector",children:Object(O.jsx)(p,{})}),Object(O.jsx)(a.a,{path:"/term-planner",children:Object(O.jsx)(S,{})}),Object(O.jsx)(a.a,{path:"/degree-selector",children:Object(O.jsx)(E,{})}),Object(O.jsx)(a.a,{path:"/progression-checker",children:Object(O.jsx)(m,{})})]})]})})},v=c(39),I=[],y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"APPEND":return e.append(t.payload);case"DELETE":return e.filter((function(e,c){return e!=t.payload}));default:return e}},T=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE":return t.payload;case"RESET":return null;default:return e}},k=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"light",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"toggleTheme":return t.payload;default:return e}},C=Object(v.b)({degree:T,updateCourses:y,theme:k}),w=Object(v.c)(C,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());i.a.render(Object(O.jsx)(d.a,{store:w,children:Object(O.jsx)(n.a.StrictMode,{children:Object(O.jsx)(f,{})})}),document.getElementById("root"))}},[[90,1,2]]]);
//# sourceMappingURL=main.e4e1f52f.chunk.js.map