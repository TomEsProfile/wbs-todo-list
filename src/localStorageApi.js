console.log("local storage");

// key der Todolist im LocalStorage
const localStorageKey = "todoList";

// -> todoList-Array mit Todo-List-Objekten
let globalTodoList = getTodoListFromStorage()

// ! Vorsicht! todolist aus LocalStorage entfernen
const removeTodoList = () => {
  window.localStorage.removeItem(localStorageKey)
  
  globalTodoList.length = 0
} 
const clearLocalStorageATTENTION = () => window.localStorage.clear();

/**
 * Daten aus der LocalStorage holen
 * @returns todo-list
 */
function getTodoListFromStorage() {

  let todos = []

  if (window.localStorage.getItem(localStorageKey)) {
    // ! Vorsicht: ist JSON-Data, muss noch in Todo-Objekte gewandelt werden (siehe Init unten)
    todos = JSON.parse(window.localStorage.getItem(localStorageKey));
  }

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
 * 
 * erwartet ein Objekt der Klasse 'Todo'
 */
function addTodo(todo) {
  // -todo der Liste hinzufuegen
  globalTodoList.push(todo);

  // -todo-list im Storage speichern
  addTodoListToLocalStorage(globalTodoList);
}

/**
 * ein Todo entfernen
 * @param {*} id des Todo's
 */
 function getTodo(id) {
  return globalTodoList.find(todo => todo.id === id)
}

/**
 * ein Todo entfernen
 * @param {*} id des Todo's
 */
 function removeTodo(id) {
  globalTodoList = globalTodoList.filter(todo => todo.id !== id)
  addTodoListToLocalStorage(globalTodoList)
}


/**
 * ein Todo entfernen
 * @param {*} id des Todo's
 */
 function completeTodo(id) {
  const todo = getTodo(id)
  todo.completed() // siehe Class Todo
  addTodoListToLocalStorage(globalTodoList)
}


/**
 * Neues Todo-Objekt generieren -> wird in TodoListe eingefuegt
 * 
 * @param {*} type 
 * @param {*} description 
 * @param {*} order 
 * @param {*} dateCreation 
 * @param {*} isCompleted 
 * @param {*} dateCompletion 
 * @param {*} isImportant 
 * @returns 
 */
function createTodo(type, description, order = 1, dateCreation = new Date(), isCompleted = false, dateCompletion = null, isImportant = false) {
  const maxId = getMaxId(globalTodoList);

  // todo max order noch setzen

  const todo = new Todo(maxId, type, description, order, dateCreation, isCompleted, dateCompletion, isImportant)

  return todo
}

/**
 * Max-Id der Todo-List ermitteln
 * 
 * @returns maxId
 */
function getMaxId(todoList) {
  if(todoList.length === 0) {
    return 1;
  }

  const maxId = Math.max(...todoList.map(todo => todo.id)) + 1
  console.log(`maxId: ${maxId}`);
  return maxId;
}

/**
 * -Todo-Klasse mit diversen Attributen
 * 
 * zum Erstellen einer Instanz -> 
 *              let todo = new Todo()
 */
class Todo {
  constructor(id, type, description, order = 1, dateCreation = new Date(), isCompleted = false, dateCompletion = null, isImportant = false) {
    this.id = id
    this.type = type
    this.description = description
    this.order = order
    this.dateCreation = dateCreation
    this.isCompleted = isCompleted
    this.dateCompletion = dateCompletion
    this.isImportant = isImportant
  }

  /**
   * in LocalStorage wird JSon gespeichert -> muss beim Auslesen wieder in Todo-Objekte gewandelt werden
   * 
   * Dates muessen leider auch neu erzeugt werden (dateCreation and dateCompletion)
   * 
   * @param {} json 
   * @returns 
   */
  static from(json){
    const todo = Object.assign(new Todo(), json)
    todo.dateCreation = new Date(todo.dateCreation)
    todo.dateCompletion = todo.dateCompletion ? new Date(todo.dateCompletion) : todo.dateCompletion
    // console.log(todo);
    return todo
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
  const types = globalTodoList.map(todo => todo.type)
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
  const todosOfType = globalTodoList
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

// #############################
// ################## INIT START

// wenn leer -> standard-todos reinsetzen
if(globalTodoList.length === 0) {
  addTodo(createTodo('haushalt', 'Wäsche'))
  addTodo(createTodo('haushalt', 'Putzen'))
  // -todo-list im Storage speichern
  addTodoListToLocalStorage(globalTodoList);
} 
else {
  // von Json to Todo-Class konvertieren
  globalTodoList = globalTodoList.map(jsonTodo => Todo.from(jsonTodo))
}

console.table(globalTodoList);
// console.log(getTodo(6).dateCreation.toLocaleString())

// ################## INIT ENDE
// ############################

// #########################################

// #############################
// ################## TESTS

/**
 * test funktion, um Todo hinzuzufuegen
 */
 function testAddRandomTodo() {
  const todo = createTodo('shopping', 'Produkt ' + Math.floor(Math.random() * 1000))
  addTodo(todo);
}

function testGetTodoListFromStorage() {  
  console.table(getTodoListFromStorage())
}