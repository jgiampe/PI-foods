import styles from './Splash.module.css'
import image from '../../images/splash.jpg'
import { NavLink } from 'react-router-dom'

export default function Splash(){
    return (
        <div className={styles.Welcome}>
            <img src={image} alt="Welcome image" />
            <NavLink className={styles.navlink} to={'/home'}>
                Enter website!
            </NavLink>
        </div>
    )
}
