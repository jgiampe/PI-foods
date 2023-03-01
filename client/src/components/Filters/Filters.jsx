import React, { useEffect } from "react";
import styles from './Filters.module.css'
import { useDispatch, useSelector } from "react-redux";
import { filter, getDiets, order } from "../../redux/actions.js";

export default function Filters({filters, setFilters}){

    const dispatch = useDispatch();
    const diets = useSelector(state=>state.diets)
    // const [filters, setFilters] = useState(
    //     {
    //         sortBy: 'title', 
    //         direction: 'Ascendent', 
    //         filter: 'ALL',
    //         changed:''
    //     }) ;

    useEffect(() => {
        dispatch(getDiets())
    },[])


    useEffect(() => {
        if(filters.changed === 'filter')
            dispatch(filter(filters))
        else
            dispatch(order({sortBy: filters.sortBy, direction: filters.direction}))        
    },[filters])
    

    const changed = (prop) => {
        setFilters({...filters, [prop.name]: prop.value, changed:prop.name})
    }

    return (
        <div className={styles.filters}>
            <div>
                <label for='sortBy'>Sort by</label>
                <select name="sortBy" id="sortBy" onChange={(ev)=>changed(ev.target)}>
                    <option value="title">ABC</option>
                    <option value="healthScore">Health Score</option>
                </select>
            </div>
            <div>
                <label for='direction'>Direction</label>
                <select name="direction" id="direction" onChange={(ev)=>changed(ev.target)}>
                    <option value="Ascendent">Ascendent</option>
                    <option value="Descendent">Descendent</option>
                </select>
            </div>
            <div>
                <label for='filter'>Filter by diet</label>
                <select name="filter" id="filter" onChange={(ev)=>changed(ev.target)}>
                    <option value="ALL">ALL</option>
                    {diets.map((diet,i) => 
                        <option value={diet.name} key={i}>{diet}</option>
                    )}
                </select>
            </div>
        </div>
    )
}