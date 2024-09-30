const axios = require('axios');
const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');

// Cloudflare and Google Cloud Config
const apiToken = 'TqKUrDnKXENla11xCbjOJaxrKkZQYE36WHyOAlYA';
const zoneId = '5c2ef49b5d162f9e7aa88783a8e201de';
const storage = new Storage();
const bucketName = 'your-google-cloud-bucket'; // Replace with your actual bucket name

// Function to create a subdomain via Cloudflare
const createSubdomain = async (subdomain) => {
  try {
    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`,
      {
        type: 'CNAME',
        name: `${subdomain}`,
        content: 'ananthjj.com', // Adjust to your domain
        ttl: 3600,
        proxied: true
      },
      {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(`Subdomain ${subdomain}.ananthjj.com created successfully.`);
  } catch (error) {
    console.error('Error creating subdomain:', error.response ? error.response.data : error.message);
  }
};

// Function to create a Google Cloud Storage bucket
const createBucket = async (bucketName) => {
  try {
    // Check if bucket already exists
    const [buckets] = await storage.getBuckets();
    const bucketExists = buckets.some(bucket => bucket.name === bucketName);
    
    if (bucketExists) {
      console.log(`Bucket ${bucketName} already exists.`);
    } else {
      // Create a new bucket if it doesn't exist
      await storage.createBucket(bucketName, {
        location: 'US', // Specify region
        storageClass: 'STANDARD', // Set the storage class
      });
      console.log(`Bucket ${bucketName} created successfully.`);
    }
  } catch (err) {
    console.error('Error creating bucket:', err);
  }
};

// Function to replace the placeholder in the HTML template with the carrier name
const generateCarrierPage = (carrierName) => {
  const templatePath = path.join(__dirname, 'templates', 'carrier-template.html');
  const outputFilePath = path.join(__dirname, '..', 'carrier-pages', `${carrierName}-index.html`);

  // Read the HTML template
  let htmlContent = fs.readFileSync(templatePath, 'utf8');

  // Replace the placeholder with the carrier name
  htmlContent = htmlContent.replace(/{{carrierName}}/g, `${carrierName} Carrier Portal`);

  // Write the modified content to a new file
  fs.writeFileSync(outputFilePath, htmlContent);

  return outputFilePath; // Return the path to the newly generated file
};

// Function to upload the generated HTML content to Google Cloud Storage
const uploadCarrierPage = async (bucketName, filePath) => {
  const destination = `index.html`; // The file will be saved as index.html in the bucket

  try {
    await storage.bucket(bucketName).upload(filePath, {
      destination: destination,
      metadata: {
        cacheControl: 'no-cache',
      },
    });
    console.log(`Carrier-specific page uploaded to bucket ${bucketName}.`);
  } catch (err) {
    console.error('Error uploading file:', err);
  }
};

// Main function to onboard a new carrier
const onboardCarrier = async (subdomain, carrierName) => {
  const bucketName = `${subdomain}-carrier-bucket`; // Create a unique bucket name

  // Step 1: Create the Google Cloud Storage bucket
  await createBucket(bucketName);

  // Step 2: Generate the carrier-specific HTML page
  const generatedFilePath = generateCarrierPage(carrierName);

  // Step 3: Upload the HTML page to the new bucket
  await uploadCarrierPage(bucketName, generatedFilePath);

  // Step 4: Create the subdomain via Cloudflare
  await createSubdomain(subdomain);
};

// Example: Create subdomain, bucket, and upload content for Nationwide
const subdomain = 'allstate';
const carrierName = 'Allstate';

onboardCarrier(subdomain, carrierName);