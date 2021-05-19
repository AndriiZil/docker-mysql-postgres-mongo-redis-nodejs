const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');

const sequelize = new Sequelize('mymoney', 'root', 'password', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
});

sequelize.sync({ force: false });

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const app = express();

app.use(express.json());

app.post('/', async (req, res) => {
    try {
        const user = await User.create({ name: req.body.name });
        return res.json({ user });
    } catch (err) {
        console.error(err);
    }
});

app.get('/', async (req, res) => {
    try {
        const user = await User.findAll();
        return res.json({ user });
    } catch (err) {
        console.error(err);
    }
});

app.listen(3000,() => console.log('Server MYSQL started.'));
