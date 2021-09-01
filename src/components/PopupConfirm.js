
import Popup from "./Popup.js";
export default class PopupConfirm extends Popup {
    constructor({ popupSelector, submitHandler }) {
        super(popupSelector);
        this._button = this._popup.querySelector('.delete');
        this._submitHandler = submitHandler;
        this.setEventListeners()
    }
   
    setEventListeners() {
        super.setEventListeners();
        this._button.addEventListener('click', this._submitHandler);

    }
    close() {

        this._button.removeEventListener('click', this._submitHandler);
        
        super.close();
    }


}



