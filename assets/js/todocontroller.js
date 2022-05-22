
/*
import todos from ".todomodel.js";
*/



/* ------------------ Sorting & Filtering -------------------- */

function isFilterActive() {
    let filterButton = document.querySelector("#btn-filter-by-completion");
    let hasFilterAttrSet = filterButton.hasAttribute("data-is-active");
    if (hasFilterAttrSet) {
        // Attention: Remember Boolean("false") === true // true!!!
        return Boolean(filterButton.getAttribute("data-is-active") === "true");
    }
    else {
        return false;
    }
}

function attachSortButtonEventHandlers() {
    const handleTodoSorting = function(event) {
        const buttonId = event.target.id;
        
        let sortedTodos = undefined;
        switch(buttonId) {
            case "btn-sort-by-title":
            sortedTodos = sortTodosByTitle(todos);
            break;
    
            case "btn-sort-by-duedate":
            sortedTodos = sortTodosByDueDate(todos);
            break;
    
            case "btn-sort-by-creationdate":
            sortedTodos = sortTodosByCreationDate(todos);
            break;
    
            case "btn-sort-by-importance":
            sortedTodos = sortTodosByImportance(todos);
            break;
        }
    
        // Check if filtering is applied currently. If so, only render those elements
        // that are not filtered out.
        if (isFilterActive()) {
            sortedTodos = filterTodosByCompletion(sortedTodos);
        }

        let todosHtml = createTodosHtml(sortedTodos);
        renderTodosWithHtml(todosHtml);
    }

    document.querySelector("#btn-sort-by-title").addEventListener("click", handleTodoSorting);
    document.querySelector("#btn-sort-by-duedate").addEventListener("click", handleTodoSorting);
    document.querySelector("#btn-sort-by-creationdate").addEventListener("click", handleTodoSorting);
    document.querySelector("#btn-sort-by-importance").addEventListener("click", handleTodoSorting);
};
attachSortButtonEventHandlers();


function attachFilterButtonEventHandlers() {
    const handleTodoFiltering = function(event) {

        const filterButton = event.target;
        let filteredTodos = undefined;

        // We toggle the filter button back and forth between on (active) and off (inactive).
        // If previously not set at all, then we set it to true now.
        // If previously set to true, then we set to false now.
        // If previously set to false, then we set to true now.
        if (filterButton.hasAttribute("data-is-active")) {
            if (filterButton.getAttribute("data-is-active") == "true") {
                filterButton.setAttribute("data-is-active", "false");
                filteredTodos = todos;
            }
            else {
                filterButton.setAttribute("data-is-active", "true");
                filteredTodos = filterTodosByCompletion(todos);
            }
        }
        else {
            filterButton.setAttribute("data-is-active", "true");
            filteredTodos = filterTodosByCompletion(todos);
        }

        let todosHtml = createTodosHtml(filteredTodos);
        renderTodosWithHtml(todosHtml);    
        
    }
    
    document.querySelector("#btn-filter-by-completion").addEventListener("click", handleTodoFiltering);
}
attachFilterButtonEventHandlers();

/* ------------------ Rendering -------------------- */

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