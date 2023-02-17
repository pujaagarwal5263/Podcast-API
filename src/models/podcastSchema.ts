import { DataTypes } from "sequelize";
const {sequelize}=require("../db-connection")

export const Podcast= sequelize.define("podcast",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    podcast_id:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    podcast_name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    channel_id:{
        type: DataTypes.STRING,
    },

},{timestamps:false})

