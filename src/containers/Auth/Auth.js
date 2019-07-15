import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.module.css';

import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility'

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    isEmail: true
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    componentDidMount () {
        if (!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, controlName) => {

        const updatedControlsForm = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        })
        this.setState({controls: updatedControlsForm})
    }

    submitHandler = event => {
        event.preventDefault();
        console.log('Submit Handler Entered');
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthMode = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        })
    }

    render () {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                shouldValidate={formElement.config.validation}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

        if (this.props.loading) {
            form = <Spinner />
        }
        
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>
                    {this.props.error.message}
                </p>
            )
        }

        let authRedirect =  null
        if (this.props.isAuthenticated) {
            console.log(this.props.authRedirectPath)
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    <p>Currently {this.state.isSignup ? "Creating New Account" : "Signing into existing account"}</p>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button
                    clicked={this.switchAuthMode}
                    btnType="Danger">Switch to {this.state.isSignup ? "Sign-In" : "Sign-Up"}</Button>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token != null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => {dispatch(actions.setAuthRedirectPath('/'))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)