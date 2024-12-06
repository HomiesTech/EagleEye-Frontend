# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

COPY start.sh /usr/local/bin/start.sh

RUN chmod +x /usr/local/bin/start.sh

RUN npm run build

ENTRYPOINT ["/usr/local/bin/start.sh"]
