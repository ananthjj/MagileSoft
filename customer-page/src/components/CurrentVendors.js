import React, { useState } from 'react';
import './CurrentVendors.css'; // Import the CSS for styles

function CurrentVendors() {
  // State variables for form fields and file input
  const [currentVendorsFile, setCurrentVendorsFile] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('');

  const handleFileChange = (e) => {
    setCurrentVendorsFile(e.target.files[0]);  // Store the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission

    // Create FormData object to hold form input data
    const formData = new FormData();
    formData.append('currentvendors', currentVendorsFile);  // Append the file
    formData.append('companyName', companyName);  // Append the company name
    formData.append('userId', userId);  // Append the user ID
    formData.append('role', role);  // Append the role

    try {
      // Make the POST request to the backend
      const response = await fetch(`${process.env.REACT_APP_API_URL}/process`, {
        method: 'POST',
        body: formData
      });

      // Check if the response is ok (HTTP status code 200-299)
      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        // Handle success (display success message or update the UI)
      } else {
        console.error('Error:', response.statusText);
        // Handle server errors
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle network or other errors
    }
  };

  return (
    <form onSubmit={handleSubmit} className="current-vendors-form">
      <div className="form-group">
        <label>Company Name:</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>User ID:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Role:</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Upload Current Vendors File:</label>
        <input type="file" onChange={handleFileChange} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CurrentVendors;
