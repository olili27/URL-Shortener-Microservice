const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async () => {
    try {
        mongoose.connect(process.env.DB,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;