//? Importing packages and files
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import apiMethods from "../../services/api";
import styled from "styled-components";
import Button from "../common/Button";

//? Styling
const ProjectListContainer = styled.div`
  padding: 20px;
`;

const ProjectItem = styled.div`
border: 1px solid #ccc;
border-radius: 5px;
  margin: 10px 0;
  padding: 10px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ProjectTitle = styled.h2`
  margin: 0 0 10px 0;
  color: #333;
`;

const NavLink = styled.p`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Continent = styled.div`
  height: 25px;
  margin-top: 9%;
  `;

function ProjectList({ onSelectProject }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    //* Fetch projects from the API when the component mounts
    const fetchProjects = async () => {
      try {
        await apiMethods?.getProjects()
        .then((response) => {
            setProjects(response);
            // console.log(response);
        })
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    try {
        await apiMethods?.deleteProject(id)
        .then((res) => {
            console.log(res);
            window.location.reload();
            alert("This project is moved to completed.");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <ProjectListContainer>
        {projects?.map((project) => (
          <ProjectItem key={project.id}>
      <Div>
            <ProjectTitle onClick={() => onSelectProject(project.id)}>
              <NavLink>
                {project.id}. {project.name}
              </NavLink>
            <p>{project?.description}</p>
            </ProjectTitle>
        <Continent>
        <Button onclick={() => handleDelete(project.id)} children={"Completed"} />
        </Continent>
      </Div>
          </ProjectItem>
        ))}
    </ProjectListContainer>
  );
}

ProjectList.propTypes = {
  onSelectProject: PropTypes.func.isRequired,
};

export default ProjectList;
