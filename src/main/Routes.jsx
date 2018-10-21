import './App.css'

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { CSSTransition, TransitionGroup } from "react-transition-group"

import Home from '../components/home/Home'
import UserCrud from '../components/users/UserCrud';
import Products from '../components/products/ProductsCrud';

export default props => 
    <Route render={({ location }) => (
        <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={1000} appear>
                <Switch location={location}>
                    <Route exact path='/' component={Home} />
                    <Route path='/users' component={UserCrud} />
                    <Route path='/products' component={Products} />
                    <Redirect from='*' to='/' />
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )} />
