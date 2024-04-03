//? Importing packages and files
import React, { useState } from 'react';
import styled from 'styled-components';
import apiMethods from '../../services/api'; //* Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';

//? Styling
const PageContainer = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  margin-left: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function AddProject() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: '',
    priority: '',
    budget: '',
    timeline: '',
  });
  const [assignedResources, setAssignedResources] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleResourceChange = (index, value) => {
    const updatedResources = [...assignedResources];
    updatedResources[index] = value;
    setAssignedResources(updatedResources);
  };

  const addResourceField = () => {
    setAssignedResources([...assignedResources, '']);
  };

  const removeResourceField = index => {
    const updatedResources = [...assignedResources];
    updatedResources.splice(index, 1);
    setAssignedResources(updatedResources);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      assignedResources,
    };
    //* Call your API to add the project
    try {
      await apiMethods.createProject(submissionData)
      .then((response) =>{
           console.log(response);
        // if (!response.ok) throw new Error(response.statusText);
        // alert('Your Project has been added!');
          alert('Project added successfully!');
          navigate("/dashboard/*");
      })
      //* Reset form or redirect user
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Failed to add project.');
    }
  };

  return (
    <PageContainer>
      <h1>Add New Project</h1>
      <Form onSubmit={handleSubmit}>
        {/* Existing fields */}
        <Input name="name" value={formData.name} onChange={handleChange} placeholder="Project Name" required />
        <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Project Description" required />
        <Input name="status" value={formData.status} onChange={handleChange} placeholder="Status" required />
        <Input name="priority" value={formData.priority} onChange={handleChange} placeholder="Priority" required />
        <Input name="budget" value={formData.budget} onChange={handleChange} placeholder="Budget" type="number" />
        <Input name="timeline" value={formData.timeline} onChange={handleChange} placeholder="Timeline" />

        {/* Assigned Resources Fields */}
        {assignedResources.map((resource, index) => (
          <div key={index}>
            <Input
              value={resource}
              onChange={(e) => handleResourceChange(index, e.target.value)}
              placeholder={`Resource #${index + 1}`}
            />
            <Button type="button" onClick={() => removeResourceField(index)}>Remove</Button>
          </div>
        ))}
        <Button type="button" onClick={addResourceField}>Add Resource</Button>

        <Button type="submit">Add Project</Button>
      </Form>
    </PageContainer>
  );
}

export default AddProject;
