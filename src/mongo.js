const express = require('express');
const mongoose = require('mongoose');

const User = mongoose.model('User', { name: String });

connect().catch(console.error);

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
        const users = await User.find();
        return res.json({ users });
    } catch (err) {
        console.error(err);
    }
});

app.listen(3000,() => console.log('Server MongoDB started.'));

async function connect() {
    try {
        await mongoose.connect('mongodb://root:example@localhost:27017/test?authSource=admin', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err);
    }
}
