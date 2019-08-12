import React from 'react';

// stateless component
const Title = () => {
    return (
        <div id="titleWrapper">
            <h2 className="text-center">Grocerie List</h2>
        </div>
    );
};

class AddNewItemForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleNewTodoAddition = this.handleNewTodoAddition.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleNewTodoAddition() {
        if (this.input.value !== '') {
            this.props.addTodo(this.input.value);
            this.setState({
                value: ''
            });
            this.input.placeholder = "Add an item to your list...";
        }
    }

    render() {
        return (
            // ref should be passed a callback
            // with underlying dom element as its
            // argument to get its reference
            <div id="form">
                <input className="form-control"
                    ref={node => {
                        this.input = node;
                    }}
                    value={this.state.value}
                    placeholder="Add an item to your list..."
                    autocomplete="off"
                    onChange={this.handleChange}
                />

                <button
                    onClick={this.handleNewTodoAddition}
                >
                    +
				</button>
            </div>
        );
    }
}

const Todo = ({ todo, remove }) => {
    // single todo
    return (
        <p className="todos">
            {todo.value}
            <span
                className="removeBtn"
                onClick={() => {
                    remove(todo.id)
                }}>
                x
			</span>
        </p>
    );
};

const ShoppingList = ({ todos, remove }) => {
    let allTodos = [];

    if (todos.length > 0) {
        allTodos = todos.map(todo => {
            // passing todo and remove method reference
            return (<Todo todo={todo} remove={remove} />);
            //return (<p>{todo.value}</p>);
        });
    } else {
        allTodos.push(<h3 id="acu">Nothing to see here. Add items to your list</h3>);
    }

    return (
        <div id="list">
            <p id="info"> Your Shopping List: </p>
            {allTodos}
        </div>
    );
};

class EditShoppingList extends React.Component {
    constructor(props) {
        super(props);
        // data for introduction to app
        // for new users
        const introData = [];

        const localData = localStorage.todos && JSON.parse(localStorage.todos);

        this.state = {
            data: localData || introData
        };

        // binding methods
        this.addTodo = this.addTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
    }
    // Handler to update localStorage
    updateLocalStorage() {
        if (typeof (Storage) !== "undefined")
            localStorage.todos = JSON.stringify(this.state.data);
    }
    // Handler to add todo
    addTodo(val) {
        let id;
        // if localStorage is available then increase localStorage count
        // else use global window object's id variable
        if (typeof (Storage) !== "undefined") {
            id = Number(localStorage.count);
            localStorage.count = Number(localStorage.count) + 1;
        } else {
            id = window.id++;
        }

        const todo = {
            value: val,
            id: id
        };

        this.state.data.push(todo);
        // update state
        this.setState({
            data: this.state.data
        }, () => {
            // update localStorage
            this.updateLocalStorage();
        });
    }
    // Handler to remove todo
    removeTodo(id) {
        // filter out the todo that has to be removed
        const list = this.state.data.filter(todo => {
            return todo.id !== id;
        });
        // update state
        this.setState({
            data: list
        }, () => {
            // update localStorage
            this.updateLocalStorage();
        });
    }

    componentDidMount() {
        localStorage.clear();
        if (typeof (Storage) !== "undefined") {
            if (!localStorage.todos) {
                localStorage.todos = JSON.stringify(this.state.data);
            }
            if (!localStorage.count) {
                localStorage.count = 0;
            }

        } else {
            console.log("%cApp will not remember todos created as LocalStorage Is Not Available",
                "color: hotpink; background: #333; font-size: x-large;font-family: Courier;");
            window.id = 0;
        }
    }

    render() {
        return (
            <div id="container">
                <Title />
                <AddNewItemForm addTodo={this.addTodo} />
                <ShoppingList todos={this.state.data} remove={this.removeTodo} />
            </div>
        );
    }
}

export default EditShoppingList;