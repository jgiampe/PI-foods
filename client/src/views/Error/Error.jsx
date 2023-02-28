import styles from './Error.module.css'
import React from 'react'
import image from '../../images/error.png'

export default function Error(){
    return (
        <div className={styles.error}>
            <h1>We are sorry<br/>The page you are looking for does not exist</h1>
            <img src={image} alt="error" />
        </div>
    )
}