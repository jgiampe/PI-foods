const {createRecipe, getRecipeById, getRecipesByName, getAllRecipes} = require ('../controllers/recipesControllers.js')




const getRecipesByNameHandler = async (req, res) => {
    const {name} = req.query;
    let recipes;
    
    try {
        if(!name)
            recipes = await getAllRecipes()
        else
            recipes = await getRecipesByName(name)

        if (recipes.length)
            res.json(recipes);
        else 
            res.json([])
    
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
        // console.log(recipe)
        res.json(recipe)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}
  
const createRecipeHandler = async (req,res) =>{
    try {
        
        const {title='', summary='', healthScore=0, image='', instructions='', diets} = req.body;
        if(!title || !summary)
            return res.status(404).send('Faltan datos')

        const newRecipe = await createRecipe(title, summary, healthScore, image, instructions, diets);
        
        res.json({...newRecipe.toJSON(), diets})

    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error')
    }
}

module.exports = {getRecipesByNameHandler, getRecipeByIdHandler, createRecipeHandler}