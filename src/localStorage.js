console.log("local storage");

// key der Todolist im LocalStorage
const localStorageKey = "todoList";


// -> todoList-Array mit Todo-List-Objekten
const todoList = getTodoListArray();

// temp! todolist aus LocalStorage entfernen
const removeTodoList = () => window.localStorage.removeItem(localStorageKey);
const clearLocalStorageATTENTION = () => window.localStorage.clear();

/**
 * Daten aus der LocalStorage holen
 * @returns todo-list
 */
function getTodoListArray() {
  if (!window.localStorage.getItem(localStorageKey)) {
    return [];
  } else {
    const todoStorage = JSON.parse(window.localStorage.getItem(localStorageKey));
    console.log(todoStorage);
    return todoStorage;
  }
}

/**
 * Daten in die LocalStorage speichern
 * @param {*} todoList 
 */
function addTodoListToLocalStorage(todoList) {
  window.localStorage.setItem(localStorageKey, JSON.stringify(todoList));
}

/**
 * -> Todo-Eintrag hinzufügen
 */
function addTodo() {
  todoList.push("test " + Math.floor(Math.random() * 1000));
  addTodoListToLocalStorage(todoList);

  console.log(todoList);
}
