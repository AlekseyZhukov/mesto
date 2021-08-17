
import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor({ popupSelector, submitHandler }) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this.submit = (evt) => {
            evt.preventDefault();
           submitHandler(this._getInputValues());
            this.close();
        };
        this._inputList = Array.from(this._form.querySelectorAll('.form__input'));
        this.setEventListeners()
    }
    _getInputValues() {
        
        this._formValues = {};
        this._inputList.forEach(inputElement => {
            
             this._formValues[inputElement.name] = inputElement.value;
        });

        return this._formValues;

    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this.submit);

    }


    close() {

        this._form.reset();
        
        super.close();
    }


}



