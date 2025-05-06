# Use the official Node.js image as the base image
FROM node:23.11.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port your application will run on (if applicable)
EXPOSE 3001
ENV HTTP_PORT=3001

# Define the command to run the application
CMD ["node", "dist/index.js"]