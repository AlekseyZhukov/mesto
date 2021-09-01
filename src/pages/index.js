import '../pages/index.css';
import initialCards from '../script/initial-cards.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Popup from '../components/Popup.js'
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api.js';
import PopupConfirm from '../components/PopupConfirm.js'
import {
  buttonOnPopupEdit, buttonOnPopupNewCard, nameInput, jobInput, formProfile, formNewCard,
  templateSelector, config, avatarEdit, avatar, formAvatar, counterLike
} from '../utils/constants.js';
let owner = null;

const userInfo = new UserInfo('.profile__name', '.profile__occupation');


const formProfileValidation = new FormValidator(config, formProfile);
formProfileValidation.enableValidation();

const formNewCardValidation = new FormValidator(config, formNewCard);
formNewCardValidation.enableValidation();
const formAvatarValidation = new FormValidator(config, formAvatar);
formAvatarValidation.enableValidation();

const api = new Api({
  mainUrl: 'https://mesto.nomoreparties.co/v1/cohort-27/',
  headers: {
    authorization: '6d5ca00d-91ba-48f8-98c4-b38aa97b3c19',
    'Content-Type': 'application/json'
  }
});



function createCard(cardData) {
  const card = new Card(cardData, templateSelector, handleOpenImagePopup, handleOpenDeletePopup, api, owner);
  return card.generateCard();
}

const section = new Section({
  renderer: (cardData) => {
    const cardElement = createCard(cardData);
    section.addItem(cardElement);
  }
}, '.elements')



export const imageSelector = '.elements__photo';

const addCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  submitHandler: (data) => {
    const button = document.querySelector('.form__save-button_new-card');
    api
      .newCardAdd('cards', data, button)
      .then((cardData) => {
        const cardElement = createCard(cardData);
        section.addItemPrepend(cardElement)
      })
      .catch((err) => console.log(err));



  }
});

const editPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  submitHandler: (data) => {

    userInfo.setUserInfo(data);
    const button = document.querySelector('.form__save-button_edit');
    api.changeUserName('users/me', data, button)
  }
});
const avatarPopup = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  submitHandler: (data) => {
    console.log(data);
    avatar.src = data.avatar;
    const button = document.querySelector('.form__save-button_avatar');
    api.changeUserAvatar('users/me/avatar', data, button)
  }

});
avatarEdit.addEventListener('click', () => {
  avatarPopup.open();
  formAvatarValidation.resetButton();
})
buttonOnPopupEdit.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.about;
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







api
  .getAvatarUserInfo('users/me')
  .then((res) => {
    console.log(res);
    owner = res._id;
    document.querySelector('.profile__photo').src = res.avatar;
    document.querySelector('.profile__name').textContent = res.name;
    document.querySelector('.profile__occupation').textContent = res.about;
    api
      .getInitialCards('cards')
      .then((cards) => {
        section.renderItems(cards)
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));


function handleOpenDeletePopup() {
  const popupDelete = new PopupConfirm({
    popupSelector: '.popup_type_delete',
    submitHandler: () => {
      this.onDelete();
      popupDelete.close();

    }

  })
  popupDelete.open();

}
