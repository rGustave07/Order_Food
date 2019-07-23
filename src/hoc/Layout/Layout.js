import React, { useState } from 'react';
import { connect } from 'react-redux';
import Auxiliary from '../Auxiliary/Auxiliary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import classes from './Layout.module.css'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

const Layout = props => {

    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false)
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible)
    }

    return (
        <Auxiliary>
            <Toolbar
                isAuth={props.isAuthenticated}
                drawerToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer 
                isAuth={props.isAuthenticated}
                closed={sideDrawerClosedHandler}
                open={sideDrawerIsVisible}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Auxiliary>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}


export default connect(mapStateToProps)(Layout)