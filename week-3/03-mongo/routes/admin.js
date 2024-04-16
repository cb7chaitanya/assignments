const express = require("express");
const { Admin, Course } = require("../db");
const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();

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
        message: 'Admin created successfully'
    })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const img = req.body.img;
    const price = req.body.price;

    const NewCourse = await Course.create({
        title: title,
        description: description,
        img: img,
        price: price
    })

    res.json({
        msg: "Course Created Successfully", courseId: NewCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courseList = await Course.find({});

    res.json({
        courses: courseList
    })
});

module.exports = router;