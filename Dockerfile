FROM node:22-alpine

WORKDIR /app

# Copy configuration files
COPY package.json package-lock.json* ./

# Install packages
RUN npm install

# Copy application files
COPY . .

# Build Vite frontend
RUN npm run build

# Expose dynamic port
ENV PORT=3000
EXPOSE 3000

# Start Express server via tsx
CMD ["npm", "run", "start"]
