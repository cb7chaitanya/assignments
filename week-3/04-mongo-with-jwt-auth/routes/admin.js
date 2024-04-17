const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");
const { JWT_SECRET } = require("../config");

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic 
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username: username,
        password: password
    })

    res.json({
        msg: "Admin Created Successfully"
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const admin = await Admin.findOne({
        username: username,
        password: password
    })
    if(admin){
        const token = jwt.sign({
            username
        }, JWT_SECRET); 
        res.json({
            msg: "Signin Successful",
            token: token
        })
    }
    else{
        res.status(411).json({
            msg: "Incorrect Email and/or password"
        })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title
    const description = req.body.description
    const img = req.body.img;
    const price = req.body.price

    const newCourse = await Course.create({
        title,
        description,
        img,
        price
    })

    res.json({
        msg: "Course created successfully", courseId: newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courseList = await Course.find({})

    res.json({
        courses: courseList
    })
});

module.exports = router;