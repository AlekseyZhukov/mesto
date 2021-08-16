
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupText = this._popup.querySelector('.popup__image-name');
        this._popupImage = this._popup.querySelector('.popup__image');
    }
    open(name, link) {
        super.setEventListeners();
        super.open();
        this._popupText.textContent = name;
        this._popupImage.src = link;
        this._popupImage.alt = name;

    }


}




