"use strict";(self.webpackChunksession=self.webpackChunksession||[]).push([[553],{5553:function(e,s,t){t.r(s),t.d(s,{default:function(){return m}});var r=t(4165),n=t(5861),o=t(9439),a=t(2791),l=t(1243),i=t(7689),c=t(5705),d=t(6748),u=t(4270),h=t(184);function m(){var e=(0,a.useState)(!1),s=(0,o.Z)(e,2),t=s[0],m=s[1],p=(0,a.useState)(null),f=(0,o.Z)(p,2),b=f[0],x=f[1],C=(0,i.s0)(""),j=localStorage.getItem("userMail"),g=(0,c.TA)({initialValues:{resetCode:""},onSubmit:function(e){return function(e){return w.apply(this,arguments)}(e)}});function w(){return(w=(0,n.Z)((0,r.Z)().mark((function e(s){var t,n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return m(!0),x(null),e.next=4,l.Z.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",{resetCode:s.resetCode}).catch((function(e){m(!1),console.log(e),x(n.message)}));case 4:t=e.sent,n=t.data,console.log(n),"Success"===n.status?(C("/resetPassword"),m(!1)):m(!1);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(u.q,{children:[(0,h.jsx)("meta",{charSet:"utf-8"}),(0,h.jsx)("title",{children:"Verify reset code"})]}),(0,h.jsxs)("div",{className:"containe my-5 py-5  m-auto rounded p-3 ".concat(d.Z.width),children:[(0,h.jsx)("h2",{className:"fw-bold mb-4",children:"Verify Your Reset Code"}),(0,h.jsx)("h5",{children:"Code Sent!"}),(0,h.jsxs)("p",{children:["We sent a verification code ",(0,h.jsx)("span",{className:"text-main",children:j}),"  enter it below."]}),b?(0,h.jsx)("div",{className:"alert alert-danger",children:b}):"",(0,h.jsxs)("form",{onSubmit:g.handleSubmit,children:[(0,h.jsxs)("div",{className:"form-group",children:[(0,h.jsx)("input",{type:"tel",className:"form-control rounded-pill mb-3 py-2 ".concat(d.Z.blueInput," "),placeholder:"Code",id:"resetCode",name:"resetCode",value:g.values.resetCode,onChange:g.handleChange,onBlur:g.handleBlur}),(0,h.jsx)("label",{htmlFor:"resetCode",className:"fw-semibold",children:"Code"})]}),g.errors.resetCode&&g.touched.resetCode?(0,h.jsx)("div",{className:"alert alert-danger",children:g.errors.resetCode}):"",(0,h.jsx)("button",{className:"btn w-100 mb-3 rounded-pill bg-prim",type:"submit",children:t?(0,h.jsx)("i",{className:"fa fa-spinner fa-spin"}):"Verify"})]})]})]})}},6748:function(e,s){s.Z={width:"ForgotPassword_width__6XmhF",blueInput:"ForgotPassword_blueInput__qMVoF",redInput:"ForgotPassword_redInput__zzLbo"}}}]);
//# sourceMappingURL=553.8d71e2c0.chunk.js.map