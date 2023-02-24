import { useState } from 'react';
import styles from './SearchBar.module.css'
import React from 'react';
// import lupa from '../../images/lupa.png'

export default function SearchBar({onSearch}) {
   const [id, setId] = useState();

   var getId = (event)=>setId(event.target.value);

   const handleKeyPress = (ev) =>{
      if(ev.key === 'Enter')
         window.alert(id)
    }
   
   return (
      <div className={styles.search}>
         <input type='search' placeholder='Search here' onChange={getId} onKeyDown={handleKeyPress}/>
         <button onClick={()=>window.alert(id)}>
            {/* <img className={styles.lupa} src={lupa} alt="lupa" />    */}
            Search
         </button> 
      </div>
   );
}
