const { Router } = require('express');
const {getRecipesByNameHandler, getRecipeByIdHandler, createRecipeHandler} = require ('../handlers/recipesHandlers.js')

const router = Router();

router.get('/', getRecipesByNameHandler)
router.get('/:idReceta', getRecipeByIdHandler)
router.post('/', createRecipeHandler)

module.exports = router;
