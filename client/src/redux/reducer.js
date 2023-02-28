import { GET_RECIPES_BY_NAME, CREATE_RECIPE, GET_DIETS, GET_RECIPE_BY_ID, ORDER, FILTER} from "./actions.js";


const initialState = {
    allRecipes: [],
    filteredRecipes:[],
    diets: []
  }

const rootReducer = (state= initialState, {type, payload})=>{
    
    let filtered;
    switch (type) {
        case GET_RECIPES_BY_NAME:
        case GET_RECIPE_BY_ID:
            return {...state, allRecipes:payload, filteredRecipes:payload}
            
            
            
            
            
        case GET_DIETS:
            return {...state, diets:payload}
                
        case ORDER:
            let {sortBy, direction} = payload
            filtered = [...state.allRecipes].sort((a,b)=>{
                if(direction==='Ascendent')
                    if(a[sortBy]>b[sortBy]) return 1
                    else    return -1
                if(direction==='Descendent')
                    if(a[sortBy]<b[sortBy]) return 1
                    else    return -1 

                else return 0
            })
            return {...state, filteredRecipes: filtered}
                    
        case FILTER:
            if(payload==='ALL')
                filtered = [...state.allRecipes]
            else
                filtered = [...state.allRecipes].filter(el=>el.diets.includes(payload.toLowerCase()));
            
            return {...state, filteredRecipes: filtered}   
                        
        case CREATE_RECIPE:
        default:
            return {...state};
    }

}

export default rootReducer