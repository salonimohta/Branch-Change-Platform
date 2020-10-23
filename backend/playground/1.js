// const Sequelize = require('sequelize')

const {Sequelize, Model, DataTypes} = require("sequelize");
// const sequelize = new Sequelize("sqlite::memory:");
const sequelize = new Sequelize('test_database', 'root', 'hello', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        freezeTableName: true
    }
})

const f = async () => {
    sequelize.define({})
}

// module.exports = sequelize


const User = sequelize.define("users", {
    id: {
        type:DataTypes.STRING,
        primaryKey: true
    }

}, {
    timestamps: false
});

(async () => {
    // await sequelize.sync({force: false});
    // const u = await User.create({name: "ashutsoh"})
    const u = await User.findAll()
    console.log(u)
    // Code here
})();