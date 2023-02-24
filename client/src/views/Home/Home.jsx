import styles from './Home.module.css'
import Cards from '../../components/Cards/Cards.jsx'
import { useEffect } from 'react'
import axios from 'axios'
import React from 'react'

export default function Home(){




    useEffect(()=>{
        
    axios.get(`http://localhost:3001/recipes`)
    .then((response) => response.data)
    .then((data) => {
        console.log(data)
    });
    },[])


    return (
        <div className={styles.home}>
            <Cards/>
        </div>
    )
}