import express from "express";
import {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  getCourseStudentCounts,
  getCourseAverageGrades, // Import the new function
  getCourseRevenue, // Import the new function
} from "../controllers/courseController.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Only instructors and admins can create courses
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["instructor", "admin"]),
  createCourse
);

// All authenticated users can view courses
router.get("/", authMiddleware, getCourses);

// All authenticated users can view a single course
router.get("/:id", authMiddleware, getCourse);

// Only instructors and admins can update courses
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["instructor", "admin"]),
  updateCourse
);

// Only admins can delete courses
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteCourse);

// Add a new route for getting student counts
router.get(
  "/student-counts",
  authMiddleware,
  roleMiddleware(["admin", "instructor"]), // Only admins and instructors can access this
  getCourseStudentCounts
);

// Add a new route for getting average grades for courses
router.get(
  "/average-grades",
  authMiddleware,
  roleMiddleware(["admin", "instructor"]), // Only admins and instructors can access this
  getCourseAverageGrades
);

// Add a new route for getting course revenue
router.get(
  "/course-revenue",
  authMiddleware,
  roleMiddleware(["admin", "instructor"]), // Only admins and instructors can access this
  getCourseRevenue
);

export default router;
