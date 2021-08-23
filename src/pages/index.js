import '../pages/index.css';
import initialCards from '../script/initial-cards.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {
  buttonOnPopupEdit, buttonOnPopupNewCard, nameInput, jobInput, formProfile, formNewCard,
  templateSelector, cardsContainer, config
} from '../utils/constants.js';


const userInfo = new UserInfo('.profile__name', '.profile__occupation');


const formProfileValidation = new FormValidator(config, formProfile);
formProfileValidation.enableValidation();

const formNewCardValidation = new FormValidator(config, formNewCard);
formNewCardValidation.enableValidation();

function createCard(cardData) {
  const card = new Card(cardData, templateSelector, handleOpenImagePopup);
  return card.generateCard();
}

const section = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const cardData = {
      name: cardItem.name,
      link: cardItem.link
    }

    const cardElement = createCard(cardData)
    section.addItem(cardElement);
  }
}, '.elements')
section.renderItems();


export const imageSelector = '.elements__photo';

const addCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  submitHandler: (data) => {

    const cardElement = createCard(data);
    section.addItemPrepend(cardElement)
  }
});

const editPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  submitHandler: (data) => {
    userInfo.setUserInfo(data);
  }
});

buttonOnPopupEdit.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  nameInput.value = data.nameInfo;
  jobInput.value = data.jobInfo;
  editPopup.open();
  formProfileValidation.resetButton();
  
});

buttonOnPopupNewCard.addEventListener('click', () => {
  addCardPopup.open();
  formNewCardValidation.resetButton();
  formNewCardValidation.resetValidation();
});



const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

function handleOpenImagePopup(name, link) {
  popupWithImage.open(name, link);
}




