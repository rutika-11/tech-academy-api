import Course from "../models/Course.js";

// Get all courses
export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Create course
export const createCourse = async (req, res) => {
    try {
        const { title, description } = req.body;

        const course = await Course.create({ title, description });

        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Enroll in course
export const enrollCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        if (course.students.includes(req.user.id)) {
            return res.status(400).json({ message: "Already enrolled" });
        }

        // Add user
        course.students.push(req.user.id);

        await course.save();

        res.json({ message: "Enrolled successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};