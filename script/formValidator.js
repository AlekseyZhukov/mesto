
class FormValidator {
    constructor(formElement, buttonElement) {
        this._formElement = formElement;
        this._buttonElement = buttonElement;
        this._inputList = Array.from(this._formElement.querySelectorAll('.form__input'));
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
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.disabled = false;
        }
    }
    resetButton = () => {
        this._buttonElement.disabled = true;
    }
    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove('form__input_type_error');
        errorElement.textContent = "";
        errorElement.classList.remove('form__input-error_active');
    }

    _showInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add('form__input_type_error');
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add('form__input-error_active');
    }
};


export default FormValidator;