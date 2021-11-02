import { modalClasses } from './constants.js';
import { clearInputErrorsOnClose, switchButtonState } from './validate.js';

// Функция очищения формы при закрытии модального окна
function clearFormOnClose(modal) {
  const form = modal.querySelector(`.${modalClasses.modalFormClass}`);
  if(form !== null) {
    const inputs = Array.from(form.querySelectorAll(`.${modalClasses.modalInputClass}`));
    const button = form.querySelector(`.${modalClasses.modalSubmitBtnClass}`);
    form.reset();
    clearInputErrorsOnClose(form, {
      inputSelector: modalClasses.modalInputClass,
      inputErrorClass: modalClasses.modalInputErrorClass,
      errorClass: modalClasses.modalErrorClass,
    });
    switchButtonState(inputs, button, {
      inactiveButtonClass: modalClasses.modalInactiveSubmitBtnClass,
    });
  }
}

// Функция закрытия модального окна
export function closeModal(modal) {
  document.removeEventListener('keydown', closeModalOnEsc);
  clearFormOnClose(modal);
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

// Функция открытия модального окна с информации о месте на основе переданных аргументов:
// 1. 'modal' (DOM-элемент) - модальное окно;
// 2. 'name' (String) - имя места;
// 3. 'link' (String) - ссылка на изображение места на удаленном сервере.
export function openPlaceModal(modal, name, link) {
  const image = modal.querySelector(`.${modalClasses.modalImgClass}`);
  const imageCaption = modal.querySelector(`.${modalClasses.modalImgCaptionClass}`);
  image.src = link;
  image.alt = name;
  imageCaption.textContent = name;
  openModal(modal);
}
