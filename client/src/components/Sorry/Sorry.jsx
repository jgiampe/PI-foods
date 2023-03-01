import React from "react"
import image from '../../images/error.png'
import styles from './Sorry.module.css'

export default function Sorry({message}){


    return(
        <div className={styles.sorry}>
            <h1>We are sorry<br/>{message}</h1>
            <img src={image} alt="error" />
        </div>
    )
}