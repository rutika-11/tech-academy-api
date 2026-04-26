import express from "express";
import { getCourses, createCourse, enrollCourse } from "../controllers/courseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCourses);
router.post("/", createCourse);
router.post("/:id/enroll", protect, enrollCourse);

export default router;