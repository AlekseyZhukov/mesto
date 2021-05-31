


class FormValidator {
    constructor (config, formElement){

        
       this._formSelector =config.formSelector;
      this._inputSelector=config.inputSelector;
      this._inputErrorClass=config.ErrorClass;
        this._errorActiveClass=config.errorActiveClass;
      this._submitButtonSelector=config.submitButtonSelector;
      
      
    } 

    _hideInputError = (formElement, inputElement, config) => {
        const { inputErrorClass, errorActiveClass } = config;
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(errorActiveClass);
    }
    
    _showInputError = (formElement, inputElement, config) => {
        const { inputErrorClass, errorActiveClass } = config;
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(errorActiveClass);
    }
    
    _checkInputValidity = (formElement, inputElement, config) => {
        if (inputElement.validity.valid) {
            this._hideInputError(formElement, inputElement, config);
        } else {
            this._showInputError(formElement, inputElement, config);
        }
    };
    _hazInvalidInput = (inputList) => {
        return inputList.some(inputElement => !inputElement.validity.valid);
    }
    
    _toggleButtonState = (buttonElement, inputList) => {
        if (this._hazInvalidInput(inputList)) {
            buttonElement.disabled = true;
        } else {
            buttonElement.disabled = false;
        }
    }
    
    _setEventListeners = (formElement, config) => {

        const { inputSelector, submitButtonSelector, ...restConfig } = config;
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            this._checkInputValidity(formElement, inputElement, restConfig);
            this._toggleButtonState(buttonElement, inputList);
        });
    });
    this._toggleButtonState(buttonElement, inputList);
    };
    
    
    enableValidation = (config) => {
        const { formSelector, ...restConfig } = config;
        const formList = Array.from(document.querySelectorAll(formSelector));
        
        formList.forEach(formElement => {
            formList.forEach(formElement => {
                this._setEventListeners(formElement, restConfig);
    });
});
    }
}
export default FormValidator;