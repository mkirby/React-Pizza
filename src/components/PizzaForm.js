import React from "react"

function PizzaForm(props) {
  return(
      <div className="form-row">
        <div className="col-5">
            <input type="text" name="topping" className="form-control" placeholder="Pizza Topping" value={props.pizzaFormState.topping} onChange={props.changeHandlerPizzaForm}/>
        </div>
        <div className="col">
          <select value={props.pizzaFormState.size} className="form-control" name="size" onChange={props.changeHandlerPizzaForm}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input name="vegetarian" className="form-check-input" type="radio" value="Vegetarian" checked={props.pizzaFormState.vegetarian} onChange={props.changeHandlerPizzaForm}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input name="vegetarian" className="form-check-input" type="radio" value="Not Vegetarian" checked={!props.pizzaFormState.vegetarian} onChange={props.changeHandlerPizzaForm}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={props.handlePizzaSubmit}>Submit</button>
        </div>
      </div>
  )
}

export default PizzaForm
