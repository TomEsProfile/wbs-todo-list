console.log('todo list!')

window.addEventListener("load", function(event) {
    console.log('seite fertig geladen');

    // ... ab hier dann die Seite aufbauen mit den Daten aus der LocalStorage
    // getListTypes().forEach(list => {
    //     const div = createListDiv()
    //     div.className = ''

    //     this.document.getElementById('sidebar').appendChild(div)
    // })
})

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