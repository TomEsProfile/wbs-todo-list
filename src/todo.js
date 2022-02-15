console.log('todo list!')

if(globalTodoList.length < 3) {
    addTodo(createTodo('haushalt', 'Saugen'))
}

console.log(globalTodoList);

const buttonAddList = document.getElementById("buttonAddList")

function addList (event) {
    const lists = getListTypes();
    console.log(lists); 
    lists.forEach( (list) => {
     console.log(list.type)
     console.log(list.count)
    })
}

buttonAddList.addEventListener("click", addList);