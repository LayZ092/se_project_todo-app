class FormValidation {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
  }

  _checkInputValidity(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);

    if (!inputEl.validity.valid) {
      errorMessageEl.textContent = inputEl.validationMessage;
      inputEl.classList.add(this._inputErrorClass);
      errorMessageEl.classList.add(this._errorClass);
    } else {
      this._hideError(inputEl);
    }
  }

  _hideError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
    inputEl.classList.remove(this._inputErrorClass);
  }

  resetValidation() {
    this._inputList.forEach((inputEl) => {
      inputEl.value = "";
      this._hideError(inputEl);
    });

    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _toggleButtonState(inputList) {
    const hasInvalidInput = inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });

    if (hasInvalidInput) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState(this._inputList);

    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState(this._inputList);
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidation;
