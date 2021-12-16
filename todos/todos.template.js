class TodosTemplate {
    constructor(host) {
        this.host = host

        this.host.innerHTML = `
        <div class="todos">
                <div class="todos__header">
                    <h1 class="todos__title">To-do App</h1>
                    <form class="todos__form">
                        <input type="text" class="todos__form__field" placeholder="Add To-do Here"> <button class="todos__form--btn">+</button>
                    </form>
                    <div class="todos__info">
                        <button class="todos__del--btn">Remove done</button>
                        <button class="todos__show1--btn">Show done</button>
                        <button class="todos__show2--btn">Show not done</button>
                        <button class="todos__show3--btn">Show All</button>
                    </div>
                </div>
                <p class="todos__counter">You have 5 todos left</p>
                <ul class="todos__list">
                </ul>
            </div>
        `

        this.form = this.host.querySelector('.todos__form');
        this.field = this.form.querySelector('.todos__form__field');
        this.list = this.host.querySelector('.todos__list');
        this.todosCounter = this.host.querySelector('.todos__counter');
        this.todosInfo = this.host.querySelector('.todos__info')

    }

    renderTodos(todos) {
        this.list.innerHTML = ``;
        todos.forEach(todo => {
            this.list.innerHTML += `
            <li class="todos__todo">
                <div class="flex">
                    <input type="checkbox" class="todos__checkbox" ${todo.done ? 'checked' : ''} data-id="${todo.id}">
                </div>
                <span class="todos__todo__text">
                ${todo.title}
                </span> 
                <div class="flex">
                    <button class="todo__del--btn">DEL</button>
                </div>
            </li>
            <li class="todos__line"></li>
            `
        })
        this.cleanField()
    }

    cleanField() {
        this.field.value = null
    }

    renderTodosCounter(counter) {
        this.todosCounter.innerHTML = `You have ${counter} todos left`
    }

    onAddTodo(cb) {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault()
            const title = this.field.value.trim()

            cb(title)
        })
    }

    onToggleDone(cb) {
        this.list.addEventListener('change', (e) => {
            const id = +e.target.getAttribute('data-id')
            cb(id)
        })
    }

    onTodosBtns(cb) {
        this.todosInfo.addEventListener('click', (e) => {
            const btnClass = e.target.getAttribute('class');
            console.log(btnClass);
            cb(btnClass)
        })
    }



}