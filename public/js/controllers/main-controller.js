/* ------------------ TodoService -------------------- */

const todoService = new TodoService();
//todoService.loadMockData();

/* ------------------ Rendering -------------------- */

class Renderer {
    createTodoItemHtml(todoItem) {
        return `
            <li class="todo-list-item">
            <div class="todo-list-item-container">
                <div class="todo-item-due-date">${todoItem.duedate}</div>
                <div class="todo-item-title">${todoItem.title}</div>
                <div class="todo-item-importance">${todoItem.importance}</div>
                <div class="todo-item-description">${todoItem.description}</div>
                <div class="todo-item-isdone">
                    <input type="checkbox" id="todo-item-isdone-${todoItem._id}" ${todoItem.isdone ? "checked" : ""} disabled>
                    <label class="todo-item-checkbox-lbl" for="todo-item-isdone-${todoItem._id}">Completed</label>
                </div>
                <div class="todo-item-btn">
                    <button class="btn" data-todo-item-id="${todoItem._id}">Edit</button>
                </div>
            </div>
            <hr>
        </li>        
        `;
    }

    createTodosHtml(todoItems) {
        return todoItems.map(todoItem => this.createTodoItemHtml(todoItem)).join('');
    }

    renderTodosWithHtml(todosHtml) {
        document.querySelector("#todos").innerHTML = todosHtml;
    }

    async renderTodos() {
        let allTodoItems = await todoService.getAllTodos();
        let todosHtml = this.createTodosHtml(allTodoItems);
        this.renderTodosWithHtml(todosHtml);
    }

}
const renderer = new Renderer();


/* ------------------ Bright vs dark mode -------------------- */
class ToggleStyleController {
    constructor() {
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
        document.querySelector("#btn-toggle-style").addEventListener("click", this.handleToggleStyleButtonClick.bind(this));
    }
}
const toggleStyleController = new ToggleStyleController();


/* ------------------ Toggle visibility of edit mode and overview mode -------------------- */

var currentTodoItem = undefined;

class VisibilityModeController {

    showEditMode() {
        document.querySelector("#btn-create-todo").style.visibility = "hidden";
        document.querySelector("#todo-list-container").style.display = "none";
        // Be aware that the todo-list-form element must use display "flex", not "block"
        document.querySelector("#todo-form-container").style.display = "flex";        
    }

    showOverviewMode() {
        document.querySelector("#btn-create-todo").style.visibility = "visible";  
        document.querySelector("#todo-form-container").style.display = "none";  
        document.querySelector("#todo-list-container").style.display = "block";    
    }
}
const visibilityModeController = new VisibilityModeController();

/* ------------------ Creating & Updating -------------------- */

class CreateTodoController {
    constructor(visibilityModeController) {
        this.visibilityModeController = visibilityModeController;
    }

    handleCreateButtonClick(event) {
        document.querySelector("#todo-input-title").value = "";
        document.querySelector("#todo-input-importance").value = 1;
        document.querySelector("#todo-form-isdone").checked = false;
        document.querySelector("#todo-input-duedate").value = new Date().toISOString().split("T")[0];
        document.querySelector("#todo-input-description").value = "";

        currentTodoItem = undefined;
        visibilityModeController.showEditMode();
    }

    attachCreateButtonEventHandlers() {
        document.querySelector("#btn-create-todo").addEventListener("click", this.handleCreateButtonClick.bind(this));
    }
}
const createController = new CreateTodoController(visibilityModeController);


class EditTodoController {
    constructor(visibilityModeController, todoService, renderer) {
        this.visibilityModeController = visibilityModeController;
        this.todoService = todoService;
        this.renderer = renderer;
    }
    
    async saveTodo() {
        let inputTitleEl = document.querySelector("#todo-input-title");
        let inputImportanceEl = document.querySelector("#todo-input-importance");
        let inputDuedateEl = document.querySelector("#todo-input-duedate");
        let inputIsDoneEl = document.querySelector("#todo-form-isdone");
        let inputDescriptionEl = document.querySelector("#todo-input-description");

        let todoToSave = TodoItemFactory.createTodoItem(
            inputTitleEl.value,
            inputDescriptionEl.value,
            inputImportanceEl.value,
            inputDuedateEl.value,
            inputIsDoneEl.checked);

        if (currentTodoItem === undefined) {
            currentTodoItem = {};
        }
        currentTodoItem.title = todoToSave.title;
        currentTodoItem.description = todoToSave.description;
        currentTodoItem.importance = todoToSave.importance;
        currentTodoItem.duedate = todoToSave.duedate;
        currentTodoItem.isdone = todoToSave.isdone;
        currentTodoItem = await this.todoService.saveTodo(currentTodoItem);
    }

    async handleEditButtonClick(event) {
        // Ignore events that are not coming from edit button clicks (e.g.
        // clicks on checkbox labels)
        if (event.target.matches("button[data-todo-item-id]")) {
            let todoItemId = event.target.dataset.todoItemId;

            currentTodoItem = await todoService.findTodoById(todoItemId);
            document.querySelector("#todo-input-title").value = currentTodoItem.title;
            document.querySelector("#todo-input-importance").value = currentTodoItem.importance;
            document.querySelector("#todo-form-isdone").checked = currentTodoItem.isdone;
            document.querySelector("#todo-input-duedate").value = currentTodoItem.duedate;
            document.querySelector("#todo-input-description").value = currentTodoItem.description;

            visibilityModeController.showEditMode();
        }
    }

    async handleSaveOrCancelClick(event) {
        // We're inside the form tag, so prevent default form submission.
        event.preventDefault();

        const button = event.target;

        switch (button.id) {
            case "btn-save-todo":
                {
                    this.saveTodo();
                }
                break;

            case "btn-save-todo-and-overview":
                {
                    this.saveTodo();
                    currentTodoItem = undefined;
                    let todosHtml = this.renderer.createTodosHtml(await this.todoService.getAllTodos());
                    this.renderer.renderTodosWithHtml(todosHtml);
                    visibilityModeController.showOverviewMode();
                }
                break;

            case "btn-cancel-todo":
                {
                    currentTodoItem = undefined;
                    let todosHtml = this.renderer.createTodosHtml(await this.todoService.getAllTodos());
                    this.renderer.renderTodosWithHtml(todosHtml);
                    visibilityModeController.showOverviewMode();
                }
                break;
        }
    }

    attachEditButtonEventHandlers() {
        document.querySelector("#todos").addEventListener("click", this.handleEditButtonClick.bind(this));
        document.querySelector("#btn-save-todo").addEventListener("click", this.handleSaveOrCancelClick.bind(this));
        document.querySelector("#btn-save-todo-and-overview").addEventListener("click", this.handleSaveOrCancelClick.bind(this));
        document.querySelector("#btn-cancel-todo").addEventListener("click", this.handleSaveOrCancelClick.bind(this));
    }
}
const editTodoController = new EditTodoController(visibilityModeController, todoService, renderer);



/* ------------------ Sorting & Filtering -------------------- */

class FilterTodoController {
    constructor(todoService, renderer) {
        this.todoService = todoService;

        this.renderer = renderer;
        this.isActive = false;
    }

    // Event handler for filter button
    async handleFilterButtonClick(event) {
        // Toggle filter activity state
        this.isActive = !this.isActive;
        let filteredTodos = await this.todoService.getAllTodos();
        if (this.isActive) {
            filteredTodos = filteredTodos.filter(todo => todo.isdone === false);
        }
        let todosHtml = this.renderer.createTodosHtml(filteredTodos);
        this.renderer.renderTodosWithHtml(todosHtml);
    }

    attachFilterButtonEventHandlers() {
        document.querySelector("#btn-filter-by-completion").addEventListener("click", this.handleFilterButtonClick.bind(this));
    }
}
const filterController = new FilterTodoController(todoService, renderer);




class SortTodoController {
    constructor(todoService, renderer, filterController) {
        this.todoService = todoService;
        this.renderer = renderer;
        this.filterController = filterController;

        this.activeSorter = undefined;
        this.isAscending = true; // true: ascending, false: descending
    }

    // Event handler for sorting buttons
    async handleSortButtonClick(event) {
        const button = event.target;

        // If previous sorter is same as new one, just toggle the sort order
        if (!(this.activeSorter === undefined) && this.activeSorter.id === button.id) {
            this.isAscending = !this.isAscending;
        }

        this.activeSorter = button;

        let ts = await this.todoService.getAllTodos();
        if (this.filterController.isActive) {
            ts = ts.filter(todo => todo.isdone === false);
        }

        let sortOrder = this.isAscending ? "ascending" : "descending";
        let sortedTodos = undefined;

        switch (button.id) {
            case "btn-sort-by-title":
                sortedTodos = todoService.getTodosSortedByTitle(sortOrder, ts);
                break;

            case "btn-sort-by-duedate":
                sortedTodos = todoService.getTodosSortedByDueDate(sortOrder, ts);
                break;

            case "btn-sort-by-creationdate":
                sortedTodos = todoService.getTodosSortedByCreationDate(sortOrder, ts);
                break;

            case "btn-sort-by-importance":
                sortedTodos = todoService.getTodosSortedByImportance(sortOrder, ts);
                break;
        }

        let todosHtml = this.renderer.createTodosHtml(sortedTodos);
        this.renderer.renderTodosWithHtml(todosHtml);
    }

    attachSortButtonEventHandlers() {
        document.querySelector("#btn-sort-by-title").addEventListener("click", this.handleSortButtonClick.bind(this));
        document.querySelector("#btn-sort-by-duedate").addEventListener("click", this.handleSortButtonClick.bind(this));
        document.querySelector("#btn-sort-by-creationdate").addEventListener("click", this.handleSortButtonClick.bind(this));
        document.querySelector("#btn-sort-by-importance").addEventListener("click", this.handleSortButtonClick.bind(this));
    }
}
const sorterController = new SortTodoController(todoService, renderer, filterController);



const initEventHandlers = function () {
    toggleStyleController.attachToggleStyleEventHandlers();
    createController.attachCreateButtonEventHandlers();
    editTodoController.attachEditButtonEventHandlers();
    filterController.attachFilterButtonEventHandlers();
    sorterController.attachSortButtonEventHandlers();
}

// Don't attach event listeners to DOM elements while the document is still in loading state.
// While in loading state simply attach a DOMContentLoaded listener and wait until completed.
// If no longer in loading state then you can directly attach all the event listeners.
// See here for infos: https://wiki.selfhtml.org/wiki/JavaScript/DOM/Event/DOMContentLoaded
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        renderer.renderTodos();
        initEventHandlers();
    });
}
else {
    renderer.renderTodos();
    initEventHandlers();
}
