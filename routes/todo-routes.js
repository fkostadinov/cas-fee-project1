import express from 'express';
const router = express.Router();
import * as todosController from '../controller/todos-controller.js';

router.get("/api/todos", todosController.showAllTodos);
router.post("/api/todos", todosController.createTodo);
router.get("/api/todos/:id", todosController.showTodo);
router.put("/api/todos/:id", todosController.updateTodo);
router.delete("/api/todos/:id", todosController.deleteTodo);


export const todoRoutes = router;
