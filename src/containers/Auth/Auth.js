import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.module.css';

import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility'

const Auth = props => {

    const [authForm, setAuthForm] = useState({
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
    })
    const [isSignup, setIsSignup] = useState(true);

    useEffect( () => {
        if (!props.building && props.authRedirectPath !== '/') {
            props.onSetAuthRedirectPath();
        }
    }, [])

    const inputChangedHandler = (event, controlName) => {
        const updatedControlsForm = updateObject(authForm, {
            [controlName]: updateObject(authForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
            })
        })
        setAuthForm(updatedControlsForm)
    }

    const submitHandler = event => {
        event.preventDefault();
        console.log('Submit Handler Entered');
        props.onAuth(authForm.email.value, authForm.password.value, isSignup);
    }

    const switchAuthMode = () => {
        setIsSignup(!isSignup)
    }

    const formElementsArray = [];
    for ( let key in authForm ) {
        formElementsArray.push({
            id: key,
            config: authForm[key]
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
            changed={(event) => inputChangedHandler(event, formElement.id)} />
    ));

    if (props.loading) {
        form = <Spinner />
    }
    
    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p>
                {props.error.message}
            </p>
        )
    }

    let authRedirect =  null
    if (props.isAuthenticated) {
        console.log(props.authRedirectPath)
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                <p>Currently {isSignup ? "Creating New Account" : "Signing into existing account"}</p>
                {form}
                <Button btnType="Success">Submit</Button>
            </form>
            <Button
                clicked={switchAuthMode}
                btnType="Danger">Switch to {isSignup ? "Sign-In" : "Sign-Up"}</Button>
        </div>

    )
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