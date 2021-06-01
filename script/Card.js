import {openPopup, imagePopup} from './index.js'

class Card {
 
  constructor (cardData, templateSelector) { 
     this._name=cardData.name;
     this._link = cardData.link;
     this._templateSelector = templateSelector;
  }
  _getTemplate () {
    const cardElement = document
      .querySelector('#elements')
      .content
      .querySelector('.elements__item')
      .cloneNode(true);
      return cardElement;
  }
  _onDelete = () => { 
      this._element.remove();
  }
   _like (e) {
    e.target.classList.toggle('elements__button_active');
    
  };
  _handleOpenPopupImage (event){
    
    document.querySelector('.popup__image').src = this._link;
    document.querySelector('.popup__image').alt = this._name;
    document.querySelector('.popup__image-name').textContent = this._name;
    openPopup(imagePopup);
  }
 
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.elements__photo').src = this._link;
    this._element.querySelector('.elements__name').textContent = this._name;
    this._setEventListener();
    return this._element;
  
}

_setEventListener () {
  this._element.querySelector('.elements__delete').addEventListener('click', this._onDelete)
  this._element.querySelector('.elements__button').addEventListener('click', this._like)
  this._element.querySelector('.elements__photo').addEventListener('click', () => {
  this._handleOpenPopupImage();
  });
}
}
export default Card;