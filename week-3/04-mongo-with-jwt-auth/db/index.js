const mongoose = require('mongoose');
import * as dotenv from 'dotenv';

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URL);

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
    purchases:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }
    ]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description: String,
    img: String,
    price: Number
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}