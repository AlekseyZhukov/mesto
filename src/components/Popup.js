

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._cross = this._popup.querySelector('.popup__close');
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener("keydown", this._handleEscClose);

        this._popup.addEventListener('click', this._handleClosePopupByClick);
    }

    close() {
        document.removeEventListener("keydown", this._handleEscClose);

        this._popup.removeEventListener('click', this._handleClosePopupByClick);
        this._popup.classList.remove('popup_opened')
    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {

            this.close();
        }
    }

    _handleClosePopupByClick = (event) => {
        if (event.target === this._popup) {
            this.close();
        }
    }

    setEventListeners() {


        this._cross.addEventListener('click', () => {
            console.log('click');
            this.close();
        });
       

    };
}

