const { Router } = require('express');
const {getRecipes, getRecipeById, createRecipe} = require ('../handlers/recipesHandlers.js')

const router = Router();

router.get('/', getRecipes)
router.get('/:idReceta', getRecipeById)
router.post('/', createRecipe)

module.exports = router;
