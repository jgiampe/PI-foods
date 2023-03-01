import styles from './Card.module.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import noImage from '../../images/noImage.png'
import { useSelector } from 'react-redux'
import ScoreBar from '../ScoreBar/ScoreBar.jsx'

export default function Card ({id, title, image, summary, healthScore, diets}){

    const dietList = useSelector(state=>state.diets.map(el=>el.toLowerCase()))


    const navigate = useNavigate();

    let imageless = false
    if(!image){
        imageless = true;
        image = noImage;
    };

    return(
        <div className={styles.card} onClick={()=>navigate(`/detail/${id}`)}>
            <div className={styles.tit}>
                <h1>{title}</h1>
            </div>
            <img src={image} alt={title}
                style={imageless?{height:'17vw'}:null}
            />
            <div className={styles.healthScore}>
                <div>Health Score</div>
                <ScoreBar healthScore={healthScore}/>
            </div>
            <div className={`${styles['diets']}`}>
                {diets.map((el,i)=>
                    <div 
                    className={`${styles.diet} ${dietList.indexOf(el.toLowerCase())===-1?
                        styles['diet12']: 
                        styles[`diet${dietList.indexOf(el.toLowerCase())}`]}`} 
                    key={i}
                   
                    >{el}</div>)}
            </div>
        </div>
    )
}