import { cardClasses } from './constants.js';

// Функция создания новой карточки места на основе переданных аргументов:
// 1. 'name' (String) - имя места;
// 2. 'link' (String) - ссылка на изображение места на удаленном сервере.
function createPhotoGridItem(name, link) {
  const photoGridItemTemplate = document
    .querySelector(`#${cardClasses.photoGridTemplate}`).content;
  const photoGridItem = photoGridItemTemplate
    .querySelector(`.${cardClasses.photoGridItemClass}`)
    .cloneNode(true);
  const image = photoGridItem.querySelector(`.${cardClasses.photoGridItemImgClass}`);
  const imageCaption = photoGridItem.querySelector(`.${cardClasses.photoGridItemImgNameClass}`);
  image.src = link;
  image.alt = name;
  imageCaption.textContent = name;
  return photoGridItem;
}

// Функция добавления карточки места в панель карточек на основе аргументов,
// 1. parent (DOM-элемент) - родительский элемент
// 2. cards (rest parameters, DOM-элементы) - добавляемые карточки мест
export function addPhotoGridItem(parent, ...cards) {
  cards.forEach((card) => {
    parent.prepend(createPhotoGridItem(card.name, card.link));
  });
}

// Фунукция удаления карточки места
export function removePhotoGridItem(event) {
  event.target.closest(`.${cardClasses.photoGridItemClass}`).remove();
}

// Функция переключения состояния лайка карточки места
export function likePhotoGridItem(event) {
  event.target.classList.toggle(`${cardClasses.activeLikeBtnClass}`);
}
