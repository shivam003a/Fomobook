const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: "String",
        required: true
    },
    email: {
        type: "String",
        required: true
    },
    password: {
        type: "String",
        required: true
    },
    cpassword: {
        type: "String",
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

// middleware to hash the passwords before saving to database
userSchema.pre("save", async function (next) {
    console.log("caleed")
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
        this.cpassword = await bcrypt.hash(this.cpassword, 10);
    }
    next();
})

// instance method to create JWT authentication
userSchema.methods.genAuthToken = async function () {
    try {

        const token = jwt.sign({ email: this.email }, process.env.KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;

    } catch (err) {
        console.log(err);
    }
}


const User = mongoose.model("user", userSchema);

module.exports = User;