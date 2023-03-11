const mongoose = require('mongoose');

const URL = process.env.URL;
mongoose.connect(URL).then(() => {
    console.log("Database Connection Successfull");
}).catch(err => {
    console.log(err);
})