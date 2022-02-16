console.log("local storage api");

// key der Todolist im LocalStorage
const localStorageKey = "todoList";


// ###############################
// -> Haupt-TodoList-Array mit 'Todo'-Class-Objekten; wird in localStorage gespeichert
let globalTodoList = []



/**
 * -Todo-Klasse mit diversen Attributen
 * 
 * zum Erstellen einer Instanz -> "let todo = new Todo(<listName>, <description>)"
 *  -> dafür kann die Funktion 'createTodo(<listName>, <description>) verwendet werden! (siehe unten)
 */
 class Todo {
  constructor(id, listName, description, order = 1, dateCreation = new Date(), isCompleted = false, dateCompletion = null, isImportant = false) {
    this.id = id
    this.listName = listName
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

  // todo uncompleted-function erstellen
  uncompleted() {
    // ... code
  }
}


// #####################################
// LOCAL STORAGE FUNCTIONS

/**
 * Daten aus der LocalStorage holen
 * @returns todo-list
 */
function getTodoListFromStorage() {

  let todos = []

  if (window.localStorage.getItem(localStorageKey)) {
    // ! Vorsicht: ist JSON-Data, muss noch in Todo-Objekte gewandelt werden (siehe Init unten)
    todos = JSON.parse(window.localStorage.getItem(localStorageKey));
    // von Json to Todo-Class konvertieren
    todos = todos.map(jsonTodo => Todo.from(jsonTodo))
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

// ! Vorsicht! todolist aus LocalStorage entfernen
const removeTodoList = () => {
  window.localStorage.removeItem(localStorageKey)
  
  globalTodoList.length = 0
} 
const clearLocalStorageATTENTION = () => window.localStorage.clear();



// #####################################
// -TODO FUNCTIONS (Hauptpart)

/**
 * ein Todo holen 
 * 
 * returned ein Objekt der Klasse 'Todo'  
 * 
 * @param {*} id des Todo's
 */
 function getTodo(id) {
  return globalTodoList.find(todo => todo.id === id)
}

/**
 * -> Todo-Eintrag hinzufügen
 * 
 * erwartet ein Objekt der Klasse 'Todo' -> siehe Funktion 'createTodo(<listName>, <description>)'
 */
function addTodo(todo) {
  // -todo der Liste hinzufuegen
  globalTodoList.push(todo);

  // im Storage speichern
  addTodoListToLocalStorage(globalTodoList);
}

/**
 * -> Todo-Eintrag aendern
 * 
 * erwartet ein Objekt der Klasse 'Todo' (mit 'id')
 */
function editTodo(todo) {
  let idxTodo = -1

  if(!todo.id) {
    console.error('editTodo >> todo ohne ID!');
    return // Abbruch
  }

  idxTodo = globalTodoList.indexOf(getTodo(todo.id))

  // const todoStorage = globalTodoList.find((todoStorage, idx) => {
  //   if(todoStorage.id === todo.id) {
  //     idxTodo =  idx
  //     return true
  //   }
  // })
  console.log(`idxTodo: ${idxTodo}`)
  globalTodoList[idxTodo] = todo // todo wird evtl nicht benoetigt, da gepointert 

  // -todo-list im Storage speichern
  addTodoListToLocalStorage(globalTodoList);
}

/**
 * ein Todo entfernen
 * 
 * @param {*} id des Todo's
 */
 function removeTodo(id) {
  // filter-Array ohne dem Todo mit der uebergebenen 'id' 
  globalTodoList = globalTodoList.filter(todo => todo.id !== id)
  
  //    -> dieses Array dann in localStorage speichern
  addTodoListToLocalStorage(globalTodoList)
}


/**
 * ein Todo 'erledigen'
 * 
 * @param {*} id des Todo's
 */
 function completeTodo(id) {
  const todo = getTodo(id)

  // siehe Class Todo
  todo.completed() 
  
  // in localStorage speichern
  addTodoListToLocalStorage(globalTodoList)
}


/**
 * Todo kann Hauke oder Vita machen :)
 * ein 'erledigtes' Todo wieder zuruecksetzen
 * 
 * @param {*} id des Todo's
 */
 function uncompleteTodo(id) {
   // todo tbf...
}


/**
 * Neues Todo-Objekt generieren -> wird in localStorage TodoListe (ein Array) eingefuegt
 * 
 * @param {*} listName 
 * @param {*} description 
 * @param {*} order 
 * @param {*} dateCreation 
 * @param {*} isCompleted 
 * @param {*} dateCompletion 
 * @param {*} isImportant 
 * @returns 
 */
function createTodo(listName, description, order = 1, dateCreation = new Date(), isCompleted = false, dateCompletion = null, isImportant = false) {
  const maxId = getMaxId(globalTodoList);

  // todo max order noch setzen

  const todo = new Todo(maxId, listName, description, order, dateCreation, isCompleted, dateCompletion, isImportant)

  return todo
}

/**
 * Max-Id der Todo-List ermitteln (fuer neues Todo)
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


// #####################################
// LIST FUNCTIONS (Hauptpart)

/**
 * Erstellt eine neue Liste (z.B. Shopping)
 *  -> enstpricht einem Todo-Pseudo-Eintrag
 * 
 * @param {*} listName Name der Liste 
 * @returns ein Pseudo-Todo mit Bezeichnung 'Neuer Eintag'
 * 
 */
function addList(listName) {
  let pseudoTodo = createTodo(listName, 'Neuer Eintrag')
  addTodo(pseudoTodo)

  console.log(pseudoTodo); // Typ von Class Todo (mit allen Attributen)

  return pseudoTodo
}

/**
 * ALLE Todo-Listen holen (->sidebar-list!)
 *    -> Anzahl an Todos pro Typ wird mitgeliefert
 * 
 * todo Sortierung?
 * 
 * return -> example
      listName    count
	    'homework'  1
	    'shopping'	5
 */
function getAllLists() {
  // nur die Listen-(Namen) auflisten
  const listNames = globalTodoList.map(todo => todo.listName)
  // Duplicate entfernen
  let uniqueListNames = [...new Set(listNames)]

  // objekte mit Anzahl an Todos pro Liste(n-Name) zurueckgeben
  uniqueListNames = uniqueListNames.map(listName => {
    // Objekt kreieren -> Listenname + Anzahl an todo's pro Liste (siehe console.table-Output)
    return {
      listName: listName, 
      count: listNames.reduce((acc, curr) => acc + (curr === listName ? 1 : 0), 0)
    }
  })

  console.table(uniqueListNames);

  return uniqueListNames;
}

/**
 * EINE Liste mit allen Todo's abfragen
 * 
 * @param {*} listName Name der Todo-Liste * 
 * @return liefert alle Todo's der Liste
 */
function getList(listName) {
  const todosOfList = globalTodoList
    .filter(todo => todo.listName === listName)
    .sort((prev, curr) => {
      // nach 'order' sortieren, wenn gleiche 'order' -> dann nach dateCreation sortieren
      if(prev.order !== curr.order) {
        prev.order - curr.order
      } else {
        prev.dateCreation - curr.dateCreation
      }
    })

  console.table(todosOfList)

  return todosOfList
}

// #############################
// ################## INIT START

// ! Todo-Array initialisieren aus LocalStorage
globalTodoList = getTodoListFromStorage()

// wenn leer -> standard-todos reinsetzen
if(globalTodoList.length === 0) {
  addTodo(createTodo('haushalt', 'Wäsche'))
  addTodo(createTodo('haushalt', 'Putzen'))
  // -todo-list im Storage speichern
  addTodoListToLocalStorage(globalTodoList);
} 
// else {
//   // von Json to Todo-Class konvertieren
//   globalTodoList = globalTodoList.map(jsonTodo => Todo.from(jsonTodo))
// }

console.table(globalTodoList);
// console.log(getTodo(6).dateCreation.toLocaleString())

// ################## INIT ENDE
// ############################

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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