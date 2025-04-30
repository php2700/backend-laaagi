const express = require('express');
const { createCustomizationRequest } = require('./controllers/customizationController'); // Import the controller function

const router = express.Router(); 

router.post('/customization-requests', createCustomizationRequest);


module.exports = router; 