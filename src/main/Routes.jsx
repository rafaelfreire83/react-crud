import './App.css'

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { CSSTransition, TransitionGroup } from "react-transition-group"

import Home from '../components/home/Home'
import UserCrud from '../components/users/UserCrud';
import Products from '../components/products/ProductsCrud';

const baseUrl = '/react-crud/'

export default props => 
    <Route render={({ location }) => (
        <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={1000} appear>
                <Switch location={location}>
                    <Route exact path={`${baseUrl}`} component={Home} />
                    <Route path={`${baseUrl}users`} component={UserCrud} />
                    <Route path={`${baseUrl}products`} component={Products} />
                    <Redirect from='*' to={`${baseUrl}`} />
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )} />
