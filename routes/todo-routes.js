import express from 'express';
const router = express.Router();
import * as todosController from '../controller/todos-controller.js';

//router.get("/", todosController.showIndex);
router.get("/todos", todosController.createTodo);
router.get("/todos/:id/", todosController.showTodo);
router.delete("/todos/:id/", todosController.deleteTodo);


export const todoRoutes = router;
