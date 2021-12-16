class TodosComponent {
    constructor (parent, selector) {
        this.host = parent.querySelector(selector)
        this.todosTemplate = new TodosTemplate(this.host)

        this.todos = []
        this.chosenTodos = ''
        this.renderAll()
        this.todosTemplate.onAddTodo(this.addTodo.bind(this));
        this.todosTemplate.onToggleDone(this.toggleDone.bind(this));
        this.todosTemplate.onTodosBtns(this.chooseTodosBtn.bind(this))
    }

    renderAll(todos = this.todos) {
        if (this.chosenTodos === 'done') {
            todos = this.showDoneTodos()
        } else if (this.chosenTodos === 'false') {
            todos = this.showNotDoneTodos()
        } else if (this.chosenTodos === 'all') {
            todos = this.showAll()
        }
        this.todosTemplate.renderTodos(todos)
        this.todosTemplate.renderTodosCounter(this.todosCounter())
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

        this.todos = [...this.todos, newTodo];

        this.renderAll()
    }

    getNewTodoId() {
        return this.todos.length ? this.todos[this.todos.length - 1].id + 1 : 1
    }

    todosCounter() {
        return this.todos.filter(todo => todo.done === false).length
    }

    toggleDone(id) {
        this.todos = this.todos.map(todo => todo.id === id ? {...todo, done: !todo.done} : todo)
        this.renderAll()
    }

    chooseTodosBtn(btnClass) {
        let todos = []
        if (btnClass === 'todos__del--btn') {
            todos = this.deleteDoneTodos()
        } else if (btnClass === 'todos__show1--btn') {
            todos = this.showDoneTodos()
        } else if (btnClass === 'todos__show2--btn') {
            todos = this.showNotDoneTodos()
        } else if (btnClass === 'todos__show3--btn') {
            todos = this.showAll()
        }

        this.renderAll(todos)
    }

    deleteDoneTodos() {
        this.todos = this.todos.filter(todo => todo.done === false);
        return this.todos
    }

    showDoneTodos() {
        let doneTodos = this.todos.filter(todo => todo.done === true);
        this.chosenTodos = 'done';
        return doneTodos
    }

    showNotDoneTodos() {
        let notDoneTodos = this.todos.filter(todo => todo.done === false);
        this.chosenTodos = 'false';
        return notDoneTodos
    }

    showAll() {
        this.chosenTodos = 'all';
        return this.todos
    }

} 