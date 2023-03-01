import styles from './Create.module.css'
import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getDiets, createRecipe, authenticate,logout } from '../../redux/actions.js';

export default function Create(){
    
    const [data, setData] = useState({ title: '', summary: '', healthScore:'', instructions:'', image:'', diets:[]});
    const dbDiets = useSelector(state=>state.diets);
    const [formDiets, setFormDiets] = useState({newDiet:'', diets:dbDiets})
    const [init, setInit] = useState(0);
    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState([...Array(12).fill(false)]);
    const isAdmin = useSelector(state=>state.isAdmin)
    const [authentication, setAuthentication] = useState({user:'', pass:''})

    useEffect(()=>{
        dispatch(getDiets());
    },[])

    useEffect(()=>{
        init===1 && setFormDiets({...formDiets, diets:[...dbDiets]})
        init<2 && setInit(init+1)
    },[dbDiets])


    

    const handleInputChange = (ev)=>{

        const prop = ev.target.name;
        let value = ev.target.value;
        if(prop==='image')
        {
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
        dispatch(createRecipe({...data, title:data.title.trim(), healthScore:healthScore?healthScore:0}))
        setInit(1)
        setData({ title: '', summary: '', healthScore:'', instructions:'', image:'', diets:[]});
        setFormDiets({newDiet:'', diets: [...dbDiets]});
        setIsChecked([])
    }


    const addDiet = () => {
        if(formDiets.newDiet.length)
        {
            const value = formDiets.newDiet;
            
            if (formDiets.diets.map(el=>el.toLowerCase()).indexOf(value.toLowerCase()) < 0)
            {
                let newArr = [...formDiets.diets, value]
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
        const i = ev.target.name;
        let checkboxes = [...isChecked]
        let arr;
        if(checked){
            arr = [...data.diets, value];
            checkboxes[i]=true;
        }
        else{
            arr = data.diets.filter(el => el !== value)
            checkboxes[i]=false;
        }
        
        
        setData({...data, diets:[...arr]});
        setIsChecked([...checkboxes])
    }


    const onClose = () => {
        setData({...data, image:''})
    }


    const loginChange = (ev) => {
        const prop = ev.target.name;
        let value = ev.target.value;


        setAuthentication({
            ...authentication,
            [prop]: value
        })
    }

    const login = () => {
        if(!authentication.user || !authentication.pass)
            window.alert('There are missing fields')
        
        else
        {
            setAuthentication({user:'', pass:''})
            dispatch(authenticate(authentication))
        }
    }

    return (
        <div className={styles.create}>
            {
            isAdmin?
            <div className={styles.container}>
                <span className={styles.title}>
                    <div><h1>Create New Recipe</h1></div>
                    <div >
                        <button onClick={()=>{dispatch(logout())}}>LOGOUT</button>
                    </div>
                </span>

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
                                onChange={handleInputChange}/> (Default is 0)</td>
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
                            <td>{!data.image?
                                <input 
                                type='file'
                                accept='image/*'
                                name="image" 
                                placeholder="Select an image" 
                                className={styles.imageInput}
                                onChange={handleInputChange}/>
                                
                                :<div className={styles.uploaded}>
                                    <img className={styles.image} src={data.image} alt='uploaded_Image'/>
                                    <div className={styles.close}>
                                        <button onClick={onClose}>X</button>
                                    </div>
                                </div>
                                }
                                </td>
                        </tr>

                        <tr>
                            <th><label>Diets</label></th>
                            <td><div>
                                <div className={styles.diets}>
                                {formDiets.diets.map((el,i)=>
                                <div key={`a${i}`}>
                                    <input 
                                        type="checkbox" 
                                        id={el} 
                                        name={i} 
                                        value={el} 
                                        key={`b${i}`}
                                        checked={isChecked[i]}
                                        onChange={handleDiets}/>
                                    <label key={`c${i}`} for={el}>{el}</label>
                                    <br key={`d${i}`}/>
                                </div>
                                )}
                                </div>
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
                        <button className={`${styles.send}`} type="submit"><h3>SEND</h3></button>
                    </div>
                </form>
            </div>

            :<form className={styles.login} onSubmit={login}>
                <h1>Only authorized access</h1>
                <div>(admin : admin)</div>
                <div>
                    <label>Username</label>{'    '}
                    <input 
                        name="user" 
                        value={authentication.user} 
                        placeholder="Insert user" 
                        type="text"
                        onChange={loginChange} />
                    
                </div>

                <div>
                    <label>Password</label>{'    '}
                    <input 
                        name="pass" 
                        value={authentication.pass} 
                        placeholder="Insert password" 
                        type="password" 
                        onChange={loginChange}/>
                    
                </div>
                <br/>
                <div>
                    <button className={styles.submit} type="submit">LOGIN</button>
                </div>
            </form>
            }
        </div>
    )
}