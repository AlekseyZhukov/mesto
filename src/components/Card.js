import {handleOpenImagePopup } from '../pages/index.js'
class Card {

  constructor(cardData, templateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = document.querySelector(templateSelector);
    this._image=this._templateSelector.content.querySelector('.elements__photo');
  }
  _getTemplate() {
    const cardItem = this._templateSelector.content.querySelector('.elements__item').cloneNode(true);
    return cardItem;

  }
  _onDelete = () => {
    this._element.remove();
  }
  _like(e) {
    e.target.classList.toggle('elements__button_active');

  };
  
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.elements__photo').src = this._link;
    this._element.querySelector('.elements__name').textContent = this._name;
    this._element.querySelector('.elements__photo').alt = this._name;
    this._setEventListener();
    return this._element;

  }

  _setEventListener() {
    this._element.querySelector('.elements__delete').addEventListener('click', this._onDelete)
    this._element.querySelector('.elements__button').addEventListener('click', this._like)

    this._element.querySelector('.elements__photo').addEventListener('click', () => { 
      handleOpenImagePopup(this._name,this._link);
    });
    
  }
}
export default Card;
