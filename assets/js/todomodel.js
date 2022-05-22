const todos = [
    {id: '1', creationdate: "1975-01-01", duedate: '2022-05-24', title: "Fräsen fräsen", importance: 1, description: "Fräsen müssten mal wieder gefräst werden.", isdone: false},
    {id: '3', creationdate: "1981-01-12", duedate: '1999-12-31', title: "Weltfrieden", importance: 5, description: "Make love, not war.", isdone: false},
    {id: '2', creationdate: "2011-10-01", duedate: '2024-12-31', title: "Kuchen essen", importance: 4, description: "Make cake, not tarte.", isdone: true},
    {id: '4', creationdate: "2010-08-23", duedate: '1998-04-05', title: "Erwachsenwerden", importance: 3, description: "", isdone: true},
    {id: '6', creationdate: "2019-05-19", duedate: '2021-11-01', title: "Ferien machen", importance: 1, description: "Mal wieder Ferien machen", isdone: false},
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