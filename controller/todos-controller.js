import {todoStore} from "../services/todo-store.js";

export function showAllTodos(req, res) {
    console.log("TodosController.showAllTodos - start");
    todoStore.all(function(err, todoItems) {
        console.log("TodosController.all.callback - start");
        if (err) {
            console.error(err);
            // TODO: Should probably set error status code and send back
            // corresponding response to client?
        }
        else {
            res.json(todoItems);
            // res.json automatically calls res.end internally
        }
        console.log("TodosController.all.callback - end");
    });    
    console.log("TodosController.showAllTodos - end");
};

export function createTodo(req, res) {
    console.log("TodosController.createTodo - start");
    todoStore.add(req.body, function(err, todoItem) {
        console.log("TodosController.add.callback - start");
        if (err) {
            console.error(err);
            // TODO: Should probably set error status code and send back
            // corresponding response to client?
        }
        else {
            res.json(todoItem);
            // res.json automatically calls res.end internally
        }
        console.log("TodosController.add.callback - end");
    });    
    console.log("TodosController.createTodo - end");
};

export function showTodo(req, res) {
    console.log("TodosController.showTodo - start");
    todoStore.get(req.params.id, function(err, todoItem) {
        console.log("TodosController.get.callback - start");
        if (err) {
            console.error(err);
            // TODO: Should probably set error status code and send back
            // corresponding response to client?
        }
        else {
            res.json(todoItem);
            // res.json automatically calls res.end internally
        }
        console.log("TodosController.get.callback - end");
    });    
    console.log("TodosController.showTodo - end");    
};

export function updateTodo(req, res) {
    console.log("TodosController.updateTodo - start");
    todoStore.update(req.body, function(err, todoItem) {
        console.log("TodosController.update.callback - start");
        if (err) {
            console.error(err);
            // TODO: Should probably set error status code and send back
            // corresponding response to client?
        }
        else {
            res.json(todoItem);
            // res.json automatically calls res.end internally
        }
        console.log("TodosController.update.callback - end");
    });
    console.log("TodosController.updateTodo - end");
};

export function deleteTodo(req, res) {
    console.log("TodosController.deleteTodo - start");
    todoStore.delete(req.params.id, function(err, deletedTodoItem) {
        console.log("TodoController.delete.callback - start")
        if (err) {
            console.error(err);
            // TODO: Should probably set error status code and send back
            // corresponding response to client?
        }
        else {
            res.json(deletedTodoItem);
        }
        console.log("TodoController.delete.callback - end");
    });
};
