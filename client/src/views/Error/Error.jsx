import styles from './Error.module.css'
import React from 'react'

export default function Error(){
    return (
        <div className={styles.error}>
            <h1>Error 404</h1>
        </div>
    )
}