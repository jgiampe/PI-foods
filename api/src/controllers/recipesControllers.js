const {Recipe, Diet, Op} = require('../db.js');
const axios =  require("axios");

require('dotenv').config();
const {APIKEY1} = process.env;

const filterDb = (dbRaw, detail) => {
    const dbFiltered = dbRaw.map(el => {
        const diets = el.diets.map(p=>p.name)
        return({
            id:el.id,
            title: el.title,
            summary: el.summary,
            healthScore: el.healthScore,
            diets,
            image:el.image
        })
    });

    return dbFiltered
}

const filterApi = (apiRaw, detail) => {
    const apiFiltered = apiRaw.map(el => {
        const rawDiets = [...el.diets];
        if(el.vegetarian) rawDiets.push('vegetarian')
        if(el.vegan)      rawDiets.push('vegan')
        if(el.glutenFree) rawDiets.push('gluten free')
        
        const diets = Array.from(new Set(rawDiets.sort()));

        return ({
            id: el.id, 
            title: el.title,
            summary: el.summary, 
            healthScore: el.healthScore,
            diets, 
            image: el.image 
        })
    });

    return apiFiltered
}


const createRecipe = async (title, summary, healthScore, image, instructions, diets) =>{
    const newRecipe = await Recipe.create({
        title, 
        summary, 
        healthScore,
        instructions,
        image
    });
    if(diets && diets.length)
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

const getRecipesByName = async(title) => {
    
    //busco en API
    let apiRaw = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${title}&addRecipeInformation=true&number=10&apiKey=${APIKEY1}`)).data.results;
    //busco en DB
    let dbRaw = await Recipe.findAll({
        where:{
            title:{[Op.iLike]:`%${title}%`}
        },
        include: {
            model:Diet,
            attributes:['name'],        //traigo solo la columna name de Diets
            through:{attributes:[]}     //evito la tabla compartida
        }
    })

    const dbFiltered = filterDb(dbRaw);
    const apiFiltered = filterApi(apiRaw)

    const recipes=[...apiFiltered, ...dbFiltered];

    return recipes
} 


const getAllRecipes = async () => {
    
    const apiRaw = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?&addRecipeInformation=true&number=10&apiKey=${APIKEY1}`)).data.results;
    const dbRaw = await Recipe.findAll({include: {
        model:Diet,
        attributes:['name'],        //traigo solo la columna name de Diets
        through:{attributes:[]}     //evito la tabla compartida
    }});
    
    const apiFiltered = filterApi(apiRaw);
    const dbFiltered = filterDb(dbRaw);

    const recipes = [...apiFiltered, ...dbFiltered];

    return recipes
}


module.exports = {createRecipe, getRecipeById, getRecipesByName, getAllRecipes}