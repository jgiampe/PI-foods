const {Diet} = require('../db.js')

const getDiets = async (req, res) => {
    try {
        const diets = await Diet.findAll();
        res.json(diets.map(el=>el.name));
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error')
    }
}

module.exports = {getDiets}