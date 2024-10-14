const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('currentvendors', currentVendorsFile);
    formData.append('companyName', companyName);
    formData.append('userId', userId);
    formData.append('role', role);
    try {
    const response = await fetch(`${API_URL}/process-currentvendors`, {
    method: 'POST',
    body: formData,
    headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}` // Add the token for authentication
    }
    });