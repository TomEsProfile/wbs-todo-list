# wbs-todo-list
wbs week 3+4 Todo List

## kleine Beschreibung der Todo-List Api
[localStorageApi.js](src/localStorageApi.js)

### Übersicht der Api-Funktionen

> Listen-Funktionen
```javascript
// einen neue Liste hinzufügen
function addList(listName)

// alle Listen holen
function getAllLists()

// Liste holen (liefert alle Todos der Liste)
function getList(listName)
```


> Todo-Funktionen
```javascript
// eine Todo mit 'id' holen
function getTodo(id)

// ein Todo hinzufuegen (erwartet ein Objekt der Klasse 'Todo' [siehe unten])
function addTodo(todo)

// ein Todo in der Liste 'ersetzen' (erwartet ein Objekt der Klasse 'Todo' [siehe unten])
function editTodo(todo) 

// ein Todo löschen
function removeTodo(id)

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

> alle Listen holen und ausgeben
```javascript
function testGetAllLists() {

  getAllLists().forEach(list => {
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
  const todos = getList('shopping')
  
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
  
  const todo = addList('shopping')

  if(!todo) {
    // error -> Listenname schon vergeben
  } else {
    console.log(`\n ---Todo >> id: ${todo.id}`);
    console.log(`beschreibung: ${todo.description}`); // Pseudo-Eintrag -> 'Neuer Eintrag'
    console.log(`erstellt am: ${todo.dateCreation.toLocaleString()}`);
  }

}
```


> Vorlage
```javascript
```