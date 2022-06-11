import Datastore from '@seald-io/nedb';
const db = new Datastore({filename: './data/todos.db', autoload: true});

class Todo {

}

class TodoStore {

}



export const todoStore = new TodoStore();
