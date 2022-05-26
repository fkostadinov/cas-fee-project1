const todoItem1 = new TodoItem("Fräsen fräsen", "Fräsen müssten mal wieder gefräst werden.", 1, "2022-05-24", false);
todoItem1.creationdate = "1975-01-01";

const todoItem2 = new TodoItem("Weltfrieden", "Make love, not war.", 5, "1999-12-31", false);
todoItem2.creationdate = "1981-01-12";

const todoItem3 = new TodoItem("Kuchen essen", "Make cake, not tarte.", 4, "2024-12-31", true);
todoItem3.creationdate = "2011-10-01";

const todoItem4 = new TodoItem("Erwachsenwerden", "", 3, "1998-04-05", true);
todoItem4.creationdate = "2010-08-23";

const todoItem5 = new TodoItem("Ferien machen", "Mal wieder Ferien machen", 1, "2021-11-01", false);
todoItem5.creationdate = "2019-05-19";


const todos = [
    {id: todoItem1.id, creationdate: todoItem1.creationdate, duedate: todoItem1.duedate, title: todoItem1.title, importance: todoItem1.importance, description: todoItem1.description, isdone: todoItem1.isdone},
    {id: todoItem2.id, creationdate: todoItem2.creationdate, duedate: todoItem2.duedate, title: todoItem2.title, importance: todoItem2.importance, description: todoItem2.description, isdone: todoItem2.isdone},
    {id: todoItem3.id, creationdate: todoItem3.creationdate, duedate: todoItem3.duedate, title: todoItem3.title, importance: todoItem3.importance, description: todoItem3.description, isdone: todoItem3.isdone},
    {id: todoItem4.id, creationdate: todoItem4.creationdate, duedate: todoItem4.duedate, title: todoItem4.title, importance: todoItem4.importance, description: todoItem4.description, isdone: todoItem4.isdone},
    {id: todoItem5.id, creationdate: todoItem5.creationdate, duedate: todoItem5.duedate, title: todoItem5.title, importance: todoItem5.importance, description: todoItem5.description, isdone: todoItem5.isdone},
];


function filterTodosByCompletion(_todos) {
    return _todos.filter(todo => todo.isdone === false);
}

function sortTodos(_todos, compareFunction) {
    return [..._todos].sort(compareFunction);
}


function compareTodosByTitleAsc(todo1, todo2) {
    return todo1.title.localeCompare(todo2.title);
}
function compareTodosByTitleDesc(todo1, todo2) {
    return todo2.title.localeCompare(todo1.title);
}
function sortTodosByTitle(_todos, sortOrder) {
    return sortOrder === "ascending" ? sortTodos(_todos, compareTodosByTitleAsc) : sortTodos(_todos, compareTodosByTitleDesc);
}


function compareTodosByDueDateAsc(todo1, todo2) {
    let date1 = Date.parse(todo1.duedate);
    let date2 = Date.parse(todo2.duedate);
    return date1 - date2;
}
function compareTodosByDueDateDesc(todo1, todo2) {
    let date1 = Date.parse(todo1.duedate);
    let date2 = Date.parse(todo2.duedate);
    return date2 - date1;
}
function sortTodosByDueDate(_todos, sortOrder) {
    return sortOrder === "ascending" ? sortTodos(_todos, compareTodosByDueDateAsc) : sortTodos(_todos, compareTodosByDueDateDesc);
}


function compareTodosByCreationDateAsc(todo1, todo2) {
    let date1 = Date.parse(todo1.creationdate);
    let date2 = Date.parse(todo2.creationdate);
    return date1 - date2;
}
function compareTodosByCreationDateDesc(todo1, todo2) {
    let date1 = Date.parse(todo1.creationdate);
    let date2 = Date.parse(todo2.creationdate);
    return date2 - date1;
}
function sortTodosByCreationDate(_todos, sortOrder) {
    return sortOrder === "ascending" ? sortTodos(_todos, compareTodosByCreationDateAsc) : sortTodos(_todos, compareTodosByCreationDateDesc);
}


function compareTodosByImportanceAsc(todo1, todo2) {
    let delta = todo1.importance - todo2.importance;
    return delta;
}
function compareTodosByImportanceDesc(todo1, todo2) {
    let delta = todo2.importance - todo1.importance;
    return delta;
}
function sortTodosByImportance(_todos, sortOrder) {
    return sortOrder === "ascending" ? sortTodos(_todos, compareTodosByImportanceAsc) : sortTodos(_todos, compareTodosByImportanceDesc);
}



/*
export default { todos };
*/