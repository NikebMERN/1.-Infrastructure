//? Importing package, controllers and middle ware
const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
// const authenticateUser = require("../middleware/authMiddleware");

//* Middleware for authenticating user requests
//* Not neccessary currently
// router.use(authenticateUser);

//* Routes for managing projects
router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);
router.post("/", projectController.createProject);
router.put("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

module.exports = router;
