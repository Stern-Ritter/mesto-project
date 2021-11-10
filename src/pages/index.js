import './index.css';
import {
  addPhotoGridItem,
  likePhotoGridItem,
  switchPhotoGridItemLikeBtnState,
  updatePhotoGridItemLikeCount
} from '../components/card.js';
import {
  openModal,
  openPlaceModal,
  closeModal,
  clearForm,
  switchButtonText
} from '../components/modal.js';
import {
  enableValidation
} from '../components/validate.js';
import {
  profileClasses,
  cardClasses,
  modalClasses
} from '../components/constants.js';
import {
  getCards,
  postCard,
  deleteCard,
  getUser,
  patchUser,
  updateUserAvatar,
  checkAnswerStatus
} from '../components/api.js';
import {
  drawProfile
} from '../components/profile.js';

// ** DOM-элементы
// Панель с информацией о пользователе
const profile = document.querySelector(`.${profileClasses.profileClass}`);
const profileUserName = profile.querySelector(`.${profileClasses.profileUserNameClass}`);
const profileUserSubline = profile.querySelector(`.${profileClasses.profileUserSublineClass}`);
const profileAvatarEditBtn = profile.querySelector(`.${profileClasses.profileAvatarEditBtnClass}`);
const profileEditBtn = profile.querySelector(`.${profileClasses.profileEditBtnClass}`);
const profileAddBtn = profile.querySelector(`.${profileClasses.profileAddBtnClass}`);

// Модальные окна на странице
const modals = document.querySelectorAll(`.${modalClasses.modalClass}`);

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

// Модальное окно изменения аватара профиля
const avatarUpdate = document.querySelector(`.${modalClasses.avatarUpdateClass}`);
const avatarUpdateCloseBtn = avatarUpdate.querySelector(`.${modalClasses.modalCloseBtnClass}`);
const avatarUpdateForm = document.forms.avatarUpdate;
const avatarUpdateImgLink = avatarUpdateForm.elements.avatarImg;
const avatarUpdateSaveBtn = avatarUpdateForm.elements.avatarSave;

// Модальное окно подтверждения удаления карточки места
const cardDelete = document.querySelector(`.${modalClasses.cardDeleteClass}`);
const cardDeleteCloseBtn = cardDelete.querySelector(`.${modalClasses.modalCloseBtnClass}`);
const cardDeleteAcceptBtn = cardDelete.querySelector(`.${modalClasses.modalAcceptBtnClass}`);

// Панель карточек мест
const photoGridList = document.querySelector(`.${cardClasses.photoGridListClass}`);

// ** Обработчики действий пользователя
// * Обработчики закрытия модальных окон по клику на:
// 1) кнопку закрытия;
// 2) оверлей.
modals.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if(event.target.classList.contains(modalClasses.modalCloseBtnClass) ||
    event.target.classList.contains(modalClasses.openedModalClass)) {
        closeModal(modal);
      }
  });
});

// * Обработчики модального окна редактирования данных пользователя
// Обработчик открытия модального окна редактирования данных пользователя
profileEditBtn.addEventListener('click', () => {
  clearForm(profileEdit);
  openModal(profileEdit);
  profileEditUserName.value = profileUserName.textContent;
  profileEditSubline.value = profileUserSubline.textContent;
});

// Обработчик закрытия модального окна редактирования данных пользователя,
// с сохранением результатов редактирования
profileEditForm.addEventListener('submit', () => {
  const oldButtonText = switchButtonText(profileEditSaveBtn, 'Сохранение...');
  patchUser(profileEditUserName.value, profileEditSubline.value)
    .then((res) => checkAnswerStatus(res))
    .then((profile) => {
      drawProfile(profile);
      closeModal(profileEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => switchButtonText(profileEditSaveBtn, oldButtonText));
});

// * Обработчики модального окна добавления новой карточки места
// Обработчик открытия модального окна добавления новой карточки места
profileAddBtn.addEventListener('click', () => {
  clearForm(placeAdd);
  openModal(placeAdd);
});

// Обработчик закрытия модального окна добавления новой карточки места,
// с сохранением карточки
placeAddForm.addEventListener('submit', () => {
  const oldButtonText = switchButtonText(placeAddSaveBtn, 'Сохранение...');
  postCard(placeAddName.value, placeAddImgLink.value)
    .then((res) => checkAnswerStatus(res))
    .then((placeCard) =>  {
      addPhotoGridItem(photoGridList, placeCard);
      closeModal(placeAdd);
    })
    .catch((err) => console.log(err))
    .finally(() => switchButtonText(placeAddSaveBtn, oldButtonText));
});

// * Обработчики модального окна с информацией о выбранном месте
// Обработчик открытия модального окна с информацией о выбранной карточке места;
// Обработчик лайка карточки места;
// Обработчик удаления карточки места.
photoGridList.addEventListener('click', (event) => {
  if (event.target.classList.contains(`${cardClasses.photoGridItemImgClass}`)) {
    openPlaceModal(event.target.alt, event.target.src);
  }
  if (event.target.classList.contains(`${cardClasses.photoGridItemLikeBtnClass}`)) {
    const card = event.target.closest(`.${cardClasses.photoGridItemClass}`);
    const cardId = card.dataset.id;
    likePhotoGridItem(event, cardId)
      .then((res) => checkAnswerStatus(res))
      .then((data) => {
        switchPhotoGridItemLikeBtnState(event);
        updatePhotoGridItemLikeCount(card, data.likes.length);
      })
      .catch((err) => console.log(err));
  }
  if (event.target.classList.contains(`${cardClasses.photoGridItemDeleteBtnClass}`)) {
    const card = event.target.closest(`.${cardClasses.photoGridItemClass}`);
    sessionStorage.setItem('cardId', card.dataset.id);
    openModal(cardDelete);
  }
});

// *Обработчики модального окна изменения аватара профиля
// Обработчик открытия модального окна изменения аватара профиля
profileAvatarEditBtn.addEventListener('click', () => {
  clearForm(avatarUpdate);
  openModal(avatarUpdate);
});

// Обработчик закрытия модального окна изменения аватара профиля,
// с сохранением аватара
avatarUpdateForm.addEventListener('submit', () => {
  const oldButtonText = switchButtonText(avatarUpdateSaveBtn, 'Сохранение...');
  updateUserAvatar(avatarUpdateImgLink.value)
    .then((res) => checkAnswerStatus(res))
    .then((profile) => {
      drawProfile(profile);
      closeModal(avatarUpdate);
    })
    .catch((err) => console.log(err))
    .finally(() => switchButtonText(avatarUpdateSaveBtn, oldButtonText));
});

// * Обработчики модального окна подтверждения удаления карточки места
// Обработчик закрытия модального окна подтверждения удаления карточки места
// с подтверждением удаления
cardDeleteAcceptBtn.addEventListener('click', () =>  {
  const cardId = sessionStorage.getItem('cardId');
  deleteCard(cardId)
    .then((res) => checkAnswerStatus(res))
    .then(() =>  {
      const card = document.querySelector(`.${cardClasses.photoGridItemClass}[data-id="${cardId}"]`);
      card.remove();
      closeModal(cardDelete);
    })
    .catch((err) => console.log(err));
});

// ** Начальная инициализация
// Включение валидации полей ввода форм
enableValidation({
  formSelector: 'modal__form',
  inputSelector: 'modal__input',
  submitButtonSelector: 'modal__save-btn',
  inactiveButtonClass: 'modal__save-btn_disabled',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__input-error_active'
});

// Получение данных профиля и карточек мест
getUser()
  .then((res) => checkAnswerStatus(res))
  .then((profile) => {
    sessionStorage.setItem("userId", profile._id);
    drawProfile(profile);
    return getCards();
  })
  .then((res) => checkAnswerStatus(res))
  .then((cards) => addPhotoGridItem(photoGridList, ...cards))
  .catch((err) => console.log(err));
