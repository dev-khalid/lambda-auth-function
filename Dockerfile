FROM public.ecr.aws/lambda/nodejs:22

# Copy package files
COPY package*.json ${LAMBDA_TASK_ROOT}/

COPY src/ .
# Install dependencies
RUN npm ci --only=production

RUN npm run build

# Copy built application
COPY dist/ ${LAMBDA_TASK_ROOT}/

# Set the CMD to your handler
CMD [ "index.handler" ]