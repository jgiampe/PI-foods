import axios from "axios";

export const GET_RECIPES_BY_NAME = 'GET_RECIPES_BY_NAME';
export const GET_RECIPE_BY_ID = 'GET_RECIPE_BY_ID';
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const GET_DIETS = 'GET_DIETS';
export const FILTER = 'FILTER';
export const ORDER = 'ORDER';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';


export const getRecipesByName = (name) => {
    return async (dispatch) => {
        try {
            let recipes 
            if(name)
                recipes = (await axios.get(`http://localhost:3001/recipes?name=${name}`)).data;
            else
                recipes = (await axios.get(`http://localhost:3001/recipes`)).data;


            return dispatch ({type: GET_RECIPES_BY_NAME, payload: recipes}) 
        } catch (error) {
            console.log(error)
        }   
    }
}

export const getRecipeById = (id) => {
    return async (dispatch) => {
        console.log(id)
        try {
            console.log('no hay error')
            const recipe = (await axios.get(`http://localhost:3001/recipes/${id}`)).data;
            console.log(recipe.diets)
            return dispatch ({type: GET_RECIPE_BY_ID, payload: recipe}) 
        } catch (error) {
            console.log('Hay un error')
            console.log(error)
            return dispatch ({type: GET_RECIPE_BY_ID, payload: {error:'The recipe does not exist'}})
        }   
    }
}

export const createRecipe = (data) => {
    return async (dispatch) => {
        try {
            let result = await axios.post(`http://localhost:3001/recipes`,data)
            if(typeof result === 'string')
                window.alert('An error ocurred')
            else
            {    
                window.alert('Recipe created successfully')
            }
            return dispatch ({type: CREATE_RECIPE}) 
        } catch (error) {
            // console.log(error)
            window.alert('An error ocurred')
        }   
    }
}

export const getDiets = () => {
    return async (dispatch) => {
        try {
            let diets = (await axios.get(`http://localhost:3001/diets`)).data
                //Coloco en mayuscula la primer letra y cada letra luego de un espacio
                .map(el=> 
                    el.split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')
                )
            return dispatch ({type: GET_DIETS, payload:diets}) 
        } catch (error) {
            console.log(error)
            window.alert('Hubo un error: Ver en consola')
        }   
    }
}

export const order = (prop) => ({type: ORDER, payload: prop})

export const filter = (prop) => ({type: FILTER, payload: prop})

export const authenticate = (data) => ({type: AUTHENTICATE, payload: data})

export const logout = () => ({type: LOGOUT})