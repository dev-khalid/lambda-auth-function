# Build stage
FROM public.ecr.aws/lambda/nodejs:22 AS base

FROM base AS builder

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
FROM base AS production

WORKDIR ${LAMBDA_TASK_ROOT}

# Copy package files first and install production dependencies
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copy built artifacts from builder stage
COPY --from=builder /usr/src/app/dist/ ./

# Set the CMD to your handler
CMD [ "index.handler" ]