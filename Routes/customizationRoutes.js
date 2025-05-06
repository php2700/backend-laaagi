const express = require('express');
const { createCustomizationRequest } = require('./controllers/customizationController'); // Import the controller function

const router = express.Router(); // Create an Express router instance

router.post('/customization-requests', createCustomizationRequest);


 export default router;