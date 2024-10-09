# Use Node.js base image
FROM node:18

# Create and set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose the port the app runs on
EXPOSE 5002

# Command to start the app
CMD ["npm", "start"]
