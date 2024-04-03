//? Importing the db main connector/function/middle ware between db and apis
const connection = require("../config/database");

//? Model for interacting with the projects table in the database
const Project = {
  //* Function to fetch all projects from the database
  getAllProjects: (callback) => {
    const query = "SELECT * FROM projects";
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error fetching projects:", error);
        return callback(error, null);
      }
      return callback(null, results);
    });
  },

  //* Function to fetch a project by its ID from the database
  getProjectById: (projectId, callback) => {
    const query = "SELECT * FROM projects WHERE id = ?";
    connection.query(query, [projectId], (error, results) => {
      if (error) {
        console.error("Error fetching project:", error);
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback({ message: "Project not found" }, null);
      }
      return callback(null, results[0]);
    });
  },

  //* Function to create a new project in the database
  createProject: (newProject, callback) => {
    const assignedResourcesArray = Array.isArray(newProject?.assignedResources)
      ? newProject.assignedResources
      : [];

    //* Constructing the object with unlimited engineers, designers, and architects
    const assignedResources = {
      engineers: [],
      designers: [],
      architects: [],
    };

    //* Iterate over the assignedResourcesArray
    assignedResourcesArray?.forEach((resource) => {
      if (resource.startsWith("Engineer")) {
        if (!assignedResources.engineers) {
          assignedResources.engineers = []; //* Initialize as array if not already
        }
        assignedResources.engineers.push({ name: resource, role: "Engineer" });
      } else if (resource.startsWith("Designer")) {
        if (!assignedResources.designers) {
          assignedResources.designers = []; //* Initialize as array if not already
        }
        assignedResources.designers.push({ name: resource, role: "Designer" });
      } else if (resource.startsWith("Architect")) {
        if (!assignedResources.architects) {
          assignedResources.architects = []; //* Initialize as array if not already
        }
        assignedResources.architects.push({
          name: resource,
          role: "Architect",
        });
      }
    });

    const assignedResourcesJSON = JSON.stringify(assignedResources);

    const query =
      "INSERT INTO projects (name, description, status, priority, assigned_resources, budget, timeline) VALUES (?, ?, ?, ?, ?, ?, ?)";
    connection.query(
      query,
      [
        newProject.name,
        newProject.description,
        newProject.status,
        newProject.priority,
        assignedResourcesJSON,
        newProject.budget,
        newProject.timeline,
      ],
      (error, results) => {
        if (error) {
          console.error("Error creating project:", error);
          return callback(error, null);
        }
        return callback(null, results.insertId);
      }
    );
  },

  //* Function to update an existing project in the database
  updateProject: (projectId, updatedProject, callback) => {
    const assignedResourcesArray = Array.isArray(
      updatedProject?.assignedResources
    )
      ? updatedProject.assignedResources
      : [];

    //* Constructing the object with unlimited engineers, designers, and architects
    const assignedResources = {
      engineers: [],
      designers: [],
      architects: [],
    };

    //* Iterate over the assignedResourcesArray
    assignedResourcesArray?.forEach((resource) => {
      if (resource.startsWith("Engineer")) {
        assignedResources.engineers.push([
          { name: resource, role: "Engineer" },
        ]);
      } else if (resource.startsWith("Designer")) {
        assignedResources.designers.push([
          { name: resource, role: "Designer" },
        ]);
      } else if (resource.startsWith("Architect")) {
        assignedResources.architects.push([
          { name: resource, role: "Architect" },
        ]);
      }
    });

    const assignedResourcesJSON = JSON.stringify(assignedResources);

    const query =
      "UPDATE projects SET name = ?, description = ?, status = ?, priority = ?, assigned_resources = ?, budget = ?, timeline = ? WHERE id = ?";
    connection.query(
      query,
      [
        updatedProject.name,
        updatedProject.description,
        updatedProject.status,
        updatedProject.priority,
        assignedResourcesJSON,
        updatedProject.budget,
        updatedProject.timeline,
        projectId,
      ],
      (error, results) => {
        if (error) {
          console.error("Error updating project:", error);
          return callback(error, null);
        }
        return callback(null, results.affectedRows > 0);
      }
    );
  },

  //* Function to delete a project from the database
  deleteProject: (projectId, callback) => {
    const query = "DELETE FROM projects WHERE id = ?";
    connection.query(query, [projectId], (error, results) => {
      if (error) {
        console.error("Error deleting project:", error);
        return callback(error, null);
      }
      return callback(null, results.affectedRows > 0);
    });
  },
};

module.exports = Project;
