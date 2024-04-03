//? Importing packages and files
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectDetails from '../components/projectDetails/ProjectDetails';
import apiMethods from '../services/api';
import styled from 'styled-components';

//? Styling
const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

function ProjectDetailsPage() {
  const [project, setProject] = useState([]);
  const { projectId } = useParams();

  //* Fetch projects and set to state
  const fetchingByID = async () => {
    try {
      await apiMethods.getProjectById(projectId)
      .then((res) => {
        // console.log("Fetched successfully", res);
        setProject(res);
      }).catch((err) => {
        console.log(err);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchingByID();
  }, []);

  return (
    <PageContainer>
      <ProjectDetails projects={project} />
    </PageContainer>
  );
}

export default ProjectDetailsPage;
