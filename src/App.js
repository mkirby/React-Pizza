import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {
  state = {
    api: [],
    pizzaFormState: {
      topping: "",
      size: "Small",
      vegetarian: false
    }
  }

  componentDidMount() {
    fetch(`http://localhost:3000/pizzas`)
    .then(r=>r.json()).then(data => this.setState({api: data}))
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm 
          handlePizzaSubmit={this.handlePizzaSubmit}
          pizzaFormState={this.state.pizzaFormState}
          changeHandlerPizzaForm={this.changeHandlerPizzaForm}

        />
        <PizzaList pizzas={this.state.api} editPizzaById={this.editPizzaById}/>
      </Fragment>
    );
  }

  editPizzaById = (id) => {
    const newApi = [...this.state.api]
    const index = newApi.findIndex(pizza => pizza.id === id )
    const pizzaToEdit = newApi[index]
    this.setState({pizzaFormState: pizzaToEdit })
  }

  changeHandlerPizzaForm = ({ target }) => {
    if (target.type === "radio") {
      const veg = target.value === "Vegetarian" ? true : false
      this.setState({pizzaFormState: {...this.state.pizzaFormState, [target.name]: veg }})
    } else {
      this.setState({pizzaFormState: {...this.state.pizzaFormState, [target.name]: target.value }})
    }
  }

  handlePizzaSubmit = () => {
    this.state.pizzaFormState.id ? this.updatePizza(this.state.pizzaFormState) : this.createPizza(this.state.pizzaFormState)
  }

  addPizzaUpdateToState = (data) => {
    const newApi = [...this.state.api]
    const index = newApi.findIndex(pizza => pizza.id === data.id)
    newApi[index] = data
    this.setState({
      api: newApi,
      pizzaFormState: {
        topping: "",
        size: "Small",
        vegetarian: false
      }
    })
  }

  addNewPizzaToState = (data) => {
    this.setState({
      api: [...this.state.api, data],
      pizzaFormState: {
        topping: "",
        size: "Small",
        vegetarian: false
      }
    })
  }

  createPizza = (pizzaObj) => {
    fetch(`http://localhost:3000/pizzas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(pizzaObj)
    })
    .then(r=>r.json())
    .then(this.addNewPizzaToState)
  }

  updatePizza = (pizzaObj) => {
    fetch(`http://localhost:3000/pizzas/${pizzaObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(pizzaObj)
    })
    .then(r=>r.json())
    .then(this.addPizzaUpdateToState)
  }
}

export default App;
