const {Recipe, Diet, Op} = require('../db.js')
const axios =  require("axios")

require('dotenv').config();
const {APIKEY1} = process.env;


const getRecipes = async (req, res) => {
    const {name} = req.query;
    const recipes = [];
  
    /* CUANTOS RESULTADOS QUIERO MANEJAR ?
    
    *SE PUEDEN LIMITAR A 100 (NO SE COLOCA NADA EN NUMBER)
    *SE PUEDEN BUSCAR TODOS: ITERAR COLOCANDO OFFSET X100, 
        AUMENTANDO OFFSET HASTA QUE totalResults sea 0   
        
    *Filtrar cantidad de resultados por página, luego ir buscando
      segun esa cantidad y corriendo el offset hasta que 
      no hayan totalResults
    
    */
    try {
        let response, dbRecipes;

        if(!name)
        {
            response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?&offset=0&number=1&apiKey=${APIKEY1}`);
            dbRecipes = await Recipe.findAll();
        }
        else
        {
            response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&offset=0&number=1&apiKey=${APIKEY1}`);
            //buscar en DB
            dbRecipes = await Recipe.findAll({
                where:{
                    name:{[Op.like]:`%${name}%`}
                }
            })
        }
        
        recipes.push(response.data.results);
        recipes.push(dbRecipes);
        recipes.flat();

        if (recipes.length)
            res.json(recipes);
        else 
            res.status(404).send('No results found')
    
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

const getRecipeById = async (req, res) => {
    const {idReceta} = req.params;
    
    try {
        if (isNaN(idReceta))  //busco en DB
        { 
            let recipe = await Recipe.findByPk(idReceta,
                {include: {
                    model:Diet,
                    attributes:['name'],
                    through:{attributes:[]}
                }
            });
            if (recipe)
                return res.json(recipe)
            
        }
        else{
            let recipe = await axios.get(`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${APIKEY1}`);
            if(!recipe.data.status)
            return res.json(recipe.data)
        }
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontró receta con ese ID')
    }
}
  
const createRecipe = async (req,res) =>{
    const {name, summary, healthScore, instructions, diets} = req.body;
    if(!name || !summary)
        return res.status(404).send('Faltan datos')

    try {
        let newRecipe = await Recipe.create({
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
        res.send('OK')

    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error')
    }
}

module.exports = {getRecipes, getRecipeById, createRecipe}