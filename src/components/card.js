import { cardClasses } from './constants.js';
import { deleteLike, putLike } from './api.js';

// Функция обновления количества лайков в карточке места
export function updatePhotoGridItemLikeCount(card, count) {
  const likes = card.querySelector(`.${cardClasses.photoGridItemLikeCountClass}`);
  if(count > 0) {
    likes.classList.add('place__like-count_visible');
    likes.textContent = count;
  } else {
    likes.classList.remove('place__like-count_visible');
    likes.textContent = '';
  }
}

// Функция изменения видимости кнопки удаления карточки места
function setPhotoGridItemDeleteBtnVisibility(card, ownerId, userId) {
  if(ownerId === userId) {
    const deleteButton = card.querySelector(`.${cardClasses. photoGridItemDeleteBtnClass}`);
    deleteButton.classList.add('place__delete-btn_visible');
  }
}

// Функция изменения изначального отображения состояния активности
// кнопки лайка карточки места
function setPhotoGridItemLikeBtnInitState(likeBtn, likes, userId) {
  if(likes.map((like) => like._id).includes(userId)) {
    likeBtn.classList.add(`${cardClasses.activeLikeBtnClass}`);
  }
}

// Функция создания новой карточки места на основе переданных аргументов:
// 1. 'name' (String) - имя места;
// 2. 'link' (String) - ссылка на изображение места на удаленном сервере.
function createPhotoGridItem({ _id, name, link, likes, owner }) {
  const photoGridItemTemplate = document
    .querySelector(`#${cardClasses.photoGridTemplate}`).content;
  const photoGridItem = photoGridItemTemplate
    .querySelector(`.${cardClasses.photoGridItemClass}`)
    .cloneNode(true);
  const image = photoGridItem.querySelector(`.${cardClasses.photoGridItemImgClass}`);
  const imageCaption = photoGridItem.querySelector(`.${cardClasses.photoGridItemImgNameClass}`);
  const likeBtn = photoGridItem.querySelector(`.${cardClasses.photoGridItemLikeBtnClass}`);
  const userId = sessionStorage.getItem('userId');
  image.src = link;
  image.alt = name;
  imageCaption.textContent = name;
  photoGridItem.dataset.id = _id;
  setPhotoGridItemDeleteBtnVisibility(photoGridItem, owner._id, userId);
  setPhotoGridItemLikeBtnInitState(likeBtn, likes, userId);
  updatePhotoGridItemLikeCount(photoGridItem, likes.length);
  return photoGridItem;
}

// Функция добавления карточки места в панель карточек на основе аргументов,
// 1. parent (DOM-элемент) - родительский элемент
// 2. cards (rest parameters, DOM-элементы) - добавляемые карточки мест
export function addPhotoGridItem(parent, ...cards) {
  cards
    .reverse()
    .forEach((card) => {
      parent.prepend(createPhotoGridItem(card));
    });
}

// Функция переключения состояния активности кнопки лайка карточки места
export function likePhotoGridItem(event, cardId) {
  if(event.target.classList.contains(`${cardClasses.activeLikeBtnClass}`)) {
    return deleteLike(cardId);
  } else {
    return putLike(cardId);
  }
}

// Функция изменения отображения состояния активности кнопки лайка карточки места
export function switchPhotoGridItemLikeBtnState(event) {
  event.target.classList.toggle(`${cardClasses.activeLikeBtnClass}`);
}
