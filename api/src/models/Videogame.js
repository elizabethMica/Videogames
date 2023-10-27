const { DataTypes } = require('sequelize'); // Import the DataTypes object from the Sequelize library

// Export a function that defines the model and injects the Sequelize connection.
module.exports = (sequelize) => {
  // Define the 'videogame' model using Sequelize
  sequelize.define('videogame', {
    id:{
     type: DataTypes.UUID,
     primaryKey: true,
     allowNull: false,
     defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.TEXT,
      defaultValue: "https://media.istockphoto.com/id/1303938743/es/foto/blanco-la-mejor-almohadilla-de-juego-flotando-sobre-fondo-blanco-idea-conceptual-m%C3%ADnima.jpg?s=612x612&w=0&k=20&c=_yJ_TOpSKZUu0dN7de7BCq--NFagk9xxRNUfiRVt06g="
    },
    platforms:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull:false
    },
    released:{
      type: DataTypes.STRING,
      allowNull:false
    },
    rating:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdInDb:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: true
    }
  }, {timestamps: false}); // Disable automatic timestamp fields (created_at and updated_at)
};
