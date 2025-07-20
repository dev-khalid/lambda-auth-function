# Build stage
FROM public.ecr.aws/lambda/nodejs:22 AS builder

WORKDIR /usr/src/app

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY src/ ./src
COPY tsconfig.json ./

# Build the application
RUN npm run build:lambda

# Production stage
FROM public.ecr.aws/lambda/nodejs:22

WORKDIR ${LAMBDA_TASK_ROOT}

# Copy package files first and install production dependencies
COPY --from=builder /usr/src/app/package*.json ./
RUN npm ci --omit=dev

# Copy built artifacts from builder stage
COPY --from=builder /usr/src/app/dist/ ./

# Set the CMD to your handler
CMD [ "index.handler" ]