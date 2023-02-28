import styles from './Home.module.css'
import Cards from '../../components/Cards/Cards.jsx'
import { useEffect, useState } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipesByName, order } from '../../redux/actions.js'
import Pagination from '../../components/Pagination/Pagination.jsx'
import Filters from '../../components/Filters/Filters.jsx'
import { useParams } from 'react-router-dom'
export default function Home(){
    
    const recipes = useSelector(state=>state.filteredRecipes)
    const dispatch = useDispatch();
    const [index, setIndex] = useState(0)
    const [loader, setLoader] = useState(true)
    const [init, setInit] = useState(true)
    
    const {name} = useParams()
    
    useEffect(()=>{
        setInit(true);
        setLoader(true);
        if(name)
            dispatch(getRecipesByName(name));    
        else
            dispatch(getRecipesByName());
    },[name])
    
    useEffect(()=>{
        if(loader)
            setLoader(false)
        if(recipes.length && init)
        {
            setInit(false);
            dispatch(order({sortBy: 'title', direction: 'Ascendent'}));
        }
    },[recipes])

    const pageChange = (i) => {
        setIndex(i-1);
    }



    return (
        <div className={styles.home}>
            {loader?<div className={styles.loader}/>:<div className={styles.home}>
            <Filters/>
            <Cards 
                recipes={recipes} 
                index={index}
            />
            <Pagination 
                index={index+1} 
                change={pageChange} 
                totalIndexes={Math.ceil(recipes.length/9)}
            /></div>}
        </div>
    )
}


