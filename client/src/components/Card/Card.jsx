import styles from './Card.module.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import noImage from '../../images/noImage.png'
import { useSelector } from 'react-redux'
import ScoreBar from '../ScoreBar/ScoreBar.jsx'

export default function Card ({id, title, image, summary, healthScore, diets}){

    const dietList = useSelector(state=>state.diets.map(el=>el.toLowerCase()))

    const dietColors = [
        {backgroundColor:'#ffc107', color:'#000'},
        {backgroundColor:'#f0e68c', color:'#000'},
        {backgroundColor:'#cddc39', color:'#000'},
        {backgroundColor:'#00ffff', color:'#000'},
        {backgroundColor:'#2196F3', color:'#FFF'},
        {backgroundColor:'#4CAF50', color:'#FFF'},
        {backgroundColor:'#00bcd4', color:'#000'},
        {backgroundColor:'#9c27b0', color:'#FFF'},
        {backgroundColor:'#f44336', color:'#FFF'},
        {backgroundColor:'#fdf5e6', color:'#000'},
        {backgroundColor:'#e91e63', color:'#FFF'},
        {backgroundColor:'#795548', color:'#FFF'},
        {backgroundColor:'#9e9e9e', color:'#000'},
    ]


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
            <div className={styles.diets}>
                {diets.map((el,i)=>
                    <div 
                    className={styles.diet} 
                    key={i}
                    style={dietList.indexOf(el.toLowerCase())===-1?
                            dietColors[12]: 
                            dietColors[dietList.indexOf(el.toLowerCase())]}
                    >{el}</div>)}
            </div>
        </div>
    )
}