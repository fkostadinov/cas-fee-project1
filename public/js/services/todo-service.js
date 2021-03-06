class TodoService {
    constructor(storage) {
        this.httpService = new HttpService();
    }

    /**
     * @returns a promise that will resolve to an array of TodoItems
     */
    async getAllTodos() {
        let promise = await this.httpService.ajax("GET", "/api/todos", undefined)
            .then(function(data) {
                return data.payload;
            })
            .catch(function(error) {
                console.error(error);
            });
        
        return promise;
    }

    /**
     * Retrieves a TodoItem by its ID from the server
     * @returns a promise that will resolve to {payload: <actual object> }
     */
    async findTodoById(todoId) {
        let promise = await this.httpService.ajax("GET", `/api/todos/${todoId}`, undefined)
        .then(function(data) {
            return data.payload;
        })
        .catch(function(error) {
            console.error(error);
        });

        return promise;
    }

    /**
     * Deletes a TodoItem by its ID
     * @param {*} todoId 
     * @returns a promise that will resolve to {payload: <number od deleted objects> }, where <number
     * of deleted objects> will be 1 if deletion was successful, or 0 if deletion failed
     */
    async deleteTodoById(todoId) {
        let promise = await this.httpService.ajax("DELETE", `/api/todos/${todoId}`, undefined)
        .then(function(data) {
            return data.payload;
        })
        .catch(function(error) {
            console.error(error);
        })
        
        return promise;
    }

    /**
     * @param {*} todoToSave 
     * @returns a promise that will resolve to {payload: <saved object> }
     */
    async saveTodo(todoToSave) {
        // If the TodoItem has an id set, then assume this should be an update operation.
        // If no id is set yet, then assume this should create a new item.
        let httpMethod = undefined;
        let url = undefined;
        if (todoToSave._id === undefined) {
            httpMethod = "POST";
            url = "/api/todos";
        }
        else {
            httpMethod = "PUT";
            url = `/api/todos/${todoToSave._id}`;
        }

        let promise = await this.httpService.ajax(httpMethod, url, todoToSave)
            .then(function(data) {
                return data.payload;
            })
            .catch(function(error) {
                console.error(error);
            });

        return promise;
    }

    _sortTodos(todos, sortOrder, compareFunction) {
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
         return this._sortTodos(todos, sortOrder, this._compareTodosByTitle);
    }
    
    /*
     * If param todos is omitted, then this function is applied to all available todos
     */
    getTodosSortedByDueDate(sortOrder, todos) {
        return this._sortTodos(todos, sortOrder, this._compareTodosByDueDate);
    }

    /*
     * If param todos is omitted, then this function is applied to all available todos
     */
    getTodosSortedByCreationDate(sortOrder, todos) {
        return this._sortTodos(todos, sortOrder, this._compareTodosByCreationDate);
    }

    /*
     * If param todos is omitted, then this function is applied to all available todos
     */
    getTodosSortedByImportance(sortOrder, todos) {
        return this._sortTodos(todos, sortOrder, this._compareTodosByImportance);
    }

}