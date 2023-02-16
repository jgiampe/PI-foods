const {Recipe, Diet} = require('../db.js');
const axios =  require("axios");

require('dotenv').config();
const {APIKEY1} = process.env;

const createRecipe = async (name, summary,healthScore,instructions,diets) =>{
    const newRecipe = await Recipe.create({
        name, 
        summary, 
        healthScore,
        instructions,
    });
        
    if(diets.length)
    {
        diets.forEach(async (name,i) => {
            const [newDiet]= await Diet.findOrCreate({
            where: {name}
        })
        await newRecipe.addDiet(newDiet)
    });
    }

    return newRecipe;
}

const getRecipeById = async (id) =>{
    let recipe;
    try{
        if (isNaN(id))  //busco en DB
        { 
            recipe = await Recipe.findByPk(id,
                {include: {
                    model:Diet,
                    attributes:['name'],        //traigo solo la columna name de Diets
                    through:{attributes:[]}     //evito la tabla compartida
                }
            });
        }
        else      //Busco en API
            recipe = (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${APIKEY1}`)).data;
        
    }
    catch(err){
        recipe = null
    }

    return recipe
}

const getRecipesByName = async(name) => {
    const recipes=[];
    
    //busco en API
    let response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&offset=0&number=1&apiKey=${APIKEY1}`);
    //busco en DB
    let dbRecipes = await Recipe.findAll({
        where:{
            name:{[Op.like]:`%${name}%`}
        }
    })
    recipes.push(response.data.results);
    recipes.push(dbRecipes);
    recipes.flat();

    return recipes
} 


const getAllRecipes = async () => {
    const recipes = [];
    
    let response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?&offset=0&number=1&apiKey=${APIKEY1}`);
    let dbRecipes = await Recipe.findAll();

    recipes.push(response.data.results);
    recipes.push(dbRecipes);
    recipes.flat();

    return recipes
}


module.exports = {createRecipe, getRecipeById, getRecipesByName, getAllRecipes}