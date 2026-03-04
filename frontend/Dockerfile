FROM node:20-alpine

WORKDIR /app

# Copy only package files first
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 3001

ENV PORT=3001
ENV NODE_ENV=production

# Start
CMD ["npm", "start"]
