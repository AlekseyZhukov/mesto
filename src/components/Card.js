
class Card {

  constructor(cardData, templateSelector, handleOpenImagePopup, handleOpenDeletePopup, api, owner) {
    this._card = cardData;
    this._templateElement = document.querySelector(templateSelector);
    this._handleOpenImagePopup = handleOpenImagePopup;
    this._handleOpenDeletePopup = handleOpenDeletePopup;
    this.api = api;
    this.owner = owner;

  }

  _getTemplate() {
    const cardItem = this._templateElement.content.querySelector('.elements__item').cloneNode(true);
    return cardItem;

  }
  onDelete = () => {
    this.api
      .deleteCard(`cards/${this._card._id}`)
      .then(() => {
        this._element.remove()
    })
      .catch((err) => console.log(err))
     
    
  }
  _like(e) {

    const likeIcon = e.target;
    if (likeIcon.classList.contains("elements__button_active")) {

      this.api
        .likeRemove(`cards/likes/${this._card._id}`)
        .then((res) => {
          this._setLikeCount(res.likes.length);
          likeIcon.classList.toggle("elements__button_active")
        })
        .catch((err) => console.log(err))
    } else {
      this.api
        .likeAdd(`cards/likes/${this._card._id}`)
        .then((res) => {
          this._setLikeCount(res.likes.length);
          likeIcon.classList.toggle("elements__button_active")
        })
        .catch((err) => console.log(err))
    }

    

  }

  _hideDeleteButton() {
    if (this.owner !== this._card.owner._id) {
      this._element.querySelector('.elements__delete').classList.add('elements__delete_noactive');
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.elements__photo').src = this._card.link;
    this._element.querySelector('.elements__name').textContent = this._card.name;
    this._element.querySelector('.elements__photo').alt = this._card.name;
    this._setLikeCount(this._card.likes.length);
    this._checkLikes();
    this._hideDeleteButton();
    this._setEventListener();
    return this._element;

  }
  _checkLikes() {
    const index = this._card.likes.findIndex(like => like._id === this.owner);
    if (index !== -1) {
      this._element.querySelector('.elements__button').classList.add("elements__button_active");
    }
  }
  _setLikeCount(count) {
    this._element.querySelector('.elements__like-counter').textContent = count;
  }
  _setEventListener() {
    this._element.querySelector('.elements__delete').addEventListener('click', this._handleOpenDeletePopup.bind(this));
    this._element.querySelector('.elements__button').addEventListener('click', this._like.bind(this));
    this._element.querySelector('.elements__photo').addEventListener('click', () => {
      this._handleOpenImagePopup(this._card.name, this._card.link);
    });
    
  }
}
export default Card;
