import React from "react"
import styles from './ScoreBar.module.css'


export default function ScoreBar({healthScore}){

    return (
        <div className={styles.bar_container}>
            <div 
            className={`${styles.bar} ${healthScore>75?styles.greenBar:healthScore>50?styles.yellowBar:healthScore>25?styles.orangeBar:styles.redBar}`} 
            style={{width:`${healthScore<15?15:healthScore}%`}}
            >
                {healthScore}%
            </div>
        </div>
    )
}