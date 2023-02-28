import styles from './Create.module.css'
import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getDiets, createRecipe } from '../../redux/actions.js';

export default function Create(){
    
    const [data, setData] = useState({ title: '', summary: '', healthScore:'', instructions:'', image:'', diets:[]});
    const dbDiets = useSelector(state=>state.diets);
    const [formDiets, setFormDiets] = useState({newDiet:'', diets:dbDiets})
    const [init, setInit] = useState(0)
    const dispatch = useDispatch();
    const [image,setImage] = useState (null)

    useEffect(()=>{
        !init && dispatch(getDiets());
    },[])

    useEffect(()=>{
        init===1 && setFormDiets({...formDiets, diets:dbDiets})
        init<1 && setInit(init+1)
    },[dbDiets])

    const handleInputChange = (ev)=>{

        const prop = ev.target.name;
        let value = ev.target.value;

        if(prop==='image')
        {
            // console.log(value, ev.target.files[0])
            const reader = new FileReader()
            reader.readAsDataURL(ev.target.files[0]);
            reader.onloadend = () => {
                setData({...data, [prop]: reader.result})
            };
            return
        }

        if(prop==='newDiet')
            return setFormDiets({...formDiets, newDiet: value})


        if(prop==='healthScore' &&  value>100)
            value=100
        if(prop==='healthScore' &&  value<0)
            value=0

        setData({
          ...data,
          [prop]: value
        })

    }


    const handleSubmit = (ev)=>{
        ev.preventDefault();

        if(!data.title.length)
            return window.alert('Must insert a title')
        if(!data.summary.length)
            return window.alert('Must insert a summary')

        let healthScore = data.healthScore;

        setData({ title: '', summary: '', healthScore:'', instructions:'', image:'', diets:[]});
        setFormDiets({newDiet:'', diets: dbDiets});
        dispatch(createRecipe({...data, title:data.title.trim(), healthScore:healthScore?healthScore:0}))
    }


    const addDiet = (ev) => {
        if(formDiets.newDiet.length)
        {
            const value = ev.target.value;
            console.log(formDiets.diets.map(el=>el.toLowerCase()))
            if (formDiets.diets.map(el=>el.toLowerCase()).indexOf(value.toLowerCase()) < 0)
            {
                let newArr = [...formDiets.diets, value]
                console.log(newArr)
                setFormDiets({newDiet:'', diets: [...newArr]})
            }
            else
            {
                window.alert('Diet already exists!')
                setFormDiets({...formDiets, newDiet:''})
            }
        }
    }
    
    const isEnter = (ev) => {
        if(ev.key === 'Enter')
            {
                ev.preventDefault()
                addDiet({target:{value:formDiets.newDiet}});
            }

        
    }

    const handleDiets = (ev) => {
        const value = ev.target.value;
        const checked = ev.target.checked;
        
        if(checked){
            let arr = [...data.diets, value];
            setData({...data, diets:[...arr]});
        }
        else{
            let arr = data.diets.filter(el => el !== value)
            setData({...data, diets:[...arr]});
        }
    }




    return (
        <div className={styles.create}>
            <h1>Create New Recipe</h1>

            <form onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <th><label>Title*</label></th>
                        <td><input 
                            name="title" 
                            value={data.title} 
                            placeholder="Insert a title" 
                            type="text"
                            onChange={handleInputChange} 
                            maxLength={250}/></td>
                    </tr>

                    <tr>
                        <th><label>Summary*</label></th>
                        <td><textarea 
                            name="summary" 
                            value={data.summary} 
                            placeholder="Write a summary of the recipe" 
                            type='' 
                            onChange={handleInputChange}
                            /></td>
                    </tr>

                    <tr>
                        <th><label>Health Score</label></th>
                        <td><input 
                            name="healthScore" 
                            value={data.healthScore} 
                            placeholder='0-100'
                            type='number'
                            min={0}
                            max={100} 
                            onChange={handleInputChange}/></td>
                    </tr>

                    <tr>
                        <th><label>Instructions</label></th>
                        <td><textarea 
                            name="instructions" 
                            value={data.instructions} 
                            placeholder="Write the instructions for the recipe" 
                            type="text"  
                            onChange={handleInputChange}/></td>
                    </tr>

                    <tr>
                        <th><label>Image</label></th>
                        <td><input 
                            type='file'
                            accept='image/*'
                            name="image" 
                            placeholder="Select an image" 
                            onChange={handleInputChange}/></td>
                    </tr>

                    <tr>
                        <th><label>Diets</label></th>
                        <td><div>
                            {formDiets.diets.map((el,i)=>
                            <div key={`a${i}`}>
                                <input 
                                    type="checkbox" 
                                    id={el} 
                                    name="diets" 
                                    value={el} 
                                    key={`b${i}`}
                                    onChange={handleDiets}/>
                                <label key={`c${i}`} for={el}>{el}</label>
                                <br key={`d${i}`}/>
                            </div>
                            )}
                                <input 
                                    name="newDiet" 
                                    value={formDiets.newDiet} 
                                    placeholder="Insert new diet" 
                                    type="text"
                                    onChange={handleInputChange} 
                                    maxLength={250}
                                    onKeyDown={isEnter}/>
                                <button className={`${styles.add}`} type='button' onClick={addDiet}>ADD</button>
                            </div>
                        </td>
                    </tr>

                </table>
                <br/>
                <div>
                    <button className={`${styles.send}`} type="submit">SEND</button>
                </div>
            </form>

        </div>
    )
}