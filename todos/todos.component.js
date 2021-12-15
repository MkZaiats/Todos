class TodosComponent {
    constructor (parent, selector) {
        this.host = parent.querySelector(selector)
        this.todosTemplate = new TodosTemplate(this.host)

        this.todos = []

        this.todosTemplate.renderTodos(this.todos)
        this.todosTemplate.onAddTodo(this.addTodo.bind(this))
        this.todosTemplate.onToggleDone(this.toggleDone.bind(this))
    }

    addTodo(title) {
        if(!title) {
            return
        }
        const newTodo = {
            title,
            id: this.getNewTodoId(),
            done: false
        }

        this.todos = [...this.todos, newTodo]
        console.log(this.todos);
        this.todosTemplate.renderTodos(this.todos)
    }

    getNewTodoId() {
        return this.todos.length ? this.todos[this.todos.length - 1].id + 1 : 1
    }

    toggleDone(id) {
        this.todos = this.todos.map(todo => todo.id === id ? {...todo, done: !todo.done} : todo)
        console.log(this.todos);
        
    }



} 