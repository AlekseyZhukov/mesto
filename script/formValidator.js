
// принимает в конструктор объект настроек с селекторами и классами формы (config?);
// принимает вторым параметром элемент той формы, которая валидируется (formElement-active?);

class FormValidator {
    constructor (config, formElement){

        //formElement выводится в консоль как undefined
       this._formSelector =config.formSelector;
       //как понять что форма открыта?
       //формы у нас 2. Общий класс ('.form')
       //Одна форма класс "const formNewCard = document.querySelector("form[name='place']")"
       //Вторая форма класс "const formProfile = document.querySelector("form[name='profile']")"
      this._inputSelector=config.inputSelector;
      //в каждой форме два поля ввода. Итого 4
      this._inputErrorClass=config.ErrorClass;
        this._errorActiveClass=config.errorActiveClass;
        // с этой штукой кажется вопросов нет
      this._submitButtonSelector=config.submitButtonSelector;
      //кнопка ввода своя в каждой форме
      
    } 
//имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, 
//изменяют состояние кнопки сабмита, устанавливают все обработчики;
// имеет один публичный метод enableValidation, который включает валидацию формы.
// Для каждой проверяемой формы создайте экземпляр класса FormValidator  
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
            console.log('input')
            this._checkInputValidity(formElement, inputElement, restConfig);
            this._toggleButtonState(buttonElement, inputList);
        });
    });
    this._toggleButtonState(buttonElement, inputList);
    };
    
    
    enableValidation = (config) => {
        const { formSelector, ...restConfig } = config;
        console.log(config);
        const formList = Array.from(document.querySelectorAll(formSelector));
        console.log(formList);
        
        formList.forEach(formElement => {
            formList.forEach(formElement => {
                this._setEventListeners(formElement, restConfig);
    });
});
    }
}
export default FormValidator;