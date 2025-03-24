import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidation from "../components/FormValidation.js";
import { Section } from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

let section;
let renderTodo;

document.addEventListener("DOMContentLoaded", () => {
  const generateTodo = (data) => {
    const todo = new Todo(data, "#todo-template", handleCheck, todoCounter);
    const todoElement = todo.getView();
    return todoElement;
  };

  renderTodo = (item) => {
    const todo = generateTodo(item);
    return todo;
  };

  section = new Section(
    {
      items: initialTodos,
      renderer: renderTodo,
    },
    ".todos__list"
  );

  section.renderItems();
});

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (values) => {
    // Create a date object and adjust for timezone
    const date = new Date(values.date);

    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();

    const newTodo = renderTodo({
      name: values.name,
      date: date,
      id: id,
    });

    section.addItem(newTodo);

    addTodoPopup.getForm().reset();
    addTodoPopup.close();
    todoCounter.updateTotal(true);

    formValidator.resetValidation();
  },
});

addTodoPopup.setEventListeners();

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

const formValidator = new FormValidation(validationConfig, addTodoForm);
formValidator.enableValidation();
