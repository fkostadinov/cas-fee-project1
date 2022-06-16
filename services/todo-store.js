import Datastore from '@seald-io/nedb';
const db = new Datastore({filename: './data/todos.db', autoload: true});

class TodoItem {
    constructor(title, description, importance, duedate, isdone) {

        this.id = undefined; // Must be of type 'number' (not 'string' or 'Number'!)
        this.creationdate = undefined; // Must be of type 'string'

        this.title = title;
        this.description = description;
        this.importance = importance;
        this.duedate = duedate;
        this.isdone = isdone;        
    }
}

class TodoStore {
    
    constructor() {
        // Establish DB connection here for more advanced DBs...
    }

    /**
     * Returns a todo item from the db with a given id. The method returns a promise that will
     * resolve to an object {payload: <TodoItem> }. If no such item exists,
     * then ???
     * @param {*} id the TodoItem's db id
     * @param {*} callback 
     */
    get(id, callback) {
        console.log("TodoStore.get - start");
        db.findOne({_id: id}, function(err, todoItem) {
            callback(err, {payload: todoItem});
        });
        console.log("TodoStore.get - end")
    }

    /**
     * Add a new TodoItem into the db. The method will return a promise resolving to an object
     * {payload: <Newly created TodoItem> }. Note that the returned TodoItem will contain the DB's ID.
     * TODO: What should the behaviour be if the given ID already exists?
     * @param {*} todoItem the new TodoItem to be stored
     * @param {*} callback ???
     */
    add(todoItem, callback) {
        console.log("TodoStore.add - start");
        
        if (todoItem.hasOwnProperty("_id") && todoItem._id !== undefined) {
            console.log("Warning: Trying to add a TodoItem with the ID field already set will overwrite "
                + " the provided ID with a new one from the database.");
        }

        if (!todoItem.hasOwnProperty("creationDate") || todoItem.creationDate === undefined) {
            todoItem.creationDate = new Date().toISOString().split("T")[0];
        }

        //if (todoItem.creationDate === undefined) {
        //    todoItem.creationDate = new Date().toISOString().split("T")[0];
        //}

        // TODO: Should we check whether all fields of the todoItem have been set?

        db.insert(todoItem, function(err, newTodoItem) {
        console.log("TodoStore.insert - start");

        console.log("Inserting: ", todoItem);

            if (callback) {
                callback(err, {payload: newTodoItem});
            }
        });
        console.log("TodoStore.insert - end")
    }

    /**
     * Update an existing TodoItem in the db with new values. The method returns a promise that will
     * resolve to an object {payload: <Updated TodoItem> }.
     * @param {*} todoItem the todo item containing updated data that should overwrite the existing todo item in the db
     * @param {*} callback ???
     */
    update(todoItem, callback) {
        console.log("TodoStore.update - start");

        console.log("Updating: ", todoItem);

        db.update(
            {_id: todoItem._id},
            {title: todoItem.title, description: todoItem.description, importance: todoItem.importance, isdone: todoItem.isdone, duedate: todoItem.duedate},
            {returnUpdatedDocs: true},
            function(err, numTodoItems, updatedTodoItem) {
            if (callback) {
                callback(err, {payload: updatedTodoItem});
            }
        });

        console.log("TodoStore.update - end");
    }

    /**
     * Return all TodoItems stored in the db. The method returns a promise that will resolve
     * to an object {payload: [<TodoItem 1>, <TodoItem 2>, ...]}.
     * @param {*} callback ???
     */
    all(callback) {
        console.log("TodoStore.all - start")
        db.find({}, function(err, todoItems) {
            callback(err, {payload: todoItems});
        });
        console.log("TodoStore.all - end")
    }

    /**
     * Delete a TodoItem stored in the db. The method returns a promise that will resolve to
     * an object {payload: <number of deleted TodoItems> }, where <number of deleted TodoItems>
     * will always be 1 for successful deletes, or 0 for failed deletes.
     * @param {*} id 
     * @param {*} callback 
     */
    delete(id, callback) {
        console.log("TodoStore.delete - start");

        db.remove({_id: id}, {}, function(err, deletedTodoItem) {
            callback(err, {payload: deletedTodoItem});
        });

        console.log("TodoStore.delete - end");
    }

}



export const todoStore = new TodoStore();
