import styles from './Error.module.css'
import React from 'react'
import Sorry from '../../components/Sorry/Sorry.jsx'

export default function Error(){
    return (
        <div className={styles.error}>
            <Sorry message={'The page you are looking for does not exist'}/>
        </div>
    )
}