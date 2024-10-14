router.post('/process-currentvendors', authenticateToken, upload.fields([
    { name: 'currentvendors', maxCount: 1 },
]), async (req, res) => {
    try {
        const currentvendorsFile = req.files['currentvendors'][0];
        const companyName = req.body.companyName;
        const userId = req.body.userId;
        const role = req.body.role;

        const currentvendorsFormData = new FormData();
        currentvendorsFormData.append('file', currentvendorsFile.buffer, currentvendorsFile.originalname);
        currentvendorsFormData.append('companyName',companyName);
        currentvendorsFormData.append('userId',userId);
        currentvendorsFormData.append('role',role);
    
        console.log("Calling process current vendors micro service");
        const currentvendorsResponse = await axios.post('http://localhost:5211/process-currentvendors',currentvendorsFormData, {
        headers: { 'Authorization': `Bearer ${req.headers['authorization'].split(' ')[1]}` }
    });
    
    console.log("Return from Calling process current vendors micro service");