const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {} 

Post.init(

    {
        id: {

            type: DataTypes.INTEGER,
            primaryKey: true, 
            allowNull: false, 
            autoIncrement: true

        }, 

        title: {

            type: DataTypes.STRING,
            allowNull: false, 

        },

        content: {

            type: DataTypes.STRING, 

        },

        date_created: {

            type: DataTypes.INTEGER, 
            references: {
                model: 'user',
                key: 'id'
            }

        }
        
    },

    {
        sequelize, 
        timestamps: false,
        freeTableName: true, 
        underscored: true, 
        modelName: 'post'
    }

);

module.exports = Post;