import React from "react";
import styles from './Pagination.module.css'

export default function Pagination({index, totalIndexes, change}){
    const indexes = [];
    for(let i=1; i<=totalIndexes; i++)
        indexes.push(i)


    const clicked = (i)=>{
        change(index+i)
    }

    return (
        <table>
        <tr className={styles.container}>
            {index!==1 ? <td><div className={styles.leftArrow} onClick={()=>clicked(-1)}/></td>: null}
            {indexes.map(i=>{
                if(i===index) 
                    return <td key={i} className={styles.index}>{i}</td>
                else
                    return <td key={i} onClick={()=>change(i)}>{i}</td>
                    })}
            {totalIndexes>1 && index!==totalIndexes ? <td><div className={styles.rightArrow} onClick={()=>clicked(1)}/></td> : null}
        </tr>
        </table>
    )
}