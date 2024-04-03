//? Importing packages and files
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import AddProjectPage from './pages/AddProjectPage';
import UpdateProjectPage from './pages/UpdateProjectPage';

function App() {
  //* Assigning routes
  return (
    <Router>
      <>
        <Routes>
          <Route path="/dashboard/*" element={<DashboardPage />} />
          <Route path="*" element={<DashboardPage />} />
          <Route path="/update/:projectId" element={<UpdateProjectPage />} />
          <Route path="/add/*" element={<AddProjectPage />} />
          <Route path="/project/:projectId" element={<ProjectDetailsPage />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
