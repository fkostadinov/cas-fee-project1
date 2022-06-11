/* ------------------ TodoService -------------------- */

const todoService = new TodoService();
todoService.loadMockData();

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
                    <input type="checkbox" id="todo-item-isdone-${todoItem.id}" ${todoItem.isdone ? "checked" : ""} disabled>
                    <label class="todo-item-checkbox-lbl" for="todo-item-isdone-${todoItem.id}">Completed</label>
                </div>
                <div class="todo-item-btn">
                    <button class="btn" data-todo-item-id="${todoItem.id}">Edit</button>
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

    renderTodos() {
        let todosHtml = this.createTodosHtml(todoService.getAllTodos());
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


/* ------------------ Creating & Updating -------------------- */

class CreateTodoController {
    handleCreateButtonClick(event) {
        document.querySelector("#todo-input-title").value = "";
        document.querySelector("#todo-input-importance").value = 1;
        document.querySelector("#todo-form-isdone").checked = false;
        document.querySelector("#todo-input-duedate").value = new Date().toString().split("T")[0];
        document.querySelector("#todo-input-description").value = "";

        document.querySelector("#btn-create-todo").style.visibility = "hidden";
        document.querySelector("#todo-list-container").style.display = "none";

        // Be aware that the todo-list-form element must use display "flex", not "block"
        document.querySelector("#todo-form-container").style.display = "flex";
    }

    attachCreateButtonEventHandlers() {
        document.querySelector("#btn-create-todo").addEventListener("click", this.handleCreateButtonClick.bind(this));
    }
}
const createController = new CreateTodoController();


class EditTodoController {
    constructor(todoService, renderer) {
        this.todoService = todoService;
        this.renderer = renderer;
        this.currentTodoItem = undefined;
    }

    saveTodo() {
        let inputTitleEl = document.querySelector("#todo-input-title");
        let inputImportanceEl = document.querySelector("#todo-input-importance");
        let inputDuedateEl = document.querySelector("#todo-input-duedate");
        let inputIsDoneEl = document.querySelector("#todo-form-isdone");
        let inputDescriptionEl = document.querySelector("#todo-input-description");

        // If user is creating a completely new item, then currentTodoItem does not
        // exist. Only if a user is editing an existing todo item these values are set.
        if (!(this.currentTodoItem === undefined)) {
            TodoItemFactory.setId(this.currentTodoItem.id);
            TodoItemFactory.setCreationdate(this.currentTodoItem.creationdate);
        }
        let todoToSave = TodoItemFactory.createTodoItem(
            inputTitleEl.value,
            inputDescriptionEl.value,
            inputImportanceEl.value,
            inputDuedateEl.value,
            inputIsDoneEl.checked);

        this.currentTodoItem = {...this.currentTodoItem, ...todoToSave};
        this.todoService.saveTodo(this.currentTodoItem);
    }

    handleEditButtonClick(event) {
        // Ignore events that are not coming from edit button clicks (e.g.
        // clicks on checkbox labels)
        if (event.target.matches("button[data-todo-item-id]")) {
            let todoItemId = Number(event.target.dataset.todoItemId);
            this.currentTodoItem = todoService.findTodoById(todoItemId);

            document.querySelector("#todo-input-title").value = this.currentTodoItem.title;
            document.querySelector("#todo-input-importance").value = this.currentTodoItem.importance;
            document.querySelector("#todo-form-isdone").checked = this.currentTodoItem.isdone;
            document.querySelector("#todo-input-duedate").value = this.currentTodoItem.duedate;
            document.querySelector("#todo-input-description").value = this.currentTodoItem.description;

            document.querySelector("#btn-create-todo").style.visibility = "hidden";
            document.querySelector("#todo-list-container").style.display = "none";

            // Be aware that the todo-list-form element must use display "flex", not "block"
            document.querySelector("#todo-form-container").style.display = "flex";
        }
    }

    handleSaveOrCancelClick(event) {
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
                    this.currentTodoItem = undefined;
                    let todosHtml = this.renderer.createTodosHtml(this.todoService.getAllTodos());
                    this.renderer.renderTodosWithHtml(todosHtml);
                    document.querySelector("#btn-create-todo").style.visibility = "visible";
                    document.querySelector("#todo-form-container").style.display = "none";
                    document.querySelector("#todo-list-container").style.display = "block";
                }
                break;

            case "btn-cancel-todo":
                {
                    this.currentTodoItem = undefined;
                    let todosHtml = this.renderer.createTodosHtml(this.todoService.getAllTodos());
                    this.renderer.renderTodosWithHtml(todosHtml);
                    document.querySelector("#btn-create-todo").style.visibility = "visible";
                    document.querySelector("#todo-form-container").style.display = "none";
                    document.querySelector("#todo-list-container").style.display = "block";
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
const editTodoController = new EditTodoController(todoService, renderer);



/* ------------------ Sorting & Filtering -------------------- */

class FilterTodoController {
    constructor(todoService, renderer) {
        this.todoService = todoService;

        this.renderer = renderer;
        this.isActive = false;
    }

    // Event handler for filter button
    handleFilterButtonClick(event) {
        // Toggle filter activity state
        this.isActive = !this.isActive;
        let filteredTodos = this.todoService.getAllTodos();
        if (this.isActive) {
            filteredTodos = this.todoService.getFilteredTodos(todo => todo.isdone === false);
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
    handleSortButtonClick(event) {
        const button = event.target;

        // If previous sorter is same as new one, just toggle the sort order
        if (!(this.activeSorter === undefined) && this.activeSorter.id === button.id) {
            this.isAscending = !this.isAscending;
        }

        this.activeSorter = button;

        let ts = this.filterController.isActive ?
            this.todoService.getFilteredTodos(todo => todo.isdone === false) :
            this.todoService.getAllTodos();

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
