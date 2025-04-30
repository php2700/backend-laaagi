const CustomizationRequest = require('./models/CustomizationRequest');

const createCustomizationRequest = async (req, res) => {
  console.log('Received request to create customization entry:');
  console.log('Request Body:', req.body);

  try {
    const { firstName, lastName, phoneNumber, message } = req.body;

    if (!firstName || !lastName || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: First Name, Last Name, Phone Number.',
      });
    }

    const newRequest = new CustomizationRequest({
      firstName,
      lastName,
      phoneNumber,
      message,
    });

    const savedRequest = await newRequest.save();

    console.log('Request saved successfully to MongoDB:', savedRequest);

    res.status(201).json({ 
      success: true,
      message: 'Customization request received and saved successfully!',
      data: savedRequest,
    });

  } catch (error) {
    console.error('Error saving customization request:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: `Validation Failed: ${messages.join(', ')}`
      });
    }

    res.status(500).json({ 
      success: false,
      message: 'Failed to save the customization request due to a server error.',
      error: error.message 
    });
  }
};

module.exports = {
  createCustomizationRequest,
};