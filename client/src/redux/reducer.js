import { GET_RECIPES_BY_NAME, CREATE_RECIPE, GET_DIETS, GET_RECIPE_BY_ID, ORDER, FILTER, AUTHENTICATE, LOGOUT} from "./actions.js";


const initialState = {
    allRecipes: [],
    filteredRecipes:[],
    diets: [],
    idRecipe:{},
    isAdmin:false
  }

const rootReducer = (state= initialState, {type, payload})=>{
    
    let filtered;
    switch (type) {
        case GET_RECIPES_BY_NAME:
            return {...state, allRecipes:payload, filteredRecipes:payload}
        
        case GET_RECIPE_BY_ID:
            return {...state, idRecipe:payload}
            
            
        case GET_DIETS:
            return {...state, diets:payload}
                
        case FILTER:
            let {filter} = payload;
            if(filter==='ALL')
                filtered = [...state.allRecipes]
            else
                filtered = [...state.allRecipes].filter(el=>el.diets.includes(filter.toLowerCase()));
            
            // return {...state, filteredRecipes: filtered}   
            // eslint-disable-next-line
        case ORDER:
            let {sortBy, direction} = payload
            if(!filter)
                filtered = [...state.allRecipes]
            
            filtered = filtered.sort((a,b)=>{
                if(direction==='Ascendent')
                    if(a[sortBy]>b[sortBy]) return 1
                    else    return -1
                if(direction==='Descendent')
                    if(a[sortBy]<b[sortBy]) return 1
                    else    return -1 

                else return 0
            })
            return {...state, filteredRecipes: filtered}
                    

        case AUTHENTICATE:
            let {user, pass} = payload;

            if(!(user==='admin' && pass==='admin'))
            {    
                window.alert('Wrong authentication')
                return {...state}
            }
            
            return {...state, isAdmin: true}

        case LOGOUT:
            return {...state, isAdmin: false}
                
        case CREATE_RECIPE:
        default:
            return {...state};
    }

}

export default rootReducer