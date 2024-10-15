const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');  // Import FormData package for Node.js
const router = express.Router();

// Multer configuration for handling file uploads
const upload = multer();

router.post('/process-currentvendors', upload.fields([
    { name: 'currentvendors', maxCount: 1 },
]), async (req, res) => {
    try {
        const currentvendorsFile = req.files['currentvendors'][0];
        const companyName = req.body.companyName;
        const userId = req.body.userId;
        const role = req.body.role;

        // Create form-data using the 'form-data' package for Node.js
        const currentvendorsFormData = new FormData();
        currentvendorsFormData.append('file', currentvendorsFile.buffer, {
            filename: currentvendorsFile.originalname,
            contentType: currentvendorsFile.mimetype,
        });
        currentvendorsFormData.append('companyName', companyName);
        currentvendorsFormData.append('userId', userId);
        currentvendorsFormData.append('role', role);

        console.log("Calling process current vendors microservice");

        // Axios request to send form data
        const currentvendorsResponse = await axios.post(
            'http://localhost:5211/process-currentvendors',
            currentvendorsFormData,
            {
                headers: {
                    ...currentvendorsFormData.getHeaders(),  // Important for sending multipart/form-data
                }
            }
        );

        console.log("Return from calling process current vendors microservice");

        // Send response back to client
        res.status(202).json({ message: 'Processing started', data: currentvendorsResponse.data });

    } catch (error) {
        console.error("Error in processing current vendors:", error);
        res.status(500).json({ error: 'Failed to process current vendors' });
    }
});
