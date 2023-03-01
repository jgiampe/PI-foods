import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css'
import React from 'react';
import lupa from '../../images/lupa.png'

export default function SearchBar() {
   const [name, setName] = useState('');
   const navigate = useNavigate();

   var getName = (event)=>setName(event.target.value);

   const onSearch = () => {
      if(name.length)
         {
            setName('')
            navigate(`/home/${name}`)
         }
   }

   const handleKeyPress = (ev) =>{
      if(ev.key === 'Enter')
         onSearch();
    }
   
   return (
      <div className={styles.search}>
         <input type='search' value={name} placeholder='Search here' onChange={getName} onKeyDown={handleKeyPress}/>
         <button onClick={onSearch}>
            <img src={lupa} alt="lupa" />   
            Search
         </button> 
      </div>
   );
}
