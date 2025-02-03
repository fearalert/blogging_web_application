FROM node:22

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code to the working directory
COPY . .

# Expose the port the application runs on
EXPOSE 4000

# Start the application
CMD ["npm", "run", "dev:watch"]
