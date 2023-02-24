import styles from './Nav.module.css';
import { useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { NavLink } from 'react-router-dom';
import React from 'react';

export default function Nav(){
    const location = useLocation();
    
    
         
    if(location.pathname!=='/')
        return (
            <div className={styles.nav}>
                <NavLink className={styles.navlink} to={'/home'}>
                    Home
                </NavLink>
                
                <NavLink className={styles.navlink} to={'/create'}>
                    New Recipe
                </NavLink>

                <SearchBar/>
            </div>
        )
}