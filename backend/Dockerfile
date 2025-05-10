# Use the official Node.js image as the base image
FROM node:23.11.0 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

FROM node:23.11.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built application from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json .
COPY --from=build /app/package-lock.json .

# Install only production dependencies
RUN npm install --omit=dev

# Expose the port your application will run on (if applicable)
EXPOSE 3001
ENV HTTP_PORT=3001

# Define the command to run the application
CMD ["node", "dist/index.js"]