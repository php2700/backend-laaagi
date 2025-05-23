const DesignRequest = require('./models/DesignRequest');

exports.submitDesign = async (req, res) => {
    try {
        const { name, email, phone, quantity, notes } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Design file is required.' });
        }

        const designRequest = new DesignRequest({
            name,
            email,
            phone,
            quantity,
            notes,
            designFilePath: req.file.path,
        });

        await designRequest.save();
        res.status(200).json({ message: 'Design request submitted successfully!' });
    } catch (error) {
        console.error('Submission error:', error);
        res.status(500).json({ message: 'Something went wrong.' });
    }
};
