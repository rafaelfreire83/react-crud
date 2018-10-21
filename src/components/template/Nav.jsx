import './Nav.css'
import React from 'react'
import NavItem from './NavItem'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <NavItem 
                url="/" 
                icon="home" 
                text="Início" 
            />
            <NavItem 
                url="/users" 
                icon="users" 
                text="Usuários" 
            />
            <NavItem 
                url="/products" 
                icon="shopping-cart" 
                text="Produtos" 
            />
        </nav>
    </aside>
