import { DataTypes } from "sequelize";
const {sequelize}=require("../db-connection")

export const User= sequelize.define("user",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    },
    contact:{
        type: DataTypes.STRING,
        unique: true
    },

},{timestamps:false})

