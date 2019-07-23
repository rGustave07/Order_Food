import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

const Checkout = props => {

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data')
    }

    let summary = <Redirect to="/"/>
    if (props.ings) {
        const purchaseRedirect = props.purchased ? <Redirect to="/"/> : null
        summary = (
            <div>
                {purchaseRedirect}
                <CheckoutSummary 
                    onCheckoutCancelled={checkoutCancelledHandler}
                    onCheckoutContinued={checkoutContinuedHandler}
                    ingredients={props.ings}/> 
                <Route
                    path={props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </div>)
    }

    return summary
}

const mapStateToProps = state => {
    return {
        purchased: state.order.purchased,
        ings: state.burgerBuilder.ingredients
    }
}


export default connect(mapStateToProps)(Checkout);