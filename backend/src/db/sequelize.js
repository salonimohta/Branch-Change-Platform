const Sequelize = require('sequelize')

const sequelize = new Sequelize('test_database', 'root', 'hello',{
    host:'localhost',
    dialect: 'mysql',
    define:{
        freezeTableName:true
    }
})

module.exports = sequelize
