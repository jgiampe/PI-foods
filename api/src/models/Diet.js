const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('diet', {
        //ID se genera automaticamente
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
        },
    },
    {timestamps: false})
}