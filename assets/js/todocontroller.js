
/*
import todos from ".todomodel.js";
*/


function handleTodoSorting(event) {
    const buttonId = event.target.id;
    
    let sortedTodos = todos;
    switch(buttonId) {
        case "btn-sort-by-title":
        sortedTodos = sortTodosByTitle();
        break;

        case "btn-sort-by-duedate":
        sortedTodos = sortTodosByDueDate();
        break;

        case "btn-sort-by-creationdate":
        sortedTodos = sortTodosByCreationDate();
        break;

        case "btn-sort-by-importance":
        sortedTodos = sortTodosByImportance();
        break;
    }

    renderTodosWithHtml(createTodosHtml(sortedTodos));
}

function attachSortButtonEventHandlers() {
    let button = document.querySelector("#btn-sort-by-title");
    button.addEventListener('click', handleTodoSorting);

    button = document.querySelector("#btn-sort-by-duedate");
    button.addEventListener('click', handleTodoSorting);

    button= document.querySelector("#btn-sort-by-creationdate");
    button.addEventListener('click', handleTodoSorting);

    button = document.querySelector("#btn-sort-by-importance");
    button.addEventListener('click', handleTodoSorting);
};
attachSortButtonEventHandlers();


function createTodosHtml(todos) {
    return todos.map(todo => `
        <li class="todo-list-item">
        <div class="todo-list-item-container">
            <div class="todo-item-due-date">${todo.duedate}</div>
            <div class="todo-item-title">${todo.title}</div>
            <div class="todo-item-importance">${todo.importance}</div>
            <div class="todo-item-description">${todo.description}</div>
            <div class="todo-item-isdone">
                <input type="checkbox" id="todo-item-isdone-1">
                <label class="todo-item-checkbox-lbl" for="todo-item-isdone-1">${todo.isdone ? 'Completed' : 'Open'}</label>
            </div>
            <div class="todo-item-btn">
                <button class="btn">Edit</button>
            </div>
        </div>
        <hr>
    </li>        
    `).join('');
}

function renderTodosWithHtml(todosHtml) {
    const todoListElement = document.querySelector("#todos");
    todoListElement.innerHTML = todosHtml;
}

function renderTodos() {
    let todosHtml = createTodosHtml(todos);
    renderTodosWithHtml(todosHtml);
}

/*
let observer = new MutationObserver(function(mutations) {
    if (document.contains(document.querySelector("#todos"))) {
        observer.disconnect();
        renderTodos();
    }
});

observer.observe(document, {attributes: false, childList: true, characterData: false, subtree: true});
*/

renderTodos();

/*
export { todoListElement };
*/