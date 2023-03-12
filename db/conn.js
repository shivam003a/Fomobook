const mongoose = require('mongoose');

const URL = process.env.URL;

const connection = async () => {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("connection successful");

    } catch (err) {
        console.log(err);
        console.log('error connecting server');
    }
}

connection();