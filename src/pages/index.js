import  '../pages/index.css';
import initialCards from '../script/initial-cards.js'
import Card from '../components/Card.js'
import FormValidator from '../components/formValidator.js'
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {
  buttonOnPopupEdit, buttonOnPopupNewCard, nameInput, jobInput, formProfile, formNewCard,
  templateSelector,  cardsContainer,  config
} from '../utils/constants.js';


const userInfo = new UserInfo('.profile__name', '.profile__occupation');


const formProfileValidation = new FormValidator(config, formProfile);
formProfileValidation.enableValidation();

const formNewCardValidation = new FormValidator(config, formNewCard);
formNewCardValidation.enableValidation();



const section = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const cardData = {
      name: cardItem.name,
      link: cardItem.link
    }
    const card = new Card(cardData, templateSelector);
    const cardElement = card.generateCard();
    section.addItem(cardElement);
  }
}, '.elements')
section.renderItems();


export const imageSelector = '.elements__photo';

const addCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  submitHandler: (data) => {

    const plusAdd = new Card(data, templateSelector);
    const cardElement = plusAdd.generateCard();
    cardsContainer.prepend(cardElement);
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
});



const popupWithImage = new PopupWithImage('.popup_type_image');


export function handleOpenImagePopup(name, link) {
  popupWithImage.open(name, link);
}




