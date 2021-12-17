class TodosComponent {
    constructor (parent, selector) {
        this.host = parent.querySelector(selector)
        this.todosTemplate = new TodosTemplate(this.host)

        this.todos = [
            {
                title: 'Play computer games',
                id: 1,
                done: false
            },
            {
                title: 'Watch a movie and criticise it',
                id: 2,
                done: false
            },
        ];

        this.chosenTodos = '';

        this.language = {
            en: true,
            ua: false
        };

        this.state = {
            uiMode: 'light',
            uiModeTypes: ['light', 'dark'],
        };
        
        this.renderAll()
        this.todosTemplate.onAddTodo(this.addTodo.bind(this));
        this.todosTemplate.onToggleDone(this.toggleDone.bind(this));
        this.todosTemplate.onTodosBtns(this.chooseTodosBtn.bind(this));
        this.todosTemplate.onDeleteTodo(this.deleteTodo.bind(this));
        this.todosTemplate.onChangeLang(this.changeLang.bind(this));
        this.todosTemplate.onChangeTheme(this.changeUiMode.bind(this))
    }
    
    changeUiMode() {
        this.state = {...this.state, uiMode: this.state.uiModeTypes.filter(uiMode => this.state.uiMode !==uiMode)[0]};
        this.todosTemplate.renderTheme(this.state.uiMode)
    }

    renderLang() {
        if (this.language.en) {
            this.todosTemplate.renderUI('en', this.todosCounter())
        } else if(this.language.ua) {
            this.todosTemplate.renderUI('ua', this.todosCounter())
        }
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
        // this.todosTemplate.renderTodosCounter(this.todosCounter())
        this.renderLang();
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
        this.todos = this.todos.map(todo => todo.id === id ? {...todo, done: !todo.done} : todo);
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

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id)
        this.renderAll()
    }

    changeLang(btnClass) {
        if (btnClass === 'todos__en--lang') {
            this.language = {...this.language, en: true, ua: false}
        } else if (btnClass === 'todos__ua--lang') {
            this.language = {...this.language, en: false, ua: true}
        }
        this.renderLang()
    }

} 