# Use a Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (to leverage Docker cache)
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose a port (if needed)
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
