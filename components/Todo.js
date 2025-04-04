class Todo {
  constructor(data, selector, handleCheck, todoCounter) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._todoCounter = todoCounter;
  }
  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");
    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;
    todoDate.textContent = this._generateDueDate();

    this._generateCheckboxEl();
    this._setEventListeners();
    return this._todoElement;
  }

  _generateDueDate() {
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      return dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  }

  _generateCheckboxEl() {
    const todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    const todoLabel = this._todoElement.querySelector(".todo__label");

    todoCheckboxEl.checked = this._data.completed;
    todoCheckboxEl.id = `todo-${this._data.id}`;
    todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _setEventListeners() {
    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      this._todoCounter.updateTotal(false);
      if (this._data.completed) {
        this._todoCounter.updateCompleted(false);
      }
    });

    const todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    todoCheckboxEl.addEventListener("change", (evt) => {
      this._data.completed = evt.target.checked;
      this._handleCheck(this._data.completed);
    });
  }
}

export default Todo;
