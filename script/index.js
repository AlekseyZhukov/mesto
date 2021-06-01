import initialCards from './initial-cards.js'
import Card from './Card.js'
import FormValidator from './formValidator.js'

//переменные для попапа редактирования
const popupEdit = document.querySelector('.popup_type_edit');
const buttonOnPopupEdit = document.querySelector('.profile__corrector');
const buttonOfPopupEdit = document.querySelector('.popup__close_edit');

//переменные для попапа добавления карточки
const popupNewCard = document.querySelector('.popup_type_new-card');
const buttonOnPopupNewCard = document.querySelector('.profile__add-button');
const buttonOfPopupNewCard = document.querySelector('.popup__close_new-card');

//переменные для внесения изменений в профиль + получение значений в попап редактирования
const nameInput = document.querySelector("input[name='profile-name']");
const jobInput = document.querySelector("input[name='profile-job']");
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const formProfile = document.querySelector("form[name='profile']");

//переменные для внесения изменения в карточки
const formNewCard = document.querySelector("form[name='place']");
const formNewCardName = document.querySelector("input[name='place-name']");
const formNewCardLink = document.querySelector("input[name='image-link']");

const placePhoto = document.querySelector('.elements__photo');

const template = document.querySelector('#elements').content;
const cardItem = template.querySelector('.elements__item').cloneNode(true);
const cardsContainer = document.querySelector('.elements');
const cardPicture = cardItem.querySelector('.elements__photo');
const cardPictureText = cardItem.querySelector('.elements__name');

// попап с картинкой
const imagePopupPic = document.querySelector('.popup__image');
const imagePopupText = document.querySelector('.popup__image-name');

export const imagePopup = document.querySelector('.popup_type_image');
const imageClose = document.querySelector('.popup__close_image');
const popups = document.querySelectorAll('.popup');
const buttonElement = document.querySelector('.form__save-button_new-card');
const inputList = Array.from(formNewCard.querySelectorAll('.form__input'));


initialCards.forEach((item) => {
  const cardData = {
    name: item.name,
    link: item.link
  }
  // Создадим экземпляр карточки
  const card = new Card(cardData);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  // Добавляем в DOM
  cardsContainer.append(cardElement);
});

function createCard(cardData) {
  const card = new Card(cardData);
  return card.generateCard();
}
function handleFormNewCardAdd(evt) {
  evt.preventDefault();
  const cardData = {
    name: formNewCardName.value,
    link: formNewCardLink.value
  }
  const card = new Card(cardData);
  const cardElement = createCard(cardData);
  cardsContainer.prepend(cardElement);
  closePopup(popupNewCard);
  formNewCard.reset();
  const f = new FormValidator(config);
   f.resetButton(buttonElement);


}



export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keyup', closePopupEsc);
}


function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopupEsc);
}

function openPopupEdit() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
  openPopup(popupEdit);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  closePopup(popupEdit);
}
imageClose.addEventListener('click', function () {
  closePopup(imagePopup);
})

buttonOnPopupEdit.addEventListener('click', openPopupEdit);

buttonOfPopupEdit.addEventListener('click', function () {
  closePopup(popupEdit);
});

formProfile.addEventListener('submit', handleProfileFormSubmit);

formNewCard.addEventListener('submit', handleFormNewCardAdd);

buttonOnPopupNewCard.addEventListener('click', function () {
  openPopup(popupNewCard);
});

buttonOfPopupNewCard.addEventListener('click', function () {
  closePopup(popupNewCard);
});


popups.forEach(function (item) {
  item.addEventListener('click', function (e) {

    if (e.target === item) {
      console.log('click');
      closePopup(e.target);
    }
  });
});




function closePopupEsc(evt) {

  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
}


const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  inputErrorClass: 'form__input_type_error',
  errorActiveClass: 'form__input-error_active',
  submitButtonSelector: '.form__save-button'
}


const formList = document.querySelectorAll('.form');


formList.forEach((item) => {
  const formValidator = new FormValidator(config);

  const checkVal = formValidator.enableValidation(config, item);

});

