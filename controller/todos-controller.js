import {todoStore} from "../services/todo-store.js";

export function showIndex(req, res) {
    res.type('text/html');
    res.write("<html>");
    res.write("<p>showIndex</p>");
    res.end("</html>");
};

export function createTodo(req, res) {
    res.type('text/html');
    res.write("<html>");
    res.write("<p>createTodo</p>");
    res.end("</html>");
};

export function showTodo(req, res) {
    res.type('text/html');
    res.write("<html>");
    res.write("<p>showTodo</p>");
    res.end("</html>");
};

export function deleteTodo(req, res) {
    res.type('text/html');
    res.write("<html>");
    res.write("<p>deleteTodo</p>");
    res.end("</html>");
};
