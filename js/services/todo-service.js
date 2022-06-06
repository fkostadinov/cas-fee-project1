class TodoService {
    constructor(storage) {
        this.storage = storage || new TodoStorage();
    }

    loadMockData() {
        this.storage.initMockData();
    }

    getAllTodos() {
        return this.storage.todos;
    }

    getFilteredTodos(filterFunction) {
        return this.storage.todos.filter(filterFunction);
    }

    /*
     * Note: The given todo id must be of type 'number' (not string or Number!)
     */
    findTodoById(todoId) {
        if (typeof(todoId) != "number") {
            console.error("TodoService.findTodoById: The given todoId is not of type 'number'!");
        }
        return this.storage.todos.find(todo => todo.id === todoId);
    }

    saveTodo(todoToSave) {
        let i = this.storage.todos.findIndex(todo => todo.id === todoToSave.id);
        if (i < 0) {
            // If the item was not found (i.e. i === -1) we should treat it as a new item to save
            this.storage.todos.push(todoToSave);
        }
        else {
            let todoInStorage = this.storage.todos[i];
            let updatedTodo = {...todoInStorage, ...todoToSave};
            this.storage.todos[i] = updatedTodo;
        }
    }

    _sortTodos1(todos, sortOrder, compareFunction) {
        return [...todos].sort(compareFunction(sortOrder));
    }

    _compareTodosByTitle(sortOrder) {
        return function(todo1, todo2) {
            return sortOrder === "ascending" ?
                todo1.title.localeCompare(todo2.title) :
                todo2.title.localeCompare(todo1.title);
        }
    } 

    _compareTodosByDueDate(sortOrder) {
        return function(todo1, todo2) {
            let date1 = Date.parse(todo1.duedate);
            let date2 = Date.parse(todo2.duedate);

            return sortOrder === "ascending" ?
                date1 - date2 :
                date2 - date1;
        }
    }

    _compareTodosByCreationDate(sortOrder) {
        return function(todo1, todo2) {
            let date1 = Date.parse(todo1.creationdate);
            let date2 = Date.parse(todo2.creationdate);

            return sortOrder === "ascending" ?
                date1 - date2 :
                date2 - date1;
        }
    }

    _compareTodosByImportance(sortOrder) {
        return function(todo1, todo2) {
            return sortOrder === "ascending" ?
                todo1.importance - todo2.importance :
                todo2.importance - todo1.importance;
        }
    }

    /*
     * If param todos is omitted, then this function is applied to all available todos
     */
    getTodosSortedByTitle(sortOrder, todos) {
        let ts = todos || this.storage.todos;
        return this._sortTodos1(ts, sortOrder, this._compareTodosByTitle);
    }
    
    /*
     * If param todos is omitted, then this function is applied to all available todos
     */
    getTodosSortedByDueDate(sortOrder, todos) {
        let ts = todos || this.storage.todos;
        return this._sortTodos1(ts, sortOrder, this._compareTodosByDueDate);
    }

    /*
     * If param todos is omitted, then this function is applied to all available todos
     */
    getTodosSortedByCreationDate(sortOrder, todos) {
        let ts = todos || this.storage.todos;
        return this._sortTodos1(ts, sortOrder, this._compareTodosByCreationDate);
    }

    /*
     * If param todos is omitted, then this function is applied to all available todos
     */
    getTodosSortedByImportance(sortOrder, todos) {
        let ts = todos || this.storage.todos;
        return this._sortTodos1(ts, sortOrder, this._compareTodosByImportance);
    }

}