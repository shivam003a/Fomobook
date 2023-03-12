const express = require('express');
const router = express.Router();
require('../db/conn');
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const authenticate = require('../middleware/authenticate');
const imageModel = require('../models/imageSchema');

router.get("/", (req, res) => {
    return res.status(200).json({ "Response": "Code executed Successfully" });
});

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, cpassword } = req.body;
        if (!name || !email || !password || !cpassword) {
            return res.status(422).json({ err: "please fill all the details" });
        }
        if (password !== cpassword) {
            return res.status(422).json({ err: "password do not match" });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(422).json({ err: "Email already exist" })
        }

        const user = new User({ name, email, password, cpassword });
        await user.save();
        return res.status(201).json({ msg: "user registered successfully" });

    } catch (err) {
        console.log(err);
        return res.status(422).json({ msg: "some error occured" });
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ err: "please fill all the details" })
        }

        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(422).json({ err: "incorrect credentials" });
        }

        const isMatch = await bcrypt.compare(password, userExist.password);
        if (isMatch) {

            const token = await userExist.genAuthToken();
            res.cookie('imageTokens', token, {
                expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                httpOnly: true
            })

            return res.status(201).json({ msg: "logged in successfully" });
        }
        else {
            return res.status(422).json({ err: "incorrect credentials" });
        }

    } catch (err) {
        console.log(err);
        return res.status(422).json({ msg: "some error occured" });
    }
})

router.get('/logout', (req, res) => {
    try {
        res.clearCookie('imageTokens', {
            path: "/"
        });
        return res.status(201).json({ msg: "logged out successfully" });

    } catch (err) {
        console.log(err);
        return res.status(422).json({ msg: "some error occured" });
    }
});

router.post('/upload/submit', authenticate, async (req, res) => {
    try {
        const { url, caption } = req.body;
        const email = req.email;

        if (!url || !caption || !email) {
            return res.status(401).json({ err: "please fill all details" });
        }

        await imageModel.findOneAndUpdate({ email: "imagegallery@mail.com" }, { $push: { imageList: { url, email, caption } } })
        return res.status(201).json({ msg: "uploaded to database" });

    } catch (err) {
        console.log(err);
        return res.status(422).json({ msg: "some error occured" });
    }
});

router.get('/posts', authenticate, async (req, res) => {
    try {
        const x = await imageModel.findOne({ email: "imagegallery@mail.com" });
        return res.status(201).json(x.imageList);

    } catch (err) {
        console.log(err);
        return res.status(422).json({ msg: "some error occured" });
    }
})

router.get('/profile', authenticate, async (req, res) => {
    try {
        const email = req.email;
        const details = await User.findOne({ email });
        const x = await imageModel.findOne({ email: "imagegallery@mail.com" });

        const { name } = details;
        const imageList = x.imageList;
        const filteredList = imageList.filter((e) => {
            return e.email == email;
        })

        res.status(201).json({
            name, email, filteredList
        });

    } catch (err) {
        console.log(err);
        return res.status(422).json({ msg: "some error occurred" });
    }
})

router.get('/profile/:id', authenticate, async (req, res) => {
    try {
        const id = req.params['id'];

        const details = await imageModel.findOne({ _id: "640ac2d10251f99017c8c0e7" });
        const list = details.imageList;

        const query = list.filter((e) => {
            return (
                e._id == id
            )
        })
        return res.status(201).json(query);

    } catch (err) {
        console.log(err);
        return res.status(422).json({ msg: "some error occured" });
    }
})

router.post('/delete', authenticate, async (req, res) => {
    try {
        const { id } = req.body;
        await imageModel.findOneAndUpdate({ email: 'imagegallery@mail.com' }, {
            $pull: { imageList: { _id: id } }
        },
            { new: true }
        );
        res.status(201).json(id);

    } catch (err) {
        console.log(err);
        res.status(422).json({ err: "some error occured" })
    }
})


module.exports = router;