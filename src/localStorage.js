console.log("local storage");

// key der Todolist im LocalStorage
const localStorageKey = "todoList";


// -> todoList-Array mit Todo-List-Objekten
const todoList = getTodoListFromStorage()

// temp! todolist aus LocalStorage entfernen
const removeTodoList = () => {
  window.localStorage.removeItem(localStorageKey)
  
  todoList = []
} 
const clearLocalStorageATTENTION = () => window.localStorage.clear();

/**
 * Daten aus der LocalStorage holen
 * @returns todo-list
 */
function getTodoListFromStorage() {

  let todos = []

  if (window.localStorage.getItem(localStorageKey)) {
    todos = JSON.parse(window.localStorage.getItem(localStorageKey));
  } else {
    todos.push(createTodo('test', 'Milch'))
  }

  console.table(todos);

  return todos
}

/**
 * Daten in die LocalStorage speichern
 * @param {*} todoList 
 */
function addTodoListToLocalStorage(todoList) {  
  window.localStorage.setItem(localStorageKey, JSON.stringify(todoList));
  console.table(todoList);
}

/**
 * -> Todo-Eintrag hinzufügen
 */
function addTodo(todo) {
  // -todo der Liste hinzufuegen
  todoList.push(todo);

  // -todo-list im Storage speichern
  addTodoListToLocalStorage(todoList);
}

/**
 * Daten in die LocalStorage speichern
 * @param {*} todoList 
 */
function addRandomTodo() {
  addTodo(createTodo('shopping', 'Produkt ' + Math.floor(Math.random() * 1000)));
}

function createTodo(type, description, order = 1, dateCreation = new Date(), isCompleted = false, dateCompletion = null, isImportant = false) {
  const todo = new Todo(type, description, order, dateCreation, isCompleted, dateCompletion, isImportant)

  return todo
}

/**
 * -Todo-Klasse mit diversen Attributen
 * 
 * zum Erstellen einer Instanz -> 
 *              let todo = new Todo()
 */
class Todo {
  constructor(type, description, order = 1, dateCreation = new Date(), isCompleted = false, dateCompletion = null, isImportant = false) {
    this.type = type
    this.description = description
    this.order = order
    this.dateCreation = dateCreation
    this.isCompleted = isCompleted
    this.dateCompletion = dateCompletion
    this.isImportant = isImportant
  }

  completed() {
    this.isCompleted = true
    this.dateCompletion = new Date()
  }
}

/**
 * -Todo-List-Typen holen (->sidebar-list!)
 *    -> Anzahl an Todos pro Typ wird mitgeliefert
 * 
 * return -> example
      type        count
	    'homework'  1
	    'shopping'	5
 */
function getListTypes() {
  // nur die List-Typen auflisten
  const types = todoList.map(todo => todo.type)
  // Duplicate entfernen
  let uniqueTypes = [...new Set(types)]

  // objekte mit Anzahl an Todos pro List-Type zurueckgeben
  uniqueTypes = uniqueTypes.map(type => {
    // Objekt kreieren -> Typ + Anzahl an todo's pro Typ (siehe console.table-Output)
    return {
      type: type, 
      count: types.reduce((acc, curr) => acc + (curr === type ? 1 : 0), 0)
    }
  })

  console.table(uniqueTypes);

  return uniqueTypes;
}

/**
 * returns all todo's of a type (->sidebar-list!), order by order or date (?)
 * 
 * @param {*} type type of todo-list
 */
function getTodosOfType(type) {
  const todosOfType = todoList
    .filter(todo => todo.type === type)
    .sort((prev, curr) => {
      // nach 'order' sortieren, wenn gleiche 'order' -> dann nach dateCreation sortieren
      if(prev.order !== curr.order) {
        prev.order - curr.order
      } else {
        prev.dateCreation - curr.dateCreation
      }
    })

  console.table(todosOfType)

  return todosOfType
}