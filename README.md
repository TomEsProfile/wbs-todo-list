# wbs-todo-list
wbs week 3+4 Todo List

## kleine Beschreibung der Todo-List Api
[localStorageApi.js](src/localStorageApi.js)

### Api-Objekt -> Klassen-Objekt zum Aufrufen aller Funktionen
```javascript
// Klasse zum Ansprechen der Api
class TodoListApi { ... }

// Instanz erstellen
const _api = new TodoListApi()

// Funktionen aufrufen
_api.getList('shopping')
```

### Übersicht der Api-Funktionen

> Listen-Funktionen
```javascript
// einen neue Liste hinzufügen
function addList(listName)

// alle Listen(namen) holen
function getAllLists()

// Liste holen (liefert alle Todos der Liste)
function getList(listName)
```


> Todo-Funktionen
```javascript
// ein Todo mit 'id' holen
function getTodo(id)

// ein Todo hinzufuegen (erwartet ein Objekt der Klasse 'Todo' [siehe unten])
function addTodo(todo)

// ein Todo löschen
function removeTodo(id)

// ein Todo in der Liste umbenennen
function renameTodo(todo) 

// ein Todo 'erledigen'
function completeTodo(id)

// ein 'erledigtes' Todo wieder zuruecksetzen
function uncompleteTodo(id)

// Neues Todo-Objekt generieren (bekommt eine Id)
function createTodo(listName, description)
```

> Todo-Objekt -> Klassen-Objekt mit diversen Attributen
```javascript
// das globale TodoList-Array wird mit diesen Todo-Objekten 'gefuellt'
class Todo {
    this.id = id
    this.listName = listName
    this.description = description
    this.order = order
    this.dateCreation = dateCreation
    this.isCompleted = isCompleted
    this.dateCompletion = dateCompletion
    this.isImportant = isImportant
}
```

### Beispiel Implementiereungen

> alle Listen(namen) holen (-> Listenübersicht) >> die Anzahl der Todos der jeweiligen Liste wird mitgegeben (list.count)
```javascript
function testGetAllLists() {

  _api.getAllLists().forEach(list => {
    // zwei Angaben
    console.log(`listName: ${list.listName}`);
    console.log(`anzahl todos: ${list.count}`);

    // your code: here for example build html-code to add to your nav-bar
    let navListElement = createNavListElement(list.listName, list.count)
    document.getElementById('navbar').appendChild(navListElement)
  })
}
```

> alle Todo's einer Liste holen und ausgeben
```javascript
function testGetListTodos() {
  // Liste 'shopping' holen
  const todos = _api.getList('shopping')
  
  // ueber todos iterieren   
  todos.forEach(todo => {
    console.log(`\n ---Todo >> id: ${todo.id}`);
    console.log(`beschreibung: ${todo.description}`);
    console.log(`erstellt am: ${todo.dateCreation.toLocaleString()}`);

    // your code: here for example build html-code to add to your <main> section (o.ä.)
    let todoDivElement = createTodoDivElement(todo.id, todo.description, todo.dateCreation ...) // oder nur "todo" als parameter uebergeben
    document.getElementById('main').appendChild(todoDivElement)
  })
}
```

> eine neue Liste hinzufügen
```javascript
function testAddNewList() {
  
  const todo = _api.addList('shopping')

  if(!todo) {
    // error -> Listenname schon vergeben
  } else {
    console.log(`\n ---Todo >> id: ${todo.id}`);
    console.log(`beschreibung: ${todo.description}`); // Pseudo-Eintrag -> 'Neuer Eintrag'
    console.log(`erstellt am: ${todo.dateCreation.toLocaleString()}`);
  }

}
```

> ein Todo mit 'id' holen
```javascript
function testGetTodo() {
  
  const todoId = 7
  // wird ueber id geholt
  const todo = _api.getTodo(todoId)

  if(!todo) {
    // error -> nicht gefunden
    console.error('Todo nicht gefunden!');
  } else {
    console.log(`\n ---Todo >> id: ${todo.id}`);
    console.log(`beschreibung: ${todo.description}`);
    console.log(`erstellt am: ${todo.dateCreation.toLocaleString()}`);    
    console.log(`erledigt?: ${todo.isCompleted}`);
  }
}
```

> ein neues Todo generieren
```javascript
function testCreateTodo() {

  const listName = 'shopping'
  const description = 'Meine Todo-Beschreibung'

  let newTodo = _api.createTodo(listName, description)

  // oder aber auch mit zusätzlichen Parametern, z.B. Reihenfolge
  const order = 3 
  let newTodo = _api.createTodo(listName, description, order)

  console.log(`\n ---Todo >> id: ${newTodo.id}`);
  console.log(`beschreibung: ${newTodo.description}`);
  console.log(`erstellt am: ${newTodo.dateCreation.toLocaleString()}`);   

  // zum Speichern in localStorge die 'addTodo'-Funktion aufrufen
  _api.addTodo(newTodo)
}
```

> diverse Todo Operationen -> werden automatisch in localStorage gespeichert
```javascript
function testEditTodo() {

  // eindeutige Id des Todos (z.B. Speichern in einem <input type="hidden">)
  const todoId = 7

  // Beispiel fuer Umbenennen
  _api.renameTodo(todoId, 'new Todo-Description')

  // Beispiel fuer Löschen
  _api.removeTodo(todoId)

  // Beispiel fuer Erledigen
  _api.completeTodo(todoId)

  // Beispiel fuer Zurücksetzen 
  _api.uncompleteTodo(todoId)
}
```
