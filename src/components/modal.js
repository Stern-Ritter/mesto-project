import { modalClasses } from './constants.js';
import { clearInputErrors, switchButtonState } from './validate.js';

const modalPlace = document.querySelector(`.${modalClasses.placeShowClass}`);
const image = modalPlace.querySelector(`.${modalClasses.modalImgClass}`);
const imageCaption = modalPlace.querySelector(`.${modalClasses.modalImgCaptionClass}`);

// Функция закрытия модального окна
export function closeModal(modal) {
  document.removeEventListener('keydown', closeModalOnEsc);
  modal.classList.remove(modalClasses.openedModalClass);
}

// Функция закрытия модального окна нажатием 'Esc'
function closeModalOnEsc(event) {
  if (event.key === 'Escape') {
    closeModal(document.querySelector(`.${modalClasses.openedModalClass}`));
  }
}

// Функция закрытия модального окна кликом на оверлей
export function closeModalOnOverlayClick(event) {
  if (event.target.classList.contains(modalClasses.modalClass)) {
    closeModal(event.target);
  }
}

// Функция открытия модального окна
export function openModal(modal) {
  document.addEventListener('keydown', closeModalOnEsc);
  modal.classList.add(modalClasses.openedModalClass);
}

// Функция очищения формы при открытии модального окна
export function clearForm(modal) {
  const form = modal.querySelector(`.${modalClasses.modalFormClass}`);
  const inputs = Array.from(form.querySelectorAll(`.${modalClasses.modalInputClass}`));
  const button = form.querySelector(`.${modalClasses.modalSubmitBtnClass}`);
  form.reset();
  clearInputErrors(form, {
    inputSelector: modalClasses.modalInputClass,
    inputErrorClass: modalClasses.modalInputErrorClass,
    errorClass: modalClasses.modalErrorClass,
  });
  switchButtonState(inputs, button, {
    inactiveButtonClass: modalClasses.modalInactiveSubmitBtnClass,
  });
  }

// Функция открытия модального окна с информации о месте на основе переданных аргументов:
// 1. 'modal' (DOM-элемент) - модальное окно;
// 2. 'name' (String) - имя места;
// 3. 'link' (String) - ссылка на изображение места на удаленном сервере.
export function openPlaceModal(name, link) {
  image.src = link;
  image.alt = name;
  imageCaption.textContent = name;
  openModal(modalPlace);
}
