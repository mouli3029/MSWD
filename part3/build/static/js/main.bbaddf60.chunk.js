(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{42:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),a=n(17),o=n.n(a),u=n(8),i=n(18),s=n(3),d=n(0),j=function(e){var t=e.setSearch,n=e.search;return Object(d.jsxs)("form",{children:["filter shown with ",Object(d.jsx)("input",{type:"text",onChange:function(e){return t(e.target.value)},value:n})]})},b=function(e){var t=e.setNewName,n=e.newName,c=e.setNewNum,r=e.newNum,a=e.handleNameSubmit;return Object(d.jsxs)("form",{children:[Object(d.jsxs)("div",{children:["name: ",Object(d.jsx)("input",{type:"text",onChange:function(e){return t(e.target.value)},value:n})]}),Object(d.jsxs)("div",{children:["number: ",Object(d.jsx)("input",{type:"text",onChange:function(e){return c(e.target.value)},value:r})]}),Object(d.jsx)("div",{children:Object(d.jsx)("button",{type:"submit",onClick:a,children:"add"})})]})},h=function(e){var t=e.persons,n=e.search,c=e.handleDelete;return Object(d.jsx)(d.Fragment,{children:t.length>0?t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())})).map((function(e){return Object(d.jsxs)("p",{children:[" ",e.name," ",e.number," ",Object(d.jsx)("button",{onClick:function(t){return c(t,e)},children:" delete "})," "]},e.id)})):Object(d.jsx)("p",{children:"No entries"})})},f=n(5),l=n.n(f),m="http://localhost:3001/api/persons",O=function(){return l.a.get("".concat(m)).then((function(e){return e.data}))},p=function(e){return l.a.post("".concat(m),e).then((function(e){return e.data}))},v=function(e){return l.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},x=function(e,t){return l.a.put("".concat(m,"/").concat(e),t).then((function(e){return e.data}))},w=(n(42),function(e){var t=e.message,n=e.errMess;return console.log(n),Object(d.jsxs)(d.Fragment,{children:[t&&Object(d.jsx)("div",{className:"success",children:t}),n&&Object(d.jsx)("div",{className:"error",children:n})]})}),N=function(){var e=Object(c.useState)([]),t=Object(s.a)(e,2),n=t[0],r=t[1],a=Object(c.useState)(""),o=Object(s.a)(a,2),f=o[0],l=o[1],m=Object(c.useState)(""),N=Object(s.a)(m,2),g=N[0],S=N[1],C=Object(c.useState)(""),k=Object(s.a)(C,2),y=k[0],D=k[1],L=Object(c.useState)(""),I=Object(s.a)(L,2),M=I[0],T=I[1],E=Object(c.useState)(""),F=Object(s.a)(E,2),J=F[0],A=F[1],B=O,P=p,U=v,q=x,z=function(e){var t=n.find((function(t){return t.id===e})),c=Object(u.a)(Object(u.a)({},t),{},{number:g});q(e,c).then((function(e){r(n.map((function(n){return n.id!==t.id?n:e}))),T("Updated ".concat(e.name)),setTimeout((function(){T("")}),2e3)})).catch((function(e){A("Information of ".concat(t.name," has already been removed from server")),setTimeout((function(){A("")}),2e3)}))};return Object(c.useEffect)((function(){B().then((function(e){r(e)})).catch((function(e){return console.log(e)}))}),[]),Object(d.jsxs)("div",{children:[Object(d.jsx)("h2",{children:"Phonebook"}),Object(d.jsx)(w,{message:M,errMess:J}),Object(d.jsx)(j,{setSearch:D,search:y}),Object(d.jsx)("h3",{children:"add a new"}),Object(d.jsx)(b,{setNewName:l,setNewNum:S,newName:f,newNum:g,handleNameSubmit:function(e){e.preventDefault();var t=n.filter((function(e){return e.name.toLowerCase()===f.toLowerCase()}));if(t.length>0)return console.log(t[0].number,g),t[0].number!==g&&window.confirm("".concat(t[0].name," is already added to phonebook, replace the old number with a new one?"))?void z(t[0].id):void 0;P({name:f,number:g}).then((function(e){r((function(t){return[].concat(Object(i.a)(t),[e])})),T("Added ".concat(e.name)),setTimeout((function(){T("")}),2e3)})),l(""),S("")}}),Object(d.jsx)("h3",{children:"Numbers"}),Object(d.jsx)(h,{persons:n,search:y,handleDelete:function(e,t){var c=t.id;e.preventDefault(),window.confirm("Delete ".concat(t.name))&&U(c).then((function(){return r(n.filter((function(e){return e.id!==c})))})).catch((function(e){A("Information of ".concat(t.name," has already been removed from server"))}))}})]})};o.a.render(Object(d.jsx)(r.a.StrictMode,{children:Object(d.jsx)(N,{})}),document.getElementById("root"))}},[[43,1,2]]]);
//# sourceMappingURL=main.bbaddf60.chunk.js.map