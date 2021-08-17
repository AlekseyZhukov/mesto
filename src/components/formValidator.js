
class FormValidator {
    constructor(config,formElement) {
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll('.form__input'));
        this._button = this._formElement.querySelector(config.submitButtonSelector);
        this._inputErrorClass=config.inputErrorClass;
        this._errorActiveClass=config.errorActiveClass;
    }
    enableValidation = () => {
        this._setEventListeners();
    };
    _setEventListeners = () => {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
        this._toggleButtonState();
    };
    _checkInputValidity = (inputElement) => {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement);
        }
    };
    _hazInvalidInput = () => {
        return this._inputList.some(inputElement => !inputElement.validity.valid);
    }
    _toggleButtonState = () => {
        if (this._hazInvalidInput()) {
            this.resetButton();
        } else {
            this._button.disabled = false;
        }
    }
    resetButton = () => {
        this._button.disabled = true;
    }
    resetValidation() {
        this._toggleButtonState(); 
  
        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement);
        });
  
      }

    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._errorActiveClass);
    }

    _showInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorActiveClass);
    }
};


export default FormValidator;