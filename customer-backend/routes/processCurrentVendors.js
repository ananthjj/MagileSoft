const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');  // Import FormData package for Node.js
const router = express.Router();

// Multer configuration for handling file uploads
const upload = multer();

router.post('/process', upload.fields([
    { name: 'currentvendors', maxCount: 1 },
]), async (req, res) => {
    try {
        // Extracting uploaded file and form data from the request
        const currentvendorsFile = req.files['currentvendors'][0];
        const companyName = req.body.companyName;
        const userId = req.body.userId;
        const role = req.body.role;

        // Create form-data to send to the Flask microservice
        const currentvendorsFormData = new FormData();
        currentvendorsFormData.append('file', currentvendorsFile.buffer, {
            filename: currentvendorsFile.originalname,
            contentType: currentvendorsFile.mimetype,
        });
        currentvendorsFormData.append('companyName', companyName);
        currentvendorsFormData.append('userId', userId);
        currentvendorsFormData.append('role', role);

        console.log("Calling Flask microservice at /process");

        // Send the form data to the Flask API
        const currentvendorsResponse = await axios.post(
            `${process.env.FLASK_API_URL}/process`,  // Adjust this to your Flask URL
            currentvendorsFormData,
            {
                headers: {
                    ...currentvendorsFormData.getHeaders(),  // Important to include form-data headers
                }
            }
        );

        console.log("Return from calling Flask microservice");

        // Return the response back to the client
        res.status(202).json({ message: 'Processing started', data: currentvendorsResponse.data });

    } catch (error) {
        console.error("Error in processing vendors:", error.message);
        res.status(500).json({ error: 'Failed to process vendors', details: error.message });
    }
});

module.exports = router;
