// ** DOM-элементы
// Панель с информацией о пользователе
const profile = document.querySelector('.profile');
const profileUserName = profile.querySelector('.profile__user-name');
const profileUserSubline = profile.querySelector('.profile__user-subline');
const profileEditBtn = profile.querySelector('.profile__edit-btn');
const profileAddBtn = profile.querySelector('.profile__add-btn');

// Модальное окно редактирования данных пользователя
const profileEdit = document.querySelector('.modal_type_user-edit');
const profileEditUserName = profileEdit.querySelector('.modal__input[name="user-name"]');
const profileEditSubline = profileEdit.querySelector('.modal__input[name="user-subline"]');
const profileEditCloseBtn = profileEdit.querySelector('.modal__close');
const profileEditSaveBtn = profileEdit.querySelector('.modal__save-btn');

// Модальное окно добавления новой карточки места
const placeAdd = document.querySelector('.modal_type_place-add');
const placeAddName = placeAdd.querySelector('.modal__input[name="place-name"]');
const placeAddImgLink = placeAdd.querySelector('.modal__input[name="place-img-link"]');
const placeAddCloseBtn = placeAdd.querySelector('.modal__close');
const placeAddSaveBtn = placeAdd.querySelector('.modal__save-btn');

// Модальное окно с информацией о выбранном месте
const placeShow = document.querySelector('.modal_type_place-show');
const placeShowCloseBtn = placeShow.querySelector('.modal__close');

// Панель карточек мест
const photoGridList = document.querySelector('.photo-grid__list');

// ** Данные для начальной иницализации
// Данные для инициализации панели карточек мест
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// ** Функции
// Функция открытия модального окна
function openModal(modal) {
  modal.classList.add('modal_opened');
}

// Функция закрытия модального окна
function closeModal(event) {
  event.target.closest('.modal').classList.remove('modal_opened');
}

// Функция переключения состояния лайка
function likePlace(event) {
  event.target.classList.toggle('place__like-btn_active');
}

// Фунукция удаления карточки места
function removePlace(event) {
  event.target.closest('.photo-grid__list-item').remove();
}

// Функция очистки полей ввода формы
function clearModal(event) {
  const inputs = event.target.closest('.modal').querySelectorAll('.modal__input');
  inputs.forEach((input) => input.value = '');
}

// Функция открытия модального окна с информации о выбранном месте
function showPlace(event, modal) {
  const image = modal.querySelector('.modal__image');
  const imageCaption = modal.querySelector('.modal__image-caption')
  image.src = event.target.src;
  image.alt = event.target.alt;
  imageCaption.textContent = event.target.alt;
  openModal(modal);
}

// Функция создания новой карточки места на основе переданных аргументов:
// 1. 'name' (String) - имя места;
// 2. 'link' (String) - ссылка на изображение места на удаленном сервере.
function createPhotoGridItem(name, link) {
  const photoGridItemTemplate = document.querySelector("#photo-grid-item").content;
  const photoGridItem = photoGridItemTemplate.querySelector('.photo-grid__list-item').cloneNode(true);
  const image = photoGridItem.querySelector('.place__image');
  const imageCaption = photoGridItem.querySelector('.place__image-name');
  image.src = link;
  image.alt = name;
  imageCaption.textContent = name;

  // Обработчик открытия модального окна с информацией о выбранном месте
  photoGridItem.querySelector('.place__image').addEventListener('click', () => showPlace(event, placeShow));
  // Обработчик лайка карточки места
  photoGridItem.querySelector('.place__like-btn').addEventListener('click', likePlace);
  // Обработчик удаления карточки места
  photoGridItem.querySelector('.place__delete-btn').addEventListener('click', removePlace);

  return photoGridItem;
}

// Функция добавления карточки места в панель карточек на основе аргументов,
// 1. position (String) - место в родительском контейнере для добавления элемента:
// 'beforebegin' - перед самим элементом; 'afterbegin' - внутри элемента, перед его первым потомком;
// 'beforeend' - внутри элемента, после его последнего потомка; 'afterend' - после самого элемента.
// 2. parent (DOM-элемент) - родительский элемент
// 3. cards (rest parameters, DOM-элементы) - добавляемые элементы
function addPhotoGridItem(position, parent, ...cards) {
  cards.forEach((card) => {
    parent.insertAdjacentElement(position, createPhotoGridItem(card.name, card.link));
  });
}

// ** Обработчики действий пользователя
// Обработчик открытия модального окна редактирования данных пользователя
profileEditBtn.addEventListener('click', () => {
  openModal(profileEdit);
  profileEditUserName.value = profileUserName.textContent;
  profileEditSubline.value = profileUserSubline.textContent;
});

// Обработчик закрытия модального окна редактирования данных пользователя,
// без сохранения результатов редактирования
profileEditCloseBtn.addEventListener('click', closeModal);

// Обработчик закрытия модального окна редактирования данных пользователя,
// с сохранением результатов редактирования
profileEditSaveBtn.addEventListener('click', (event) => {
  event.preventDefault();
  profileUserName.textContent = profileEditUserName.value;
  profileUserSubline.textContent = profileEditSubline.value;
  closeModal(event);
});

// Обработчик открытия модального окна добавления новой карточки места
profileAddBtn.addEventListener('click', () => openModal(placeAdd));

// Обработчик закрытия модального окна добавления новой карточки места
// без сохранения карточки
placeAddCloseBtn.addEventListener('click', closeModal);

// Обработчик закрытия модального окна добавления новой карточки места
// с сохранением карточки
placeAddSaveBtn.addEventListener('click', (event) => {
  event.preventDefault();
  addPhotoGridItem('afterbegin', photoGridList, {name : placeAddName.value, link : placeAddImgLink.value});
  clearModal(event);
  closeModal(event);
});

// Обработчик закрытия модального окна с информацией о выбранном месте
placeShowCloseBtn.addEventListener('click', closeModal);

// ** Начальная инициализация страницы
addPhotoGridItem('beforeend', photoGridList, ...initialCards);
