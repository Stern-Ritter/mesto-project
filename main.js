(()=>{"use strict";var e="modal_type_place-show",t="modal_opened",n="modal__input",r="photo-grid__list-item",o="place__image",c="place__like-btn",a="place__delete-btn",i="place__like-btn_active",l="profile",s="profile__user-name",u="profile__user-subline",d={baseUrl:"https://mesto.nomoreparties.co/v1/plus-cohort-3",headers:{authorization:"0f7a8122-8623-4ce6-8795-a69a8a398e7f","Content-Type":"application/json"}},f=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function m(e,t){var n=e.querySelector(".".concat("place__like-count"));t>0?(n.classList.add("place__like-count_visible"),n.textContent=t):(n.classList.remove("place__like-count_visible"),n.textContent="")}function _(e){var t=e._id,n=e.name,l=e.link,s=e.likes,u=e.owner,d=document.querySelector("#".concat("photo-grid-item")).content.querySelector(".".concat(r)).cloneNode(!0),f=d.querySelector(".".concat(o)),_=d.querySelector(".".concat("place__image-name")),v=d.querySelector(".".concat(c)),y=sessionStorage.getItem("userId");return f.src=l,f.alt=n,_.textContent=n,d.dataset.id=t,function(e,t,n){t===n&&e.querySelector(".".concat(a)).classList.add("place__delete-btn_visible")}(d,u._id,y),function(e,t,n){t.map((function(e){return e._id})).includes(n)&&e.classList.add("".concat(i))}(v,s,y),m(d,s.length),d}function v(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];n.reverse().forEach((function(t){e.prepend(_(t))}))}function y(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));r.textContent="",t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass)}function p(e,t,n){!function(e){return!e.every((function(e){return e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.disabled=!1):(t.classList.add(n.inactiveButtonClass),t.disabled=!0)}var h=document.querySelector(".".concat(e)),S=h.querySelector(".".concat("modal__image")),b=h.querySelector(".".concat("modal__image-caption"));function g(e){document.removeEventListener("keydown",q),e.classList.remove(t)}function q(e){"Escape"===e.key&&g(document.querySelector(".".concat(t)))}function L(e){document.addEventListener("keydown",q),e.classList.add(t)}function E(e){var t=e.querySelector(".".concat("modal__form")),r=Array.from(t.querySelectorAll(".".concat(n))),o=t.querySelector(".".concat("modal__save-btn"));t.reset(),function(e,t){Array.from(e.querySelectorAll(".".concat(t.inputSelector))).forEach((function(n){y(e,n,t)}))}(t,{inputSelector:n,inputErrorClass:"modal__input_type_error",errorClass:"modal__input-error_active"}),p(r,o,{inactiveButtonClass:"modal__save-btn_disabled"})}function C(e,t){var n=e.value;return e.value=t,n}var k=document.querySelector(".".concat(l)),A=k.querySelector(".".concat(s)),I=k.querySelector(".".concat(u)),U=k.querySelector(".".concat("profile__avatar"));function x(e){A.textContent=e.name,I.textContent=e.about,U.alt=e.name,U.src=e.avatar}function T(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var w,j=document.querySelector(".".concat(l)),B=j.querySelector(".".concat(s)),N=j.querySelector(".".concat(u)),O=j.querySelector(".".concat("profile__avatar-edit-btn")),P=j.querySelector(".".concat("profile__edit-btn")),D=j.querySelector(".".concat("profile__add-btn")),J=document.querySelectorAll(".".concat("modal")),G=document.querySelector(".".concat("modal_type_user-edit")),H=document.forms.userEdit,M=H.elements.userName,z=H.elements.userSubline,$=H.elements.userSave,F=document.querySelector(".".concat("modal_type_place-add")),K=document.forms.placeAdd,Q=K.elements.placeName,R=K.elements.placeImg,V=K.elements.placeSave,W=(document.querySelector(".".concat(e)),document.querySelector(".".concat("modal_type_avatar-update"))),X=document.forms.avatarUpdate,Y=X.elements.avatarImg,Z=X.elements.avatarSave,ee=document.querySelector(".".concat("modal_type_card-delete")),te=ee.querySelector(".".concat("modal__accept-btn")),ne=document.querySelector(".".concat("photo-grid__list"));J.forEach((function(e){e.addEventListener("click",(function(n){(n.target.classList.contains("modal__close")||n.target.classList.contains(t))&&g(e)}))})),P.addEventListener("click",(function(){E(G),L(G),M.value=B.textContent,z.value=N.textContent})),H.addEventListener("submit",(function(){var e,t,n=C($,"Сохранение...");(e=M.value,t=z.value,fetch("".concat(d.baseUrl,"/users/me"),{method:"PATCH",headers:d.headers,body:JSON.stringify({name:e,about:t})})).then((function(e){return f(e)})).then((function(e){x(e),g(G)})).catch((function(e){return console.log(e)})).finally((function(){return C($,n)}))})),D.addEventListener("click",(function(){E(F),L(F)})),K.addEventListener("submit",(function(){var e,t,n=C(V,"Сохранение...");(e=Q.value,t=R.value,fetch("".concat(d.baseUrl,"/cards"),{method:"POST",headers:d.headers,body:JSON.stringify({name:e,link:t})})).then((function(e){return f(e)})).then((function(e){v(ne,e),g(F)})).catch((function(e){return console.log(e)})).finally((function(){return C(V,n)}))})),ne.addEventListener("click",(function(e){var t,n;if(e.target.classList.contains("".concat(o))&&(t=e.target.alt,n=e.target.src,S.src=n,S.alt=t,b.textContent=t,L(h)),e.target.classList.contains("".concat(c))){var l=e.target.closest(".".concat(r)),s=l.dataset.id;(function(e,t){return e.target.classList.contains("".concat(i))?function(e){return fetch("".concat(d.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:d.headers})}(t):function(e){return fetch("".concat(d.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:d.headers})}(t)})(e,s).then((function(e){return f(e)})).then((function(t){!function(e){e.target.classList.toggle("".concat(i))}(e),m(l,t.likes.length)})).catch((function(e){return console.log(e)}))}if(e.target.classList.contains("".concat(a))){var u=e.target.closest(".".concat(r));sessionStorage.setItem("cardId",u.dataset.id),L(ee)}})),O.addEventListener("click",(function(){E(W),L(W)})),X.addEventListener("submit",(function(){var e,t=C(Z,"Сохранение...");(e=Y.value,fetch("".concat(d.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:d.headers,body:JSON.stringify({avatar:e})})).then((function(e){return f(e)})).then((function(e){x(e),g(W)})).catch((function(e){return console.log(e)})).finally((function(){return C(Z,t)}))})),te.addEventListener("click",(function(){var e=sessionStorage.getItem("cardId");(function(e){return fetch("".concat(d.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:d.headers})})(e).then((function(e){return f(e)})).then((function(){document.querySelector(".".concat(r,'[data-id="').concat(e,'"]')).remove(),g(ee)})).catch((function(e){return console.log(e)}))})),w={formSelector:"modal__form",inputSelector:"modal__input",submitButtonSelector:"modal__save-btn",inactiveButtonClass:"modal__save-btn_disabled",inputErrorClass:"modal__input_type_error",errorClass:"modal__input-error_active"},document.querySelectorAll(".".concat(w.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){return e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(".".concat(t.inputSelector))),r=e.querySelector(".".concat(t.submitButtonSelector));p(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.valid?y(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));o.textContent=n,t.classList.add(r.inputErrorClass),o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),p(n,r,t)}))}))}(e,w)})),fetch("".concat(d.baseUrl,"/users/me"),{method:"GET",headers:d.headers}).then((function(e){return f(e)})).then((function(e){return sessionStorage.setItem("userId",e._id),x(e),fetch("".concat(d.baseUrl,"/cards"),{method:"GET",headers:d.headers})})).then((function(e){return f(e)})).then((function(e){return v.apply(void 0,[ne].concat(function(e){if(Array.isArray(e))return T(e)}(t=e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(t)||function(e,t){if(e){if("string"==typeof e)return T(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?T(e,t):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()));var t})).catch((function(e){return console.log(e)}))})();