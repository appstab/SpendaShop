import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import RetailerPrices from "./retailer-prices"
// stateless component
const Title = () => {
    return (
        <div id="titleWrapper">
            <h2 className="text-center">Shopping List</h2>
        </div>
    );
};

class AddNewItemForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isLoading: false,
            options: ["Milk", "Eggs", "Bread", "Pasta", "Rise", "Cheese"],
            selected: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleNewTodoAddition = this.handleNewTodoAddition.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleNewTodoAddition(event) {
        event.preventDefault();
        if (this.state.selected !== '') {
            const itemName = this.state.selected;
            this.setState({
                selected: ""
            }, () => this.props.addTodo(itemName));
        }
    }

    render() {
        return (
            // <div id="form" className="input-group">
            <>
                <Typeahead
                    onChange={(selected) => {
                        if (selected !== '') {
                            // let s = this.state.selected;
                            // s.push(selected)
                            this.setState({ selected });
                        }
                    }}
                    options={this.state.options}
                    selected={this.state.selected}
                    ref={(ref) => this._typeahead = ref} />
                <button className="btn btn-outline-secondary mb-1 ml-1"
                    type="button"
                    onClick={(event) => {
                        this.handleNewTodoAddition(event);
                        this._typeahead.clear()
                    }}>Add</button>
            </>
            // </div>
        );
    }
}

const Todo = ({ todo, remove }) => {
    return (
        <li className="list-group-item">
            {todo.value}
            <span
                onClick={() => { remove(todo.id) }} role="img" aria-label="Remove item from list">❌</span>
        </li>
    );
};

const ShoppingList = ({ todos, remove }) => {
    let allTodos = [];

    if (todos.length > 0) {
        allTodos = todos.map((todo, index) => {
            // passing todo and remove method reference
            return (<Todo key={index} todo={todo} remove={remove} />);
            //return (<p>{todo.value}</p>);
        });
    } else {
        allTodos.push(<h3>Nothing to see here. Add items to your list</h3>);
    }

    return (
        <ul className="list-group mt-4">
            {/* <p id="info"> Your Shopping List: </p> */}
            {allTodos}
        </ul>
    );
};

class EditShoppingList extends React.Component {

    constructor(props) {
        super(props);

        const introData = [];

        const localData = localStorage.todos && JSON.parse(localStorage.todos);

        this.state = {
            data: localData || introData,
            retailerPrices: []
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

        let todo = {
            value: val,
            id: id
        };

        // Get prices from retailers catalogue in firebase
        let retailerPrices = []
        this.props.firestore.collection("retailers")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshot
                    let retailer = doc.data();
                    const item = retailer.catalogue.filter(i => i.name === val[0].toLowerCase());

                    let retailerPrice = this.state.retailerPrices.find(rp => rp.name === retailer.name);

                    if (!retailerPrice) {
                        retailerPrice = {
                            name: retailer.name,
                            items: []
                        }
                    }

                    if (item && item.length) {
                        // console.log(item);
                        retailerPrice.items.push({ id: id, name: val[0], price: item[0].price });
                        // todo.prices.push(item[0].price);
                    } else {
                        retailerPrice.items.push({})
                    }

                    console.log("retailerPrice", retailerPrice);
                    retailerPrices.push(retailerPrice)


                });
                console.log("Retailer Prices", retailerPrices);

                this.state.data.push(todo);
                // update state
                this.setState({
                    data: this.state.data,
                    retailerPrices: retailerPrices
                }, () => {
                    // update localStorage
                    this.updateLocalStorage();
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }
    // Handler to remove todo
    removeTodo(id) {
        // filter out the todo that has to be removed
        const list = this.state.data.filter(todo => {
            return todo.id !== id;
        });

        let retailerPrices = this.state.retailerPrices;

        retailerPrices.forEach(rp => {
            let filteredItems = rp.items.filter(rpItem => rpItem.id !== id);
            rp.items = filteredItems;
        })

        // update state
        this.setState({
            data: list,
            retailerPrices
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
            <div className="container">
                <Title />
                <div className="row">
                    <div className="col-sm-4">
                        <AddNewItemForm addTodo={this.addTodo} />
                        <ShoppingList todos={this.state.data} remove={this.removeTodo} />
                    </div>
                    <div className="col-sm-8">
                        <RetailerPrices retailers={this.state.retailerPrices}></RetailerPrices>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditShoppingList;