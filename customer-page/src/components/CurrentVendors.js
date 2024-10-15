const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission

    // Create FormData object to hold form input data
    const formData = new FormData();
    formData.append('currentvendors', currentVendorsFile);  // Append file
    formData.append('companyName', companyName);  // Append companyName
    formData.append('userId', userId);  // Append userId
    formData.append('role', role);  // Append role

    try {
        // Make the POST request to the backend
        const response = await fetch(`${API_URL}/process-currentvendors`, {
            method: 'POST',
            body: formData
        });

        // Check if the response is ok (HTTP status code 200-299)
        if (response.ok) {
            const result = await response.json();
            console.log('Success:', result);
            // Handle the success case (e.g., display a message to the user)
        } else {
            console.error('Error:', response.statusText);
            // Handle server errors
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle network or other errors
    }
};
