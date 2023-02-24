import styles from './Splash.module.css'
import BG from '../../images/splash2.png'
import pizza from '../../images/pizza.png'
import { NavLink } from 'react-router-dom'
import React from 'react'

export default function Splash(){
    return (
        <div className={styles.splash}>
            <img className={styles.bg} src={BG} alt='BG'/>
            <NavLink className={styles.navlink} to={'/home'}>
                <img src={pizza} alt="Home" />
            </NavLink>
        </div>
    )
}
