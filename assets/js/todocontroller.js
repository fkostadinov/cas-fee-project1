
/*
import todos from ".todomodel.js";
*/



/* ------------------ Sorting & Filtering -------------------- */

class SortingController {
    constructor() {
        this.buttonSortByTitle = document.querySelector("#btn-sort-by-title");
        this.buttonSortByDueDate = document.querySelector("#btn-sort-by-duedate");
        this.buttonSortByCreationDate = document.querySelector("#btn-sort-by-creationdate");
        this.buttonSortByImportance = document.querySelector("#btn-sort-by-importance");
        //const sortButtonList = [buttonSortByTitle, buttonSortByDueDate, buttonSortByCreationDate, buttonSortByImportance];

        this.activeSorter = undefined;
        this.isAscending = true; // true: ascending, false: descending
    }

    // Event handler for sorting buttons
    handleSorting(event) {
        const button = event.target;

        // If previous sorter is same as new one, just toggle the sort order
        if (!(this.activeSorter === undefined) && this.activeSorter.id === button.id) {
            this.isAscending = !this.isAscending;
        }

        this.activeSorter = button;
        let sortOrder = this.isAscending ? "ascending" : "descending";
        let sortedTodos = todos;

        switch(button.id) {
            case "btn-sort-by-title":
                sortedTodos = sortTodosByTitle(todos, sortOrder);
            break;
    
            case "btn-sort-by-duedate":
                sortedTodos = sortTodosByDueDate(todos, sortOrder);
            break;
    
            case "btn-sort-by-creationdate":
                sortedTodos = sortTodosByCreationDate(todos, sortOrder);
            break;
    
            case "btn-sort-by-importance":
                sortedTodos = sortTodosByImportance(todos, sortOrder);
            break;
        }

        // Check if filtering is applied currently. If so, only render those elements
        // that are not filtered out.
        if (filter.isActive) {
            sortedTodos = filterTodosByCompletion(sortedTodos);
        }  
        
        let todosHtml = createTodosHtml(sortedTodos);
        renderTodosWithHtml(todosHtml);
    }

    attachSortButtonEventHandlers() {
        this.buttonSortByTitle.addEventListener("click", this.handleSorting.bind(this));
        this.buttonSortByDueDate.addEventListener("click", this.handleSorting.bind(this));
        this.buttonSortByCreationDate.addEventListener("click", this.handleSorting.bind(this));
        this.buttonSortByImportance.addEventListener("click", this.handleSorting.bind(this));
    }
}
const sorter = new SortingController();
sorter.attachSortButtonEventHandlers();



class FilterController {
    constructor() {
        this.isActive = false;
    }

    // Event handler for filter button
    handleTodoFiltering(event) {
        // Toggle filter activity state
        this.isActive = !this.isActive;
        let filteredTodos = todos;
        if (this.isActive) {
            filteredTodos = filterTodosByCompletion(todos);
        }
        let todosHtml = createTodosHtml(filteredTodos);
        renderTodosWithHtml(todosHtml);
    }

    attachFilterButtonEventHandlers() {
        document.querySelector("#btn-filter-by-completion").addEventListener("click", this.handleTodoFiltering.bind(this));
    }
}
const filter = new FilterController();
filter.attachFilterButtonEventHandlers();



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