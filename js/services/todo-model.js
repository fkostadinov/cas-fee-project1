class TodoItem {
    static idCounter = 0;
    
    constructor(title, description, importance, duedate, isdone) {
        this.id = new Number(++TodoItem.idCounter).toString();

        this.title = title;
        this.description = description;
        this.importance = importance;
        this.duedate = duedate;
        this.isdone = isdone;
        
        this.creationdate = undefined; // TODO
    }
}