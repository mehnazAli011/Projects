const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todo-list");

//todo class : manages the task decscription and completion status
class Todo {
  constructor(description) {
    this.description = description;
    this.isComplete = false;
  }
  toggleCompletion() {
    return (this.isComplete = !this.isComplete);
  }
}

//taskmanager class:adds and manange multiply todo in array
class TaskManager {
  constructor() {
    this.todos = [];
  }
  addToDo(todo) {
    this.todos.push(todo);
  }
}
const TaskManager = new TaskManager();


//ToDoUI  class :manages the creation and interaction  of todo list  elmements in UI
class TodoUI {
  static createElement(todo) {
    let todoElement = document.createElement("div");
    todoElement.classList.add("todo");
    todoElement.textContent = todo.description;
    todoElement.addEventListener("click", () => {
      TodoUI.createCompleteBtn(todoElement);
      todoElement = null;
    });
    return todoElement;
  }
  static createRemoveButton(todoElement) {
    const removeButton = document.createElement("i");
    removeButton.setAttribute("class", "fa-solid fa-trash");
    removeButton.addEventListener("click", () => {
      todoElement.remove();
    });
    return removeButton;
  }
  static createCompleteBtn(todoElement) {
    let icon = document.createElement("i");
    icon.setAttribute("class", "fa-solid fa-circle-check");
    todoElement.insertAdjacentElement("afterbegin", icon);
  }
}


//class TodoUl:diplay todo list in UI
class ToDoListDisplay {
  displayList(todo) {
    let todoElement = TodoUI.createElement(todo);
    let removebtn = TodoUI.createRemoveButton(todoElement);
    todoElement.append(removebtn);
    todoList.append(todoElement);
  }
}
const ToDoListDisplay = new ToDoListDisplay();
//Evenet listener to "Add" button and captures user input and display  the new todo item in list.
addBtn.addEventListener("click", () => {
  const tododescription = document.getElementById("todo-input").value;
  if (tododescription.trim()) {
    const todo = new Todo(tododecription);
    TaskManager.addToDo(todo);
    ToDoListDisplay.displayList(todo);
  }
});
