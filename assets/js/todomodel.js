/*
window.addEventListener("load", function(event) {
    this.alert("Document load was called!");
});
*/

const todos = [
    {id: '1', creationdate: "1975-01-01", duedate: '2022-05-24', title: "Fräsen fräsen", importance: 1, description: "Fräsen müssten mal wieder gefräst werden.", isdone: false},
    {id: '3', creationdate: "1981-01-12", duedate: '1999-12-31', title: "Weltfrieden", importance: 5, description: "Make love, not war.", isdone: false},
    {id: '2', creationdate: "2011-10-01", duedate: '2024-12-31', title: "Kuchen essen", importance: 4, description: "Make cake, not tarte.", isdone: true},
    {id: '4', creationdate: "2010-08-23", duedate: '1998-04-05', title: "Erwachsenwerden", importance: 3, description: "", isdone: true},
    {id: '6', creationdate: "2019-05-19", duedate: '2021-11-01', title: "Ferien machen", importance: 1, description: "Mal wieder Ferien machen", isdone: false},
];


function sortTodos(compareFunction) {
    return [...todos].sort(compareFunction);
}


function compareTodosByTitle(todo1, todo2) {
    return todo1.title.localeCompare(todo2.title);
}
function sortTodosByTitle() {
    return sortTodos(compareTodosByTitle);
}


function compareTodosByDueDate(todo1, todo2) {
    let date1 = Date.parse(todo1.duedate);
    let date2 = Date.parse(todo2.duedate);
    return date1 - date2;
}
function sortTodosByDueDate() {
    return sortTodos(compareTodosByDueDate);
}


function compareTodosByCreationDate(todo1, todo2) {
    let date1 = Date.parse(todo1.creationdate);
    let date2 = Date.parse(todo2.creationdate);
    return date1 - date2;
}
function sortTodosByCreationDate() {
    return sortTodos(compareTodosByCreationDate);
}


function compareTodosByImportance(todo1, todo2) {
    let delta = todo1.importance - todo2.importance;
    return delta * -1;
}
function sortTodosByImportance() {
    return sortTodos(compareTodosByImportance);
}



/*
export default { todos };
*/