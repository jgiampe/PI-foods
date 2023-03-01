const {Recipe, Diet, Op} = require('../db.js');
const axios =  require("axios");

require('dotenv').config();
const {APIKEY1} = process.env;

const apiDiets = (rawDiets) =>{
    const raw = [...rawDiets.diets];
    if(rawDiets.vegetarian) raw.push('vegetarian')
    if(rawDiets.vegan)      raw.push('vegan')
    if(rawDiets.glutenFree) raw.push('gluten free')
    if(rawDiets.dairyFree)  raw.push('dairy free')
    const diets = Array.from(new Set(raw.sort()));
    
    return diets;
}

const filterDb = (dbRaw, detail) => {
    if(detail)
    {
        

        dbRaw.diets = dbRaw.diets.map(p=>p.name)

        return dbRaw
    }
        
    const dbFiltered = dbRaw.map(el => {
        const diets = el.diets.map(p=>p.name)

        const recipe = {
            id:el.id,
            title: el.title,
            healthScore: el.healthScore,
            diets,
            image:el.image
        }


        return recipe
    });
    
    if(detail)
        return dbFiltered[0]

    return dbFiltered
}

const filterApi = (apiRaw, detail) => {
    if(detail)
    {
        const diets = apiDiets({
            vegetarian: apiRaw.vegetarian,
            vegan:      apiRaw.vegan,
            glutenFree: apiRaw.glutenFree,
            dairyFree:  apiRaw.dairyFree,
            diets:      apiRaw.diets
        });

        let plainText = apiRaw.summary.replace(/<\/?[^>]+(>|$)/g, "");

        return {
            id: apiRaw.id, 
            title: apiRaw.title,
            summary: plainText, 
            healthScore: apiRaw.healthScore,
            diets, 
            image: apiRaw.image,
            instructions: apiRaw.instructions
        }
    }
    
    const apiFiltered = apiRaw.map(el => {
        const diets = apiDiets({
            vegetarian: el.vegetarian,
            vegan:      el.vegan,
            glutenFree: el.glutenFree,
            dairyFree:  el.dairyFree,
            diets:      el.diets
        });

        const recipe = {
            id: el.id, 
            title: el.title,
            summary: el.summary, 
            healthScore: el.healthScore,
            diets, 
            image: el.image, 
        }
        
        return recipe
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
            where: {name:name.toLowerCase()}
        })
        await newRecipe.addDiet(newDiet)
    });
    }

    return newRecipe;
}

const getRecipeById = async (id) =>{
    let recipeRaw, recipeFiltered;
    try{
        if (isNaN(id))  //busco en DB
        { 
            recipeRaw = await Recipe.findByPk(id,
                {include: {
                    model:Diet,
                    attributes:['name'],        //traigo solo la columna name de Diets
                    through:{attributes:[]}     //evito la tabla compartida
                }
            });
            console.log(recipeRaw.toJSON())
            recipeFiltered = filterDb(recipeRaw.toJSON(),true);
        }
        else      //Busco en API
        {
            recipeRaw = (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${APIKEY1}`)).data;
            recipeFiltered = filterApi(recipeRaw,true);
        }
        
    }
    catch(err){
        console.log(err)
        recipe = null
    }

    return recipeFiltered
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