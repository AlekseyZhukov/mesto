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
  templateSelector, config, avatarEdit, avatar, formAvatar, counterLike, buttonSaveEdit,
  buttonSaveNewCard, buttonSaveAvatar
} from '../utils/constants.js';
let owner = null;

const userInfo = new UserInfo('.profile__name', '.profile__occupation', '.profile__photo');


const formProfileValidation = new FormValidator(config, formProfile);
formProfileValidation.enableValidation();

const formNewCardValidation = new FormValidator(config, formNewCard);
formNewCardValidation.enableValidation();

const formAvatarValidation = new FormValidator(config, formAvatar);
formAvatarValidation.enableValidation();

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

const api = new Api({
  mainUrl: 'https://mesto.nomoreparties.co/v1/cohort-27/',
  headers: {
    authorization: '6d5ca00d-91ba-48f8-98c4-b38aa97b3c19',
    'Content-Type': 'application/json'
  }
}, loading);

api
  .getAvatarUserInfo('users/me')
  .then((res) => {
    owner = res._id;
    userInfo.setUserInfo(res);
    api
      .getInitialCards('cards')
      .then((cards) => {
        section.renderItems(cards)
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));

export const imageSelector = '.elements__photo';

const addCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  submitHandler: (data) => {
    loading(buttonSaveNewCard, true);
    api
      .newCardAdd('cards', data)
      .then((cardData) => {
        const cardElement = createCard(cardData);
        section.addItemPrepend(cardElement);
        addCardPopup.close()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        loading(buttonSaveNewCard, false);
      });
  }
});

const editPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  submitHandler: (data) => {
    loading(buttonSaveEdit, true);
    api.changeUserName('users/me', data)
    .then((data) => {
      userInfo.setUserInfo(data);
      editPopup.close();
    }) 
      .catch((err) => console.log(err))
      .finally(() => {
        loading(buttonSaveEdit, false);  
      });
  }
});

const avatarPopup = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  submitHandler: (data) => {
    loading(buttonSaveAvatar, true);
    api.changeUserAvatar('users/me/avatar', data)
      .then((data) => {
        avatar.src = data.avatar
        avatarPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        loading(buttonSaveAvatar, false); 
      });
  }
})

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

function loading(button, isLoading) {
  if (isLoading == true) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

function handleOpenDeletePopup() {
  const popupDelete = new PopupConfirm({
    popupSelector: '.popup_type_delete',
    submitHandler: () => {
      api.deleteCard(`cards/${this._card._id}`)
      .then(() => {
        this.onDelete();
        popupDelete.close()
      })
      
    }
  })
  popupDelete.open();
}

