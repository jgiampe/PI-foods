import styles from './Card.module.css'
import React from 'react'

export default function Card ({id, title, image, summary, healthScore, diets}){
    
    return(
        <div className={styles.card}>
            <h1>{title}</h1>
            <img src={image} alt={title} />
            <div className={styles.diets}>
                {diets.map(el=><div className={styles.diet}>{el}</div>)}
            </div>
        </div>
    )
}