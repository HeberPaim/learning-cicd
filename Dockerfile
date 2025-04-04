FROM node:18
WORKDIR /app

# Copy package files separately to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install
COPY . .

#React uses 3000 by default
EXPOSE 3000

CMD ["npm", "start"]