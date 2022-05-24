
/*
import todos from ".todomodel.js";
*/


/* ------------------ Rendering -------------------- */

class Renderer {
    constructor() {
        this.todoListEl = document.querySelector("#todos");
    }

    createTodosHtml(todos) {
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
    
    renderTodosWithHtml(todosHtml) {
        this.todoListEl.innerHTML = todosHtml;
    }
    
    renderTodos() {
        let todosHtml = this.createTodosHtml(todos);
        this.renderTodosWithHtml(todosHtml);
    }
    
}
const renderer = new Renderer();
renderer.renderTodos();


/* ------------------ Bright vs dark mode -------------------- */
class ToggleStyleController {
    constructor() {
        this.buttonToggleStyle = document.querySelector("#btn-toggle-style");
        this.isInDarkMode = false;   
    }

    handleToggleStyleButtonClick(event) {
        this.isInDarkMode = !this.isInDarkMode;

        if (this.isInDarkMode) {
            document.body.style.backgroundColor = "var(--color-near-black)";
            document.body.style.color = "var(--color-white)";
        }
        else {
            document.body.style.backgroundColor = "var(--color-near-white)";
            document.body.style.color = "var(--color-black)";
        }
    }

    attachToggleStyleEventHandlers() {
        this.buttonToggleStyle.addEventListener("click", this.handleToggleStyleButtonClick.bind(this));
    }
}
const toggleStyleController = new ToggleStyleController();
toggleStyleController.attachToggleStyleEventHandlers();


/* ------------------ Creating & Updating -------------------- */

class CreateTodoController {

    constructor() {
        this.buttonCreateTodo = document.querySelector("#btn-create-todo");
        this.todoListEl = document.querySelector("#todo-list-container");
        this.todoFormEl = document.querySelector("#todo-form-container");
    }

    handleCreateButtonClick(event) {
        this.buttonCreateTodo.style.visibility = "hidden";
        this.todoListEl.style.display = "none";

        // Be aware that the todo-list-form element must use display "flex", not "block"
        this.todoFormEl.style.display = "flex";
    }

    attachCreateButtonEventHandlers() {
        this.buttonCreateTodo.addEventListener("click", this.handleCreateButtonClick.bind(this));
    }
}
const createController = new CreateTodoController();
createController.attachCreateButtonEventHandlers();


class EditTodoController {
    constructor() {
        this.buttonCreateTodo = document.querySelector("#btn-create-todo");
        this.todoListEl = document.querySelector("#todo-list-container");
        this.todoFormEl = document.querySelector("#todo-form-container");

        this.buttonSave = document.querySelector("#btn-save-todo");
        this.buttonSaveOverview = document.querySelector("#btn-save-todo-and-overview");
        this.buttonCancel = document.querySelector("#btn-cancel-todo");
    }

    handleEditButtonClick(event) {
        // We're inside the form tag, so prevent default form submission.
        event.preventDefault();

        const button = event.target;

        switch(button.id) {
            case "btn-save-todo":
            // TODO: save...
            break;

            case "btn-save-todo-and-overview":
            // TODO: save...
            this.buttonCreateTodo.style.visibility = "visible";
            this.todoFormEl.style.display = "none";
            this.todoListEl.style.display = "block";
            break;

            case "btn-cancel-todo":
            this.buttonCreateTodo.style.visibility = "visible";
            this.todoFormEl.style.display = "none";
            this.todoListEl.style.display = "block";
            break;
        }
    }

    attachEditButtonEventHandlers() {
        this.buttonSave.addEventListener("click", this.handleEditButtonClick.bind(this));
        this.buttonSaveOverview.addEventListener("click", this.handleEditButtonClick.bind(this));
        this.buttonCancel.addEventListener("click", this.handleEditButtonClick.bind(this));
    }
}
const editTodoController = new EditTodoController();
editTodoController.attachEditButtonEventHandlers();


/* ------------------ Sorting & Filtering -------------------- */

class FilterTodoController {
    constructor(renderer) {
        this.renderer = renderer;
        this.isActive = false;
    }

    // Event handler for filter button
    handleFilterButtonClick(event) {
        // Toggle filter activity state
        this.isActive = !this.isActive;
        let filteredTodos = todos;
        if (this.isActive) {
            filteredTodos = filterTodosByCompletion(todos);
        }
        let todosHtml = this.renderer.createTodosHtml(filteredTodos);
        this.renderer.renderTodosWithHtml(todosHtml);
    }

    attachFilterButtonEventHandlers() {
        document.querySelector("#btn-filter-by-completion").addEventListener("click", this.handleFilterButtonClick.bind(this));
    }
}
const filterController = new FilterTodoController(renderer);
filterController.attachFilterButtonEventHandlers();



class SortTodoController {
    constructor(renderer, filterController) {
        this.renderer = renderer;
        this.filterController = filterController;

        this.buttonSortByTitle = document.querySelector("#btn-sort-by-title");
        this.buttonSortByDueDate = document.querySelector("#btn-sort-by-duedate");
        this.buttonSortByCreationDate = document.querySelector("#btn-sort-by-creationdate");
        this.buttonSortByImportance = document.querySelector("#btn-sort-by-importance");
        //const sortButtonList = [buttonSortByTitle, buttonSortByDueDate, buttonSortByCreationDate, buttonSortByImportance];

        this.activeSorter = undefined;
        this.isAscending = true; // true: ascending, false: descending
    }

    // Event handler for sorting buttons
    handleSortButtonClick(event) {
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
        if (this.filterController.isActive) {
            sortedTodos = filterTodosByCompletion(sortedTodos);
        }  
        
        let todosHtml = this.renderer.createTodosHtml(sortedTodos);
        this.renderer.renderTodosWithHtml(todosHtml);
    }

    attachSortButtonEventHandlers() {
        this.buttonSortByTitle.addEventListener("click", this.handleSortButtonClick.bind(this));
        this.buttonSortByDueDate.addEventListener("click", this.handleSortButtonClick.bind(this));
        this.buttonSortByCreationDate.addEventListener("click", this.handleSortButtonClick.bind(this));
        this.buttonSortByImportance.addEventListener("click", this.handleSortButtonClick.bind(this));
    }
}
const sorterController = new SortTodoController(renderer, filterController);
sorterController.attachSortButtonEventHandlers();


/*
let observer = new MutationObserver(function(mutations) {
    if (document.contains(document.querySelector("#todos"))) {
        observer.disconnect();
        renderTodos();
    }
});

observer.observe(document, {attributes: false, childList: true, characterData: false, subtree: true});
*/

/*
export { todoListElement };
*/