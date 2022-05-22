
/*
import todos from ".todomodel.js";
*/



/* ------------------ Sorting & Filtering -------------------- */

function attachSortButtonEventHandlers() {
    const buttonSortByTitle = document.querySelector("#btn-sort-by-title");
    const buttonSortByDueDate = document.querySelector("#btn-sort-by-duedate");
    const buttonSortByCreationDate = document.querySelector("#btn-sort-by-creationdate");
    const buttonSortByImportance = document.querySelector("#btn-sort-by-importance");
    const sortButtonList = [buttonSortByTitle, buttonSortByDueDate, buttonSortByCreationDate, buttonSortByImportance];

    const handleTodoSorting = function(event) {
        const button = event.target;
        
        const parentEl = event.target.parentElement; // id: todo-list-sort-btns
        let oldSortButtonId = undefined;

        if (parentEl.hasAttribute("data-active-sort-btn-by-id")) {
            oldSortButtonId = parentEl.getAttribute("data-active-sort-btn-by-id");
        }

        // Set the new active sort button as an attribute
        parentEl.setAttribute("data-active-sort-btn-by-id", button.id);

        let newSortOrder = undefined;
        if (oldSortButtonId === button.id) {
            // Toggle sort order as same button was pressed as already active
            let oldSortOrder = parentEl.getAttribute("data-active-sort-order");
            newSortOrder = oldSortOrder === "ascending" ? "descending" : "ascending";
        }
        else {
            // TODO: Here we could potentially have dedicated default sort orders for
            // each type of button. In another life, maybe...
            newSortOrder = "ascending";
        }
        parentEl.setAttribute("data-active-sort-order", newSortOrder);


        let sortedTodos = undefined;
        switch(button.id) {
            case "btn-sort-by-title":
                sortedTodos = sortTodosByTitle(todos, newSortOrder);
            break;
    
            case "btn-sort-by-duedate":
                sortedTodos = sortTodosByDueDate(todos, newSortOrder);
            break;
    
            case "btn-sort-by-creationdate":
                sortedTodos = sortTodosByCreationDate(todos, newSortOrder);
            break;
    
            case "btn-sort-by-importance":
                sortedTodos = sortTodosByImportance(todos, newSortOrder);
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

    sortButtonList.forEach(b => b.addEventListener("click", handleTodoSorting));
};
attachSortButtonEventHandlers();


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