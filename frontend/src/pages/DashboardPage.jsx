//? Importing packages and files
import React, { useState, useEffect } from 'react';
import ProjectList from '../components/dashboard/ProjectList';
// import ProjectDetails from '../components/projectDetails/ProjectDetails';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import apiMethods from '../services/api';
import styled from 'styled-components';

//? Styling
const DashboardContainer = styled.div`
  margin: 20px;
`;

const Navigation = styled.nav`
  margin-bottom: 20px;
`;

const Heading = styled.h1`
  color: #333;
  margin-bottom: 20px;
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

function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const navigator = (path) => {
    navigate(`/project/${path}`);
  }

  useEffect(() => {
    //* Fetch projects from the API when the component mounts
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await apiMethods.getProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  // Use React Router's useRouteMatch hook to get the current URL path
  // const { url } = useRouteMatch();

  return (
    <DashboardContainer>
    <Div>
    <Heading>Dashboard Page ({projects.length})</Heading>
      <NavLink onClick={() => navigate("/add/*")}>Add your project.</NavLink>
      </Div>
      {/* <Routes> */}
        {/* <Route path={`${url}`} element={<p>Select a project from the list</p>} /> */}
        {/* <Route path={`/project/:projectId`} element={ */}
        <Navigation>
        <ProjectList onSelectProject={navigator} />
        </Navigation>
        {/* } /> */}
        {/* <Route path={`${url}/project/:projectId`} element={<ProjectDetails />} /> */}
      {/* </Routes> */}
    </DashboardContainer>
  );
}

export default DashboardPage;
