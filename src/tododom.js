var lists = document.getElementById("elementAddList");
var todos = document.getElementById("listElement");

var count = 0;

function createToDoElement(typeofElement, content = "test", isCreated = false){
    switch(typeofElement){
        case 'todo':
            let todo = document.createElement("div");
            todo.innerHTML = content;

            let trashcan = document.createElement("button");
            trashcan.onclick=function() { deleteElement(todo); };

            let pen = document.createElement("button");
            pen.onclick=function() { editElement(todo); };

            todo.appendChild(trashcan);
            todo.appendChild(pen);

            todo.id = "todo" + count;
            count++;

            todo.style = "height: 150px; background-color: coral;"
            todo.classList.add("class");
            
            todos.appendChild(todo);
            break;
        case 'list':
            let list = document.createElement("li");
            let listButton = document.createElement("button");
            if (isCreated === true) {
                let listInput = document.createElement("input");
                listInput.type = "text";
                listButton.appendChild(listInput);
                listInput.addEventListener("keydown", function(event) {
             if (event.key === "Enter") {
                event.preventDefault();
                addNewList(list);
            
            }
        });
            } else {
                listButton.innerHTML = content;
            } 
            listButton.onclick=function() { showList(content); };
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

function showListList(){
    var allLists = getAllLists();
    allLists.forEach((element) => {
        createToDoElement("list", content = element.listName)
        console.log({ element });
    });
}

function showList(listName){
    clearListArea();
    var allELements = getList(listName);
    allELements.forEach((element) => {
        createToDoElement("todo", content = element.type)
        console.log({ element });
    });
}
/* bitte zu Ende schreiben*/
function addNewList(listName){
   addList(listName);
}

function deleteElement(todoElement){
    console.log("test" + todoElement.id);
}

function editElement(todoElement){
    console.log("test2" + todoElement.id);
}

function clearListArea() {
	var col_wrapper = document.getElementById("listElement");
	while (col_wrapper.firstChild) {
    	col_wrapper.removeChild(col_wrapper.lastChild);
  	}
}