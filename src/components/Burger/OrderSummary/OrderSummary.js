import React, { Component } from 'react'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
// this could be a functional component

    render () {

        const ingredientSummary = Object.keys(this.props.ingredients)
            .map((ingredientName, index) => {
                return <li key={ingredientName}><span>{ingredientName}</span>: {this.props.ingredients[ingredientName]}</li>
            })

        return (
            <Auxiliary>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>
                    <strong>Total Price: {this.props.price.toFixed(2)}</strong>
                </p>
                <p>Continue to checkout</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
            </Auxiliary>
        )
    }
}

// const orderSummary = props => {
//     const ingredientSummary = Object.keys(props.ingredients)
//         .map((ingredientName, index) => {
//             return <li key={ingredientName}><span>{ingredientName}</span>: {props.ingredients[ingredientName]}</li>
//         })

//     return (
//         <Auxiliary>
//             <h3>Your Order</h3>
//             <p>A delicious burger with the following ingredients:</p>
//             <ul>
//                 {ingredientSummary}
//             </ul>
//             <p>
//                 <strong>Total Price: {props.price.toFixed(2)}</strong>
//             </p>
//             <p>Continue to checkout</p>
//             <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
//             <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
//         </Auxiliary>
//     )
// }


export default OrderSummary