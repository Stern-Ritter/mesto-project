(()=>{"use strict";var e="modal_type_place-show",t="modal_opened",n="modal__close",r="modal__input",c="photo-grid__list-item",o="place__image",a="place__like-btn",i="place__delete-btn",l="place__like-btn_active",s="profile",u="profile__user-name",d="profile__user-subline",f={baseUrl:"https://mesto.nomoreparties.co/v1/plus-cohort-3",headers:{authorization:"0f7a8122-8623-4ce6-8795-a69a8a398e7f","Content-Type":"application/json"}},m=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function v(e,t){var n=e.querySelector(".".concat("place__like-count"));t>0?(n.classList.add("place__like-count_visible"),n.textContent=t):(n.classList.remove("place__like-count_visible"),n.textContent="")}function _(e){var t=e._id,n=e.name,r=e.link,s=e.likes,u=e.owner,d=document.querySelector("#".concat("photo-grid-item")).content.querySelector(".".concat(c)).cloneNode(!0),f=d.querySelector(".".concat(o)),m=d.querySelector(".".concat("place__image-name")),_=d.querySelector(".".concat(a)),y=sessionStorage.getItem("userId");return f.src=r,f.alt=n,m.textContent=n,d.dataset.id=t,function(e,t,n){t===n&&e.querySelector(".".concat(i)).classList.add("place__delete-btn_visible")}(d,u._id,y),function(e,t,n){t.map((function(e){return e._id})).includes(n)&&e.classList.add("".concat(l))}(_,s,y),v(d,s.length),d}function y(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];n.reverse().forEach((function(t){e.prepend(_(t))}))}function p(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));r.textContent="",t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass)}function h(e,t,n){!function(e){return!e.every((function(e){return e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.disabled=!1):(t.classList.add(n.inactiveButtonClass),t.disabled=!0)}var S=document.querySelector(".".concat(e)),b=S.querySelector(".".concat("modal__image")),g=S.querySelector(".".concat("modal__image-caption"));function q(e){document.removeEventListener("keydown",L),e.classList.remove(t)}function L(e){"Escape"===e.key&&q(document.querySelector(".".concat(t)))}function E(e){e.target.classList.contains("modal")&&q(e.target)}function k(e){document.addEventListener("keydown",L),e.classList.add(t)}function C(e){var t=e.querySelector(".".concat("modal__form")),n=Array.from(t.querySelectorAll(".".concat(r))),c=t.querySelector(".".concat("modal__save-btn"));t.reset(),function(e,t){Array.from(e.querySelectorAll(".".concat(t.inputSelector))).forEach((function(n){p(e,n,t)}))}(t,{inputSelector:r,inputErrorClass:"modal__input_type_error",errorClass:"modal__input-error_active"}),h(n,c,{inactiveButtonClass:"modal__save-btn_disabled"})}function A(e,t){var n=e.value;return e.value=t,n}var I=document.querySelector(".".concat(s)),U=I.querySelector(".".concat(u)),x=I.querySelector(".".concat(d)),T=I.querySelector(".".concat("profile__avatar"));function w(e){U.textContent=e.name,x.textContent=e.about,T.alt=e.name,T.src=e.avatar}function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var B,N=document.querySelector(".".concat(s)),O=N.querySelector(".".concat(u)),P=N.querySelector(".".concat(d)),D=N.querySelector(".".concat("profile__avatar-edit-btn")),J=N.querySelector(".".concat("profile__edit-btn")),G=N.querySelector(".".concat("profile__add-btn")),H=document.querySelector(".".concat("modal_type_user-edit")),M=H.querySelector(".".concat(n)),z=document.forms.userEdit,$=z.elements.userName,F=z.elements.userSubline,K=z.elements.userSave,Q=document.querySelector(".".concat("modal_type_place-add")),R=Q.querySelector(".".concat(n)),V=document.forms.placeAdd,W=V.elements.placeName,X=V.elements.placeImg,Y=V.elements.placeSave,Z=document.querySelector(".".concat(e)),ee=Z.querySelector(".".concat(n)),te=document.querySelector(".".concat("modal_type_avatar-update")),ne=te.querySelector(".".concat(n)),re=document.forms.avatarUpdate,ce=re.elements.avatarImg,oe=re.elements.avatarSave,ae=document.querySelector(".".concat("modal_type_card-delete")),ie=ae.querySelector(".".concat(n)),le=ae.querySelector(".".concat("modal__accept-btn")),se=document.querySelector(".".concat("photo-grid__list"));J.addEventListener("click",(function(){C(H),k(H),$.value=O.textContent,F.value=P.textContent})),M.addEventListener("click",(function(){return q(H)})),K.addEventListener("click",(function(){var e,t,n=A(K,"Сохранение...");(e=$.value,t=F.value,fetch("".concat(f.baseUrl,"/users/me"),{method:"PATCH",headers:f.headers,body:JSON.stringify({name:e,about:t})})).then((function(e){return m(e)})).then((function(e){w(e),q(H)})).catch((function(e){return console.log(e)})).finally((function(){return A(K,n)}))})),H.addEventListener("click",E),G.addEventListener("click",(function(){C(Q),k(Q)})),R.addEventListener("click",(function(){q(Q)})),Y.addEventListener("click",(function(){var e,t,n=A(Y,"Сохранение...");(e=W.value,t=X.value,fetch("".concat(f.baseUrl,"/cards"),{method:"POST",headers:f.headers,body:JSON.stringify({name:e,link:t})})).then((function(e){return m(e)})).then((function(e){y(se,e),q(Q)})).catch((function(e){return console.log(e)})).finally((function(){return A(Y,n)}))})),Q.addEventListener("click",E),se.addEventListener("click",(function(e){var t,n;if(e.target.classList.contains("".concat(o))&&(t=e.target.alt,n=e.target.src,b.src=n,b.alt=t,g.textContent=t,k(S)),e.target.classList.contains("".concat(a))){var r=e.target.closest(".".concat(c));(function(e,t){return e.target.classList.contains("".concat(l))?(e.target.classList.remove("".concat(l)),function(e){return fetch("".concat(f.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:f.headers})}(t)):(e.target.classList.add("".concat(l)),function(e){return fetch("".concat(f.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:f.headers})}(t))})(e,r.dataset.id).then((function(e){return m(e)})).then((function(e){return v(r,e.likes.length)})).catch((function(e){return console.log(e)}))}if(e.target.classList.contains("".concat(i))){var s=e.target.closest(".".concat(c));sessionStorage.setItem("cardId",s.dataset.id),k(ae)}})),ee.addEventListener("click",(function(){return q(Z)})),Z.addEventListener("click",E),D.addEventListener("click",(function(){C(te),k(te)})),ne.addEventListener("click",(function(){q(te)})),oe.addEventListener("click",(function(){var e,t=A(oe,"Сохранение...");(e=ce.value,fetch("".concat(f.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:f.headers,body:JSON.stringify({avatar:e})})).then((function(e){return m(e)})).then((function(e){!function(e){T.src=e}(e.avatar),q(te)})).catch((function(e){return console.log(e)})).finally((function(){return A(oe,t)}))})),te.addEventListener("click",E),le.addEventListener("click",(function(){var e=sessionStorage.getItem("cardId");(function(e){return fetch("".concat(f.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:f.headers})})(e).then((function(e){return m(e)})).then((function(){document.querySelector(".".concat(c,'[data-id="').concat(e,'"]')).remove(),q(ae)})).catch((function(e){return console.log(e)}))})),ie.addEventListener("click",(function(){return q(ae)})),ae.addEventListener("click",E),B={formSelector:"modal__form",inputSelector:"modal__input",submitButtonSelector:"modal__save-btn",inactiveButtonClass:"modal__save-btn_disabled",inputErrorClass:"modal__input_type_error",errorClass:"modal__input-error_active"},document.querySelectorAll(".".concat(B.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){return e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(".".concat(t.inputSelector))),r=e.querySelector(".".concat(t.submitButtonSelector));h(n,r,t),n.forEach((function(c){c.addEventListener("input",(function(){!function(e,t,n){t.validity.valid?p(e,t,n):function(e,t,n,r){var c=e.querySelector(".".concat(t.id,"-error"));c.textContent=n,t.classList.add(r.inputErrorClass),c.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,c,t),h(n,r,t)}))}))}(e,B)})),fetch("".concat(f.baseUrl,"/users/me"),{method:"GET",headers:f.headers}).then((function(e){return m(e)})).then((function(e){return sessionStorage.setItem("userId",e._id),w(e),fetch("".concat(f.baseUrl,"/cards"),{method:"GET",headers:f.headers})})).then((function(e){return m(e)})).then((function(e){return y.apply(void 0,[se].concat(function(e){if(Array.isArray(e))return j(e)}(t=e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(t)||function(e,t){if(e){if("string"==typeof e)return j(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?j(e,t):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()));var t})).catch((function(e){return console.log(e)}))})();