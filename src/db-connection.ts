const { Sequelize } = require('sequelize');
export const sequelize = new Sequelize("postgres://postgres:postgres@localhost:5432/podcast");


   const connection = async() =>{
    try { 
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }

  connection();