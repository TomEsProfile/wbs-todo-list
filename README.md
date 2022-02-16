# wbs-todo-list
wbs week 3+4 Todo List

## kleine Beschreibung der Todo-List Api
[localStorageApi.js](src/localStorageApi.js)

### Übersicht der Api-Funktionen

> Listen-Funktionen
```
// einen neue Liste hinzufügen
function addList(listName)

// alle Listen holen
function getAllLists()

// Liste holen (liefert alle Todos der Liste)
function getList(listName)
```


> Todo-Funktionen
```
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
```
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

> Beispiel Implementiereungen
...

