import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render () {
        let summary = <Redirect to="/"/>
        if (this.props.ings) {
            const purchaseRedirect = this.props.purchased ? <Redirect to="/"/> : null
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary 
                        onCheckoutCancelled={this.checkoutCancelledHandler}
                        onCheckoutContinued={this.checkoutContinuedHandler}
                        ingredients={this.props.ings}/> 
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>)
        }

        return summary
    }
}

const mapStateToProps = state => {
    return {
        purchased: state.order.purchased,
        ings: state.burgerBuilder.ingredients
    }
}


export default connect(mapStateToProps)(Checkout);