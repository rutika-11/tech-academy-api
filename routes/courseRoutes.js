import express from "express";
import { getCourses, createCourse, enrollCourse } from "../controllers/courseController.js";
import { verifyToken } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/", getCourses);
router.post("/", createCourse);
router.post("/:id/enroll", verifyToken, enrollCourse);

export default router;