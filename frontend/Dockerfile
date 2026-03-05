FROM node:20-alpine AS base

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies for build (including devDependencies like TypeScript)
RUN npm ci

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production image
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built application from builder
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static
COPY --from=base /app/public ./public

# Expose port
EXPOSE 3001

ENV PORT=3001
ENV NODE_ENV=production

# Start
CMD ["node", "server.js"]
