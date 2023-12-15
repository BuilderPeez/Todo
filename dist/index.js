"use strict";
const btnSubmit = document.querySelector('.todo-btn');
const inputTodo = document.querySelector('.todo-input');
const formTodo = document.querySelector('.todo-form');
const todoList = document.querySelector('.todo-list');
const btnDeleteAll = document.querySelector('.todo-delete-all');
const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
        id: Date.now(),
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
    inputTodo.value = '';
};
//save todos
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};
// new todos arrey
const todos = JSON.parse(localStorage.getItem('todos') || '[]');
console.log(todos);
// append new todos to the DOM on start
window.addEventListener('DOMContentLoaded', () => {
    todos.forEach(todo => appendTodo(todo));
});
// Append Todo function 
const appendTodo = (newTodo) => {
    const newLi = document.createElement('li');
    const checkB = document.createElement('input');
    checkB.type = "checkbox";
    checkB.checked = newTodo.completed;
    //Add checkbox event listener
    checkB.addEventListener('change', () => {
        console.log('checked');
        newTodo.completed = checkB.checked;
    });
    newLi.append(newTodo.todo, checkB);
    todoList.prepend(newLi);
};
formTodo.addEventListener('submit', e => handleSubmit(e));
//delete all
const clearTodos = () => {
    todos.length = 0;
    saveTodos();
    todoList.innerHTML = "";
};
btnDeleteAll.addEventListener('click', () => {
    clearTodos();
});
