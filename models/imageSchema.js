const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    imageList : [
        {
            email : {
                type : "String",
                required : true
            },
            url : {
                type : "String",
                required : true
            },
            caption : {
                type : "String",
                required : true
            }
        }
    ]
})

const imageModel = mongoose.model("imageModel", imageSchema);

module.exports = imageModel;