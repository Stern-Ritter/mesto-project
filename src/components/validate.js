// Функция отображения ошибки валидации поля ввода формы
function showInputError(form, input, errorMessage, options) {
  const inputError = form.querySelector(`.${input.id}-error`);
  inputError.textContent = errorMessage;
  input.classList.add(options.inputErrorClass);
  inputError.classList.add(options.errorClass);
}

// Функция скрытия ошибки валидации поля ввода формы
function hideInputError(form, input, options) {
  const inputError = form.querySelector(`.${input.id}-error`);
  inputError.textContent = '';
  input.classList.remove(options.inputErrorClass);
  inputError.classList.remove(options.errorClass);
}

// Функция скрытия ошибки валидации поля ввода формы при ее закрытии
export function clearInputErrorsOnClose(form, options) {
  const inputs = Array.from(form.querySelectorAll(`.${options.inputSelector}`));
  inputs.forEach((input) => {
    hideInputError(form, input, options);
  });
}

// Функция валидации поля ввода формы
function isValid(form, input, options) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, options);
  } else {
    hideInputError(form, input, options);
  }
}

// Функция проверки валидности всех полей ввода формы
function hasInvalidInput(inputs) {
  return !inputs.every((input) => input.validity.valid);
}

// Функция переключения состояния кнопки подтверждения в зависимости
// от валидности всех полей ввода формы
export function switchButtonState(inputs, button, options) {
  if(hasInvalidInput(inputs)) {
    button.classList.add(options.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(options.inactiveButtonClass);
    button.disabled = false;
  }
}

// Функция включения валидации всех полей ввода формы
function setFormEventListeners(form, options) {
  const inputs = Array.from(form.querySelectorAll(`.${options.inputSelector}`));
  const button =  form.querySelector(`.${options.submitButtonSelector}`);
  switchButtonState(inputs, button, options);
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input, options);
      switchButtonState(inputs, button, options);
    });
  });
}

// Функция включения валидации полей ввода всех форм
export function enableValidation(options) {
  const forms = document.querySelectorAll(`.${options.formSelector}`);
  forms.forEach((form) => {
    form.addEventListener('submit', (event) => event.preventDefault());
    setFormEventListeners(form, options);
  });
}
