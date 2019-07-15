import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout'
import asyncComponent from './hoc/asyncComponent/asyncComponent'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'

import * as actions from './store/actions/index'

const asyncCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout')
})

const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth')
})

const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders')
})

// function App() {
class App extends Component {

    state = {
        show: true
    }

    //  Testing Purposes
    // componentDidMount () {
    //     setTimeout( () => {
    //         this.setState({show: false})
    //     }, 5000)
    // }

    componentDidMount () {
        this.props.onTryAutoSignup();
    }

    render () {

        let routes = (
            <Switch>
                <Route path="/auth" exact component={asyncAuth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        )

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={asyncCheckout} />
                    <Route path="/orders" exact component={asyncOrders} />
                    <Route path="/logout" exact component={Logout} />
                    <Route path="/auth" exact component={Auth} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            )
        }

        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );

  }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
