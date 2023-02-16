const {createRecipe, getRecipeById, getRecipesByName, getAllRecipes} = require ('../controllers/recipesControllers.js')




const getRecipesByNameHandler = async (req, res) => {
    const {name} = req.query;
    let recipes;
    /* CUANTOS RESULTADOS QUIERO MANEJAR ?
    
    *SE PUEDEN LIMITAR A 100 (NO SE COLOCA NADA EN NUMBER)
    *SE PUEDEN BUSCAR TODOS: ITERAR COLOCANDO OFFSET X100, 
        AUMENTANDO OFFSET HASTA QUE totalResults sea 0   
        
    *Filtrar cantidad de resultados por página, luego ir buscando
      segun esa cantidad y corriendo el offset hasta que 
      no hayan totalResults
    
    */
    try {
        if(!name)
            recipes = await getAllRecipes()
        else
            recipes = await getRecipesByName(name)

        if (recipes.length)
            res.json(recipes);
        else 
            res.status(404).send('No results found')
    
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

const getRecipeByIdHandler = async (req, res) => {
    const {idReceta} = req.params;

    
    try {
        const recipe = await getRecipeById(idReceta);
        if (!recipe)
            return res.status(404).send('No recipes were found with the given id')
        res.json(recipe)
    } catch (error) {
        console.log(error);
        res.status(404).send(error)
    }
}
  
const createRecipeHandler = async (req,res) =>{
    try {
        const {name, summary, healthScore, instructions, diets} = req.body;
        if(!name || !summary)
            return res.status(404).send('Faltan datos')

        const newRecipe = await createRecipe(name, summary,healthScore,instructions,diets);
        
        res.json({...newRecipe.toJSON(), diets})

    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error')
    }
}

module.exports = {getRecipesByNameHandler, getRecipeByIdHandler, createRecipeHandler}