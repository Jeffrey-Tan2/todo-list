(()=>{"use strict";class e{constructor(e,t,d,n,s,l){this.id=e,this.title=t,this.description=d,this.dueDate=n,this.priority=s,this.completed=l}getTitle(){return this.title}setTitle(e){this.title=e}}const t=document.getElementById("add-task-btn"),d=document.getElementById("add-task"),n=document.getElementById("edit-task"),s=document.getElementById("add-close"),l=document.getElementById("edit-close"),i=document.getElementById("new-task-form");t.addEventListener("click",(()=>{d.style.display="block"})),s.addEventListener("click",(()=>{d.style.display="none",i.reset()})),l.addEventListener("click",(()=>{n.style.display="none"})),document.addEventListener("keyup",(e=>{"Escape"===e.key&&(d.style.display="none",n.style.display="none",i.reset())}));let c=0,a=new Array,o=new class{constructor(e){this.list=e}addTask(e){this.list.push(e)}getTask(e){return this.list[e]}}(a);i.addEventListener("submit",(t=>{t.preventDefault();let n=document.getElementById("new-title").value,s=document.getElementById("new-desc").value,l=document.getElementById("new-date").value,a=function(){let e=document.getElementsByName("priority");for(let t=0;t<e.length;t++)if(e[t].checked)return e[t].value}(),r=new e(c,n,s,l,a,!1);!function(e){const t=document.getElementById("tasks");let d=document.createElement("div");d.id=e.id,d.classList.add("task");let n=document.createElement("div"),s=document.createElement("div"),l=document.createElement("div"),i=document.createElement("div"),c=document.createElement("div"),a=document.createElement("button"),o=document.createElement("button"),r=document.createElement("button");c.classList.add("task-btns"),a.classList.add("task-btn"),o.classList.add("task-btn"),r.classList.add("task-btn"),o.addEventListener("click",(()=>{t.removeChild(d)})),a.addEventListener("click",(()=>{e.completed?(e.completed=!1,a.style.color="red",d.classList.add("not-completed"),d.classList.remove("completed")):(e.completed=!0,a.style.color="green",d.classList.remove("not-completed"),d.classList.add("completed")),a.innerHTML=e.completed?"✓":"✗"})),d.classList.add("not-completed"),c.appendChild(a),c.appendChild(o),c.appendChild(r),n.innerText=e.title,s.innerText=e.description,l.innerText=e.dueDate,null==e.priority?i.innerText="":i.innerText="Priority: "+e.priority,a.innerHTML=e.completed?"✓":"✗",a.style.color="red",o.innerHTML="Del",r.innerHTML="Edit",d.classList.add(e.priority),n.classList.add("title-content"),s.classList.add("desc-content"),i.classList.add("prio-content"),l.classList.add("date-content"),d.appendChild(n),d.appendChild(s),d.appendChild(l),d.appendChild(i),d.appendChild(c),t.appendChild(d)}(r),o.addTask(r),i.reset(),d.style.display="none",c++}))})();