console.log("todo.js");

window.addEventListener("load", function (event) {
  console.log("seite fertig geladen");
  showListList();
  // ... ab hier dann die Seite aufbauen mit den Daten aus der LocalStorage
  // getListTypes().forEach(list => {
  //     const div = createListDiv()
  //     div.className = ''

  //     this.document.getElementById('sidebar').appendChild(div)
  // })
});

if (_api.globalTodoList.length < 3) {
  _api.addTodo(_api.createTodo("haushalt", "Saugen"));
}

// console.log(globalTodoList);

const buttonAddList = document.getElementById("buttonAddList");

function addListToDom(event) {
  const lists = _api.getLists();
  console.log(lists);
  lists.forEach((list) => {
    console.log(list.type);
    console.log(list.count);
  });
}

buttonAddList.addEventListener("click", addListToDom);
