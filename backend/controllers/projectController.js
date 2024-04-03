//? Importing base models from projectModels in models
const Project = require("../models/projectModel");

//? Controller functions for managing projects
const projectController = {
  //* Get all projects
  getAllProjects: (req, res) => {
    Project.getAllProjects((error, projects) => {
      if (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(200).json(projects);
    });
  },

  //* Get project by ID
  getProjectById: (req, res) => {
    const projectId = req.params.id;
    Project.getProjectById(projectId, (error, project) => {
      if (error) {
        if (error.message === "Project not found") {
          return res.status(404).json({ error: "Project not found" });
        }
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(200).json(project);
    });
  },

  //* Create new project
  createProject: (req, res) => {
    const newProject = req.body;
    Project.createProject(newProject, (error, projectId) => {
      if (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res
        .status(201)
        .json({ message: "Project created successfully", projectId });
    });
  },

  //* Update project by ID
  updateProject: (req, res) => {
    const projectId = req.params.id;
    const updatedProject = req.body;
    Project.updateProject(projectId, updatedProject, (error, success) => {
      if (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (!success) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.status(200).json({ message: "Project updated successfully" });
    });
  },

  //* Delete project by ID
  deleteProject: (req, res) => {
    const projectId = req.params.id;
    Project.deleteProject(projectId, (error, success) => {
      if (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (!success) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.status(200).json({ message: "Project deleted successfully" });
    });
  },
};

module.exports = projectController;
