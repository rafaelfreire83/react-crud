import './Nav.css'
import React from 'react'
import NavItem from './NavItem'

const baseUrl = '/react-crud/'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <NavItem 
                url={`${baseUrl}`}
                icon="home" 
                text="Início" 
            />
            <NavItem 
                url={`${baseUrl}users`}
                icon="users" 
                text="Usuários" 
            />
            <NavItem 
                url={`${baseUrl}products`}
                icon="shopping-cart" 
                text="Produtos" 
            />
        </nav>
    </aside>
