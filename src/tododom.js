var lists = document.getElementById("lists");
var todos = document.getElementById("todos");

var count = 0;

function createToDoElement(typeofElement, content = ""){
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
            let list = document.createElement("button");
            list.onclick=function() { showList(count); };
            list.innerHTML = content;

            /*let trashcan = document.createElement("button");
            trashcan.onclick=function() { deleteElement(todo); };

            let pen = document.createElement("button");
            pen.onclick=function() { editElement(todo); };

            todo.appendChild(trashcan);
            todo.appendChild(pen);*/

            list.id = "list" + count;
            count++;

            list.style = "height: 150px; background-color: green;"
            list.classList.add("class");
            
            lists.appendChild(list);
            break;
    }
    
}

function showList(listIndex){
    
}

function deleteElement(todoElement){
    console.log("test" + todoElement.id);
}

function editElement(todoElement){
    console.log("test2" + todoElement.id);
}