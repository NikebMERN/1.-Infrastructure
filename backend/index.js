//* Clearing console directly when new thin is added and requring data hider by dotenv
console.clear();
require('dotenv').config();

//? Importing packages, APIs and error handler
const express = require('express');
const cors = require('cors');
const projectRoutes = require('./routes/projectRoutes');
const errorHandler = require('./utils/errorHandler');

//* Imbeding express to variable named app
const app = express();

//? Middleware
app.use(express.json()); //* Parse JSON request bodies
app.use(cors()); //* Enable CORS

//? Routes
app.use('/projects', projectRoutes);

//? Error handling middleware
app.use(errorHandler);

//? Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

