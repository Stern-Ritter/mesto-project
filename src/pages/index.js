import './index.css';
import { addPhotoGridItem, removePhotoGridItem, likePhotoGridItem } from '../components/card.js';
import { openModal, openPlaceModal, closeModal, closeModalOnOverlayClick } from '../components/modal.js';
import { enableValidation } from '../components/validate.js';
import { profileClasses, cardClasses, modalClasses, initialCards } from '../components/constants.js';

// ** DOM-элементы
// Панель с информацией о пользователе
const profile = document.querySelector(`.${profileClasses.profileClass}`);
const profileUserName = profile.querySelector(`.${profileClasses.profileUserNameClass}`);
const profileUserSubline = profile.querySelector(`.${profileClasses.profileUserSublineClass}`);
const profileEditBtn = profile.querySelector(`.${profileClasses.profileEditBtnClass}`);
const profileAddBtn = profile.querySelector(`.${profileClasses.profileAddBtnClass}`);

// Модальное окно редактирования данных пользователя
const profileEdit = document.querySelector(`.${modalClasses.profileEditClass}`);
const profileEditCloseBtn = profileEdit.querySelector(`.${modalClasses.modalCloseBtnClass}`);
const profileEditForm = document.forms.userEdit;
const profileEditUserName = profileEditForm.elements.userName;
const profileEditSubline = profileEditForm.elements.userSubline;
const profileEditSaveBtn = profileEditForm.elements.userSave;

// Модальное окно добавления новой карточки места
const placeAdd = document.querySelector(`.${modalClasses.placeAddClass}`);
const placeAddCloseBtn = placeAdd.querySelector(`.${modalClasses.modalCloseBtnClass}`);
const placeAddForm = document.forms.placeAdd;
const placeAddName = placeAddForm.elements.placeName;
const placeAddImgLink = placeAddForm.elements.placeImg;
const placeAddSaveBtn = placeAddForm.elements.placeSave;

// Модальное окно с информацией о выбранном месте
const placeShow = document.querySelector(`.${modalClasses.placeShowClass}`);
const placeShowCloseBtn = placeShow.querySelector(`.${modalClasses.modalCloseBtnClass}`);

// Панель карточек мест
const photoGridList = document.querySelector(`.${cardClasses.photoGridListClass}`);

// ** Обработчики действий пользователя
// * Обработчики модального окна редактирования данных пользователя
// Обработчик открытия модального окна редактирования данных пользователя
profileEditBtn.addEventListener('click', () => {
  openModal(profileEdit);
  profileEditUserName.value = profileUserName.textContent;
  profileEditSubline.value = profileUserSubline.textContent;
});

// Обработчик закрытия модального окна редактирования данных пользователя,
// без сохранения результатов редактирования
profileEditCloseBtn.addEventListener('click', () => closeModal(profileEdit));

// Обработчик закрытия модального окна редактирования данных пользователя,
// с сохранением результатов редактирования
profileEditSaveBtn.addEventListener('click', () => {
  profileUserName.textContent = profileEditUserName.value;
  profileUserSubline.textContent = profileEditSubline.value;
  closeModal(profileEdit);
});

// Обработчик закрытия модального окна редактирования данных пользователя,
// по клику на оверлей
profileEdit.addEventListener('click', closeModalOnOverlayClick);

// * Обработчики модального окна добавления новой карточки места
// Обработчик открытия модального окна добавления новой карточки места
profileAddBtn.addEventListener('click', () => openModal(placeAdd));

// Обработчик закрытия модального окна добавления новой карточки места,
// без сохранения карточки
placeAddCloseBtn.addEventListener('click', () => {
  closeModal(placeAdd);
});

// Обработчик закрытия модального окна добавления новой карточки места,
// с сохранением карточки
placeAddSaveBtn.addEventListener('click', () => {
  addPhotoGridItem(photoGridList, {
    name: placeAddName.value,
    link: placeAddImgLink.value,
  });
  closeModal(placeAdd);
});

// Обработчик закрытия модального окна добавления новой карточки места,
// по клику на оверлей
placeAdd.addEventListener('click', closeModalOnOverlayClick);

// * Обработчики модального окна с информацией о выбранном месте
// Обработчик открытия модального окна с информацией о выбранной карточке места;
// Обработчик лайка карточки места;
// Обработчик удаления карточки места.
photoGridList.addEventListener('click', (event) => {
  if (event.target.classList.contains(`${cardClasses.photoGridItemImgClass}`)) {
    openPlaceModal(placeShow, event.target.alt, event.target.src);
  }
  if (event.target.classList.contains(`${cardClasses.photoGridItemLikeBtnClass}`)) {
    likePhotoGridItem(event);
  }
  if (event.target.classList.contains(`${cardClasses.photoGridItemDeleteBtnClass}`)) {
    removePhotoGridItem(event);
  }
});

// Обработчик закрытия модального окна с информацией о выбранной карточке места
placeShowCloseBtn.addEventListener('click', () => closeModal(placeShow));

// Обработчик закрытия модального окна с информацией о выбранной карточке места,
// по клику на оверлей
placeShow.addEventListener('click', closeModalOnOverlayClick);

// ** Начальная инициализация
// Добавление карточек мест
addPhotoGridItem(photoGridList, ...initialCards);
// Включение валидации полей ввода форм
enableValidation({
  formSelector: 'modal__form',
  inputSelector: 'modal__input',
  submitButtonSelector: 'modal__save-btn',
  inactiveButtonClass: 'modal__save-btn_disabled',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__input-error_active'
});
