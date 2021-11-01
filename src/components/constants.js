export const modalClasses = {
  modalClass: 'modal',
  profileEditClass: 'modal_type_user-edit',
  placeAddClass: 'modal_type_place-add',
  placeShowClass: 'modal_type_place-show',
  openedModalClass: 'modal_opened',
  modalCloseBtnClass: 'modal__close',
  modalFormClass: 'modal__form',
  modalInputClass: 'modal__input',
  modalInputErrorClass: 'modal__input_type_error',
  modalErrorClass: 'modal__input-error_active',
  modalSubmitBtnClass: 'modal__save-btn',
  modalInactiveSubmitBtnClass: 'modal__save-btn_disabled',
  modalImgClass: 'modal__image',
  modalImgCaptionClass: 'modal__image-caption',
};

export const cardClasses = {
  photoGridListClass: 'photo-grid__list',
  photoGridTemplate: 'photo-grid-item',
  photoGridItemClass: 'photo-grid__list-item',
  photoGridItemImgClass: 'place__image',
  photoGridItemImgNameClass: 'place__image-name',
  photoGridItemLikeBtnClass: 'place__like-btn',
  photoGridItemDeleteBtnClass: 'place__delete-btn',
  activeLikeBtnClass: 'place__like-btn_active',
};

export const profileClasses = {
  profileClass: 'profile',
  profileUserNameClass: 'profile__user-name',
  profileUserSublineClass: 'profile__user-subline',
  profileEditBtnClass: 'profile__edit-btn',
  profileAddBtnClass: 'profile__add-btn',
};

// Данные для инициализации панели карточек мест
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];
