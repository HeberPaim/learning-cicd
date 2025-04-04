FROM node:18

RUN useradd -m appuser
USER appuser

WORKDIR /app

# Copy package files separately to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install
COPY . .

HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD curl -f http://localhost/health || exit 1

#React uses 3000 by default
EXPOSE 3000

CMD ["npm", "start"]