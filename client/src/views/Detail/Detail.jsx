import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDiets, getRecipeById } from "../../redux/actions.js";
import { useSelector } from "react-redux";
import styles from './Detail.module.css'
import ScoreBar from "../../components/ScoreBar/ScoreBar.jsx";

export default function Detail(){

    const {id} = useParams();
    const dispatch = useDispatch();
    const recipe = useSelector(state=>state.idRecipe)
    const dietList = useSelector(state=>state.diets.map(el=>el.toLowerCase()))

   

    useEffect(() => {
        console.log(id)
        dispatch(getRecipeById(id));
        dispatch(getDiets());
    },[])

    return(
        <div className={styles.detail}>
        
            {!recipe.error && recipe.title?
            <div className={styles.data}>
                <h1>{recipe.title}</h1>

                {recipe.image?
                <div>
                    <img src={recipe.image} alt={recipe.title} />
                    <br/>
                    
                </div>
                :null}

                {recipe.summary?
                <div className={styles.summary}>
                    <h2>Summary</h2>
                    <div>{recipe.summary}</div>
                    <br/>
                </div>
                :null}

                <div className={styles.healthScore}>
                    <h2>Health Score: 
                        <span className={styles.score} >
                            <ScoreBar healthScore={recipe.healthScore}/>
                        </span>
                    </h2>
                </div>

                {recipe.diets && recipe.diets.length && dietList && dietList.length?
                <div className={styles.diets}>
                    <h2>Diets:</h2>
                    <div className={styles.dietList}>
                        {recipe.diets.map((el,i)=>
                        <div 
                        className={`${styles.diet} ${dietList.indexOf(el.toLowerCase())===-1?
                            styles['diet12']: 
                            styles[`diet${dietList.indexOf(el.toLowerCase())}`]}`}
                        key={i}
                        >{el}</div>)
                        }
                    </div>
                </div>
                :null}

                {recipe.instructions?
                <div className={styles.instructions}>
                    <h2>Instructions</h2>
                    <div dangerouslySetInnerHTML={{ __html: recipe.instructions}} />
                </div>
                :null}
            </div>


            :<h2>{recipe.error}</h2>}
        
        </div>
    )
}