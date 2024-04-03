//? Importing packages and files
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiMethods from '../../services/api';
import styled from 'styled-components';

//? Styling
const ProjectDetailsContainer = styled.div`
  margin-top: 20px;
`;

const ResourceList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ResourceItem = styled.li`
  margin-bottom: 8px;
  margin-left: 20px;
`;

const ResourceName = styled.span`
  font-weight: bold;
`;

function AssignedResources() {
  const [engineers, setEngineers] = useState([]);
  const [designers, setDesigners] = useState([]);
  const [architects, setArchitects] = useState([]);
  const [assignedResources, setAssignedResources] = useState([]);
  const { projectId } = useParams();

  //* Fetch projects and set to state
  const fetchingByID = async () => {
    try {
      await apiMethods.getProjectById(projectId)
      .then((res) => {
        // console.log("Fetched successfully", res);
        setAssignedResources(res.assigned_resources);
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

  useEffect(() => {
    const delay = async () => {
      const { engineers, designers, architects } = JSON.parse(assignedResources);
      
      //* Delay listing engineers for 1 Micro second
      await delayRendering(1);
      setEngineers(engineers);

      //* Delay listing designers for 2 Micro seconds
      await delayRendering(2);
      setDesigners(designers);

      //* Delay listing architects for 3 Micro seconds
      await delayRendering(3);
      setArchitects(architects);
    };

    delay();
  }, [assignedResources]);

  const delayRendering = (ms) => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  };

  return (
    <ProjectDetailsContainer>
    <ResourceList>
      <h3>Engineers:</h3>
        {engineers.map((engineer) => (
      <ResourceItem>
          <ResourceName key={engineer.role}>{engineer.name} - ROLE({engineer.role})</ResourceName>
      </ResourceItem>
        ))}
      <h3>Designers:</h3>
        {designers.map((designer) => (
      <ResourceItem>
          <ResourceName key={designer.role}>{designer.name} - ROLE({designer.role})</ResourceName>
      </ResourceItem>
        ))}
      <h3>Architects:</h3>
        {architects.map((architect) => (
      <ResourceItem>
          <ResourceName key={architect.role}>{architect.name} - ROLE({architect.role})</ResourceName>
      </ResourceItem>
        ))}
      </ResourceList>
    </ProjectDetailsContainer>
  );
}

export default AssignedResources;
