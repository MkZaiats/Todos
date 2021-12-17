class TodosTemplate {
    constructor(host) {
        this.host = host

        this.iniTemplate = `
        <div class="todos">
                <div class="todos__header">
                    <div class="todos__header__top">
                        <div class="todos__theme"><img src="https://www.svgrepo.com/show/34399/light-bulb.svg" class="svg"></div>
                        <h1 class="todos__title">To-do App</h1>
                        <div class="todos__en--lang"><img src="https://flagicons.lipis.dev/flags/4x3/gb.svg" class="svg"></div>
                        <div class="todos__ua--lang"><img src="https://flagicons.lipis.dev/flags/4x3/ua.svg" class="svg"></div>
                    </div>
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
        `;

        this.initRender();

        this.todosHeader = this.host.querySelector('.todos__header__top')
        this.form = this.host.querySelector('.todos__form');
        this.field = this.form.querySelector('.todos__form__field');
        this.formBtn = this.form.querySelector('.todos__form--btn')
        this.todosInfo = this.host.querySelector('.todos__info');
        this.todosDelBtn = this.todosInfo.querySelector('.todos__del--btn');
        this.todosShowBtn1 = this.todosInfo.querySelector('.todos__show1--btn');
        this.todosShowBtn2 = this.todosInfo.querySelector('.todos__show2--btn');
        this.todosShowBtn3 = this.todosInfo.querySelector('.todos__show3--btn');
        this.todosCounter = this.host.querySelector('.todos__counter');
        this.list = this.host.querySelector('.todos__list');
        this.uaLangBtn = this.host.querySelector('.todos__ua--lang');
        this.enLangBtn = this.host.querySelector('.todos__en--lang');
        this.todosTheme = this.host.querySelector('.todos__theme')

    }

    initRender() {
        this.host.innerHTML = this.iniTemplate;
    }

    renderTheme (uiMode) {
        if (uiMode === 'light') {
            this.todosTheme.innerHTML = `<img src="https://www.svgrepo.com/show/34399/light-bulb.svg" class="svg">`;
            this.turnTheme();
        } else if (uiMode === 'dark') {
            this.todosTheme.innerHTML = `<img src="https://www.svgrepo.com/show/17950/red-light.svg" class="svg">`;
            this.turnTheme();
        }
    }

    turnTheme() {
        this.host.parentElement.classList.toggle('app__dark');
        this.todosHeader.classList.toggle('todos__header__top__dark');
        this.field.classList.toggle('todos__form__field__dark');
        this.formBtn.classList.toggle('todos__form--btn__dark');
        this.todosCounter.classList.toggle('todos__counter__dark');
        this.todosDelBtn.classList.toggle('todos__del--btn__dark');
        this.todosShowBtn1.classList.toggle('todos__show1--btn__dark');
        this.todosShowBtn2.classList.toggle('todos__show2--btn__dark');
        this.todosShowBtn3.classList.toggle('todos__show3--btn__dark');
        this.list.classList.toggle('todos__list__dark')
    }

    renderUI(lang, length) {
        const todosTitle = this.host.querySelector('.todos__title');
        this.field;

        this.todosCounter;

        if (lang === 'en') {
            todosTitle.innerHTML = 'To-do App';
            this.field['placeholder'] = 'Add To-do Here';
            this.todosDelBtn.innerHTML = 'Remove done';
            this.todosShowBtn1.innerHTML = 'Show done';
            this.todosShowBtn2.innerHTML = 'Show not done';
            this.todosShowBtn3.innerHTML = 'Show All';
            this.renderTodosCounter(length, lang)

        } else if (lang === 'ua') {
            todosTitle.innerHTML = 'Перелік справ';
            this.field['placeholder'] = 'Додайте справу сюди';
            this.todosDelBtn.innerHTML = 'Видалити виконані';
            this.todosShowBtn1.innerHTML = 'Показати виконані';
            this.todosShowBtn2.innerHTML = 'Показати невиконані';
            this.todosShowBtn3.innerHTML = 'Показати всі';
            this.renderTodosCounter(length, lang)
        }
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
                    <button class="todo__del--btn"><img src="https://www.svgrepo.com/show/94821/delete.svg" class="svg"></button>
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

    renderTodosCounter(counter, lang = 'en') {
        if (lang === 'en') {
            this.todosCounter.innerHTML = counter === 1 ? `You have ${counter} todo left` : `You have ${counter} todos left`
        } else if (lang === 'ua') {
            this.todosCounter.innerHTML = counter === 1 || counter === 21 || counter === 31 ? `У вас залишилась ${counter} справа` : `У вас залишилось ${counter} справ(и)`
        }
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
            const btnClass = e.target.classList[0];
            console.log(btnClass);
            cb(btnClass)
        })
    }

    onDeleteTodo(cb) {
        this.list.addEventListener('click', (e) => {
            if (e.target.closest('button') && e.target.closest('button').className === 'todo__del--btn') {
                let id = +e.target.closest('button').parentNode.parentElement.querySelector('.todos__checkbox').getAttribute('data-id')
                cb(id)
            }
        })
    }

    onChangeLang(cb) {
        this.uaLangBtn.addEventListener('click', (e) => {
            const btnClass = e.target.closest('div').getAttribute('class');
            cb(btnClass)
        });

        this.enLangBtn.addEventListener('click', (e) => {
            const btnClass = e.target.closest('div').getAttribute('class');
            cb(btnClass)
        })
    } 

    onChangeTheme(cb) {
        this.todosTheme.addEventListener('click', (e) => {
            if (e.target.closest('div').getAttribute('class') === 'todos__theme') {
                cb()
            }
        })
    }

}