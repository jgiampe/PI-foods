import styles from './Nav.module.css';
import { useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { NavLink } from 'react-router-dom';
import React from 'react';
import note from '../../images/note.png'
import home from '../../images/home.png'


export default function Nav(){
    const location = useLocation();
        
    
         
    if(location.pathname!=='/')
        return (
            <div className={styles.nav}>
                <NavLink className={`${styles.home} ${styles.button}`} to={'/home'}>
                    <img src={home} alt="home" />
                    Home
                </NavLink>
                
                <SearchBar/>

                <NavLink className={`${styles.create} ${styles.button}`} to={'/create'}>
                    <img src={note} alt="note" />
                    Add Recipe
                </NavLink>
            </div>
        )
}