


class FormValidator {
    constructor (config){
       const formSelector =config.formSelector;
      const  inputSelector= config.inputSelector;
      const  inputErrorClass=config.inputErrorClass;
       const errorActiveClass=config.errorActiveClass;
      const  submitButtonSelector=config.submitButtonSelector;
      
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
            hideInputError(formElement, inputElement, config);
        } else {
            showInputError(formElement, inputElement, config);
        }
    };
    _hazInvalidInput = (inputList) => {
        return inputList.some(inputElement => !inputElement.validity.valid);
    }
    
    _toggleButtonState = (buttonElement, inputList) => {
    
        if (hazInvalidInput(inputList)) {
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
                checkInputValidity(formElement, inputElement, restConfig);
                toggleButtonState(buttonElement, inputList);
            });
        });
        toggleButtonState(buttonElement, inputList);
    };
    
    
    enableValidation = (config) => {
        const { formSelector, ...restConfig } = config;
        const formList = Array.from(document.querySelectorAll(formSelector));
        formList.forEach(formElement => {
            setEventListeners(formElement, restConfig);
        });
    }
}
export default FormValidator;