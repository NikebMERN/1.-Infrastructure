//? Importing packages and files
import React from "react";
// import PropTypes from "prop-types";
import AssignedResources from "./AssignedResources";
import styled from 'styled-components';
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

//? Styling
const ProjectDetailsContainer = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ProjectName = styled.h2`
  color: #333;
`;

const Description = styled.p`
  color: #555;
`;

const DetailsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const DetailItem = styled.li`
  margin-bottom: 10px;
`;

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Heading = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-left: 60%;
`;

function ProjectDetails({ projects }) {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <Heading>Project Details</Heading>
      <ProjectDetailsContainer>
      <ProjectName>Name: {projects.name}</ProjectName>
      <Description><b>Description</b>: {projects.description}</Description>
      <DetailsList>
      <DetailItem><b>Status</b>: {projects.status}</DetailItem>
      <DetailItem><b>Priority</b>: {projects.priority}</DetailItem>
      <DetailItem><b>Assigned Resources:</b> <AssignedResources /></DetailItem>
      <DetailItem><b>Budget</b>: ${projects.budget}</DetailItem>
      <DetailItem><b>Timeline</b>: {projects.timeline}</DetailItem>
      </DetailsList>
      <Div>
      <Button onclick={() => navigate(`/update/${projects.id}`)} children={"Updated-Data"} />
      <Button onclick={() => navigate("/dashboard/*")} children={"Return"} />
      </Div>
      </ProjectDetailsContainer>
    </PageContainer>
  );
}

// ProjectDetails.propTypes = {
//   projects: PropTypes.any.isRequired,
// };

export default ProjectDetails;
