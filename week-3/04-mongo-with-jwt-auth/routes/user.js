const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course } = require("../db");
const {JWT_SECRET} = require('../config')
// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username
    const password = req.body.password

    await User.create({
        username: username,
        password: password
    })

    res.json({
        msg: "User Created Successfully"
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password

    const user = await User.findOne({
        username: username,
        password: password
    })

    if(user){
        const token = jwt.sign({
            username
        }, JWT_SECRET)
        res.json({
            msg: "User Sign In successful",
            token
        })
    }
    else{
        res.status(411).json({
            msg: "Incorrect email and/or password"
        })
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const courseList = await Course.find({})

    res.json({
        courses: courseList
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    await User.updateOne({
        username: username
    }, {
        "$push": {
            purchases: courseId
        }
    })

    res.json({
        msg: "Purchase Complete"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await findOne({
        username: req.headers.username
    })
    
    const purchasedCourses = await Course.find({
        _id:{
            "$in": user.purchases
        }
    }) 

    res.json({
        courses: purchasedCourses
    })
});

module.exports = router