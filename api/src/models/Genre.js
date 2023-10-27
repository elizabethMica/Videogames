const { DataTypes } = require('sequelize'); // Import the DataTypes object from the Sequelize library

module.exports=(sequelize)=>{
    // Define the 'genre' model using Sequelize
    sequelize.define('genre',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false
        }
    },{timestamps: false}) // Disable automatic timestamp fields (created_at and updated_at)
};