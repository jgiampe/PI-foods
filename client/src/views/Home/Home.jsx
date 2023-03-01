import styles from './Home.module.css'
import Cards from '../../components/Cards/Cards.jsx'
import { useEffect, useState } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipesByName, order } from '../../redux/actions.js'
import Pagination from '../../components/Pagination/Pagination.jsx'
import Filters from '../../components/Filters/Filters.jsx'
import { useParams } from 'react-router-dom'
import Sorry from '../../components/Sorry/Sorry.jsx'


export default function Home(){    
    const recipes = useSelector(state=>state.filteredRecipes)
    const [index, setIndex] = useState(0)
    const [loader, setLoader] = useState(true)
    const [init, setInit] = useState(0)
    const {name} = useParams()
    const dispatch = useDispatch();
    const [filters, setFilters] = useState({
        sortBy: 'title', 
        direction: 'Ascendent', 
        filter: 'ALL',
        changed:''
    }) ;
    const found = useSelector(state=>state.allRecipes.length)
    
    useEffect(()=>{
        setInit(1);
        setLoader(true);
        if(name)
            dispatch(getRecipesByName(name));    
        else
            dispatch(getRecipesByName());
    },[name])
    
    useEffect(()=>{
        if(init===1)
        {
            setLoader(false)
            setInit(2)
        }
    },[recipes])
    
    useEffect(() => {
        if(init===2)
            {
                if(recipes.length)
                    dispatch(order({sortBy: 'title', direction: 'Ascendent'}));
                setInit(0)
            }
    },[init])

    useEffect(()=>{console.log(init)})

    const pageChange = (i) => {
        setIndex(i-1);
    }



    return (
        <div className={styles.home}>
            {!init && !found && <Sorry message={'No recipes found'}/>}
            {loader?<div className={styles.loader}/>:<div className={styles.home}>
            {found ? <Filters filters={filters} setFilters={setFilters}/> : null}
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


