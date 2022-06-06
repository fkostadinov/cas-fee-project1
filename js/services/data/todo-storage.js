class TodoStorage {
    constructor() {
        this.todos = [];
    }

    initMockData() {
        TodoItemFactory.setId(TodoItemFactory.nextIdAndIncr());
        TodoItemFactory.setCreationdate(new Date().toISOString().split("T")[0]);
        const todoItem1 = TodoItemFactory.createTodoItem("Fräsen fräsen", "Fräsen müssten mal wieder gefräst werden.", 1, "2022-05-24", false);

        TodoItemFactory.setId(TodoItemFactory.nextIdAndIncr());
        TodoItemFactory.setCreationdate(new Date().toISOString().split("T")[0]);
        const todoItem2 = TodoItemFactory.createTodoItem("Weltfrieden", "Make love, not war.", 5, "1999-12-31", false);

        TodoItemFactory.setId(TodoItemFactory.nextIdAndIncr());
        TodoItemFactory.setCreationdate(new Date().toISOString().split("T")[0]);
        const todoItem3 = TodoItemFactory.createTodoItem("Kuchen essen", "Make cake, not tarte.", 4, "2024-12-31", true);

        TodoItemFactory.setId(TodoItemFactory.nextIdAndIncr());
        TodoItemFactory.setCreationdate(new Date().toISOString().split("T")[0]);
        const todoItem4 = TodoItemFactory.createTodoItem("Erwachsenwerden", "", 3, "1998-04-05", true);

        TodoItemFactory.setId(TodoItemFactory.nextIdAndIncr());
        TodoItemFactory.setCreationdate(new Date().toISOString().split("T")[0]);
        const todoItem5 = TodoItemFactory.createTodoItem("Ferien machen", "Mal wieder Ferien machen", 1, "2021-11-01", false);

        this.todos = [
            {id: todoItem1.id, creationdate: todoItem1.creationdate, duedate: todoItem1.duedate, title: todoItem1.title, importance: todoItem1.importance, description: todoItem1.description, isdone: todoItem1.isdone},
            {id: todoItem2.id, creationdate: todoItem2.creationdate, duedate: todoItem2.duedate, title: todoItem2.title, importance: todoItem2.importance, description: todoItem2.description, isdone: todoItem2.isdone},
            {id: todoItem3.id, creationdate: todoItem3.creationdate, duedate: todoItem3.duedate, title: todoItem3.title, importance: todoItem3.importance, description: todoItem3.description, isdone: todoItem3.isdone},
            {id: todoItem4.id, creationdate: todoItem4.creationdate, duedate: todoItem4.duedate, title: todoItem4.title, importance: todoItem4.importance, description: todoItem4.description, isdone: todoItem4.isdone},
            {id: todoItem5.id, creationdate: todoItem5.creationdate, duedate: todoItem5.duedate, title: todoItem5.title, importance: todoItem5.importance, description: todoItem5.description, isdone: todoItem5.isdone},
        ];
    }
}