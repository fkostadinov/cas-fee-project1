class TodoItem {
    //static idCounter = 0;
    
    constructor(title, description, importance, duedate, isdone) {

        this.id = undefined; // Must be type 'number' (not 'string' or 'Number'!)
        //this.id = new Number(++TodoItem.idCounter).toString();

        this.title = title;
        this.description = description;
        this.importance = importance;
        this.duedate = duedate;
        this.isdone = isdone;
        
        this.creationdate = undefined; // TODO
    }
}

class TodoItemFactory {
    static idCounter = 0;
    static id = undefined;
    static creationdate = undefined;

    static nextIdAndIncr() {
        let id = Number(TodoItemFactory.idCounter);
        TodoItemFactory.idCounter++;
        return id;
    }

    static setId(id) {
        TodoItemFactory.id = id;
    }

    static setCreationdate(creationdate) {
        TodoItemFactory.creationdate = creationdate;
    }

    /*
     * The id parameter is optional. If provided, a new TodoItem instance is created with the given id.
     * If not provided, a new TodoItem is created and the next id calculated automatically.
     */
    static createTodoItem(title, description, importance, duedate, isdone) {
        let todo = new TodoItem(
            title,
            description,
            importance,
            duedate,
            isdone
        );
        
        todo.id = TodoItemFactory.id === undefined ? TodoItemFactory.nextIdAndIncr() : TodoItemFactory.id;
        todo.creationdate = TodoItemFactory.creationdate === undefined ? Date.now().toString() : TodoItemFactory.creationdate;

        // Unset factory state
        TodoItemFactory.id = undefined;
        TodoItemFactory.creationdate = undefined;

        return todo;
    }
}