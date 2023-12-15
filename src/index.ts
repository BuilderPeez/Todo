const btnSubmit = document.querySelector('.todo-btn') as HTMLButtonElement;
const inputTodo = document.querySelector('.todo-input') as HTMLInputElement;
const formTodo = document.querySelector('.todo-form') as HTMLFormElement;
const todoList =document.querySelector('.todo-list') as HTMLLIElement;
const btnDeleteAll = document.querySelector('.todo-delete-all') as HTMLButtonElement;

const handleSubmit = (e: Event) => {
    e.preventDefault();

    const newTodo: Todo = {
        id:Date.now(),
        todo: inputTodo.value,
        completed: false
    };
    // TODO save todo to lacal storage
    todos.push(newTodo);
    //save to the local storage
    saveTodos();
    // Append new todo
    appendTodo(newTodo);

   

    //Reset Input
    inputTodo.value = ''
};

//save todos
const saveTodos = ()=>{
    localStorage.setItem('todos', JSON.stringify(todos));
}

//new todo interface
interface Todo {
    id: number,
    todo: string,
    completed: boolean
}

// new todos arrey
const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
console.log(todos);
// append new todos to the DOM on start
window.addEventListener('DOMContentLoaded', () => {
    todos.forEach(todo => appendTodo(todo));
})

// Append Todo function 
const appendTodo = (newTodo: Todo) =>{
    const newLi = document.createElement('li');
    const checkB = document.createElement('input')
    checkB.type = "checkbox";
    checkB.checked = newTodo.completed
    //Add checkbox event listener
    checkB.addEventListener('change', () => {
        console.log('checked');
        newTodo.completed = checkB.checked;
    });
    newLi.append(newTodo.todo, checkB);
    todoList.prepend(newLi);
}

formTodo.addEventListener('submit', e => handleSubmit(e));

//delete all
const clearTodos = ()=>{
    todos.length = 0;
    saveTodos();
    todoList.innerHTML = "";
};
btnDeleteAll.addEventListener('click', ()=>{
    clearTodos();
});