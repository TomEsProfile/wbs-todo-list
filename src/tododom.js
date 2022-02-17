var lists = document.getElementById("elementAddList");
var todos = document.getElementById("listElement");

var count = 0;

function createToDoElement(typeofElement, data, isCreated = false) {
  switch (typeofElement) {
    case "todo":
      let todo = document.createElement("div");
      todo.innerHTML = data.description;

      let trashcan = document.createElement("button");
      trashcan.innerHTML = '<i class="fas fa-trash">';
      trashcan.onclick = function () {
        deleteElement(data);
      };

      let pen = document.createElement("button");
      pen.innerHTML = '<i class="fa fa-edit">';
      pen.onclick = function () {
        editElement(data);
      };

      let formToDo = document.createElement("form");
      let input = document.createElement("input");
      input.type = "hidden";
      input.id = "todoDescription" + data.id;
      input.value = data.description;
      formToDo.action = "#";
      formToDo.onsubmit = function (event) {
        console.log(event.target)
      }

      todo.appendChild(formToDo);
      formToDo.appendChild(input);
      todo.appendChild(trashcan);
      todo.appendChild(pen);

      todo.id = "todo" + count;
      count++;

      // todo.style = "height: 150px; background-color: coral;";
      todo.classList.add("div-todo");

      todos.appendChild(todo);
      break;
    case "list":
      let list = document.createElement("li");
      let listButton = document.createElement("button");

      if (isCreated === true) {
        let listInput = document.createElement("input");
        listInput.type = "text";
        listButton.appendChild(listInput);
        listInput.addEventListener("keydown", function (event) {
          if (event.key === "Enter") {
            event.preventDefault();
            const listName = event.target.value;
            addNewList(listName);
            showListList(listName);
          }
        });
        clearListArea();

      } else {
        listButton.innerHTML = `${data.listName} (${data.count})`;
      }
      listButton.onclick = function () {
        showList(data.listName);
      };
      list.appendChild(listButton);

      /*let trashcan = document.createElement("button");
            trashcan.onclick=function() { deleteElement(todo); };

            let pen = document.createElement("button");
            pen.onclick=function() { editElement(todo); };

            todo.appendChild(trashcan);
            todo.appendChild(pen);*/

      //list.id = "list" + count;
      //count++;

      //list.style = "height: 150px; background-color: green;"
      list.classList.add("listToDo");

      lists.appendChild(list);
      break;
  }
}

function showListList(listName) {
  clearListBar();
  var allLists = _api.getAllLists();
  allLists.forEach((element) => {
    createToDoElement("list", element);
    console.log({ element });
  });

  if (!listName && allLists.length) {
    listName = allLists[0].listName;
  }

  console.log(`listName: ${listName}`);
  showList(listName);
}

function showList(listName) {
  clearListArea();
  document.getElementById("inputNewTodoListName").value = listName;

  var allELements = _api.getList(listName);
  allELements.forEach((element) => {
    createToDoElement("todo", element);
    console.log({ element });
  });
}

function formSubmitCreateTodo(event) {
  console.log("formSubmitCreateTodo");
  event.preventDefault();

  const listName = document.getElementById("inputNewTodoListName").value;
  const description = document.getElementById("inputNewTodoText").value;
  if (description.trim() === "") {
    alert("Please type some text");

  }
  console.log(description.trim());

  console.log(`${listName} - ${description}`);

  const todo = _api.createTodo(listName, description);
  _api.addTodo(todo);

  showListList(listName);
}

/* bitte zu Ende schreiben*/
function addNewList(listName) {
  console.log(`listName: ${listName}`);
  _api.addList(listName);
}

function deleteElement(todoElement) {
  console.log("deleteElement >> id: " + todoElement.id);
  const listName = todoElement.listName
  _api.removeTodo(todoElement.id)
  showList(listName)
}

function editElement(todoElement) {
  console.log("editElement >> id: " + todoElement.id);
  const edit = document.getElementById("todoDescription" + todoElement.id);
  console.log(edit.value);
}

function clearListBar() {
  var col_wrapper = document.getElementById("elementAddList");
  while (col_wrapper.firstChild) {
    col_wrapper.removeChild(col_wrapper.lastChild);
  }
  console.log('ListBar cleared');
}

function clearListArea() {
  var col_wrapper = document.getElementById("listElement");
  while (col_wrapper.firstChild) {
    col_wrapper.removeChild(col_wrapper.lastChild);
  }
}
