# Lambda Auth Function

A simple Express.js application that handles authentication via access token, designed to run both locally and as an AWS Lambda function.

## Overview

This project provides a lightweight authentication service that validates access tokens via query parameters. It's built with TypeScript and Express.js, and can be deployed as an AWS Lambda function using serverless architecture.

## Features

- **Token-based Authentication**: Validates access tokens passed as query parameters
- **Dual Deployment**: Can run as a local Express server or AWS Lambda function
- **Docker Support**: Includes multi-stage Dockerfile for containerized deployments
- **TypeScript**: Fully typed with comprehensive type safety
- **Error Handling**: Built-in error handling and 404 routes
- **Testing**: Simple test script included

## Project Structure

```
├── src/
│   ├── app.ts              # Main Express application
│   ├── index.ts            # Lambda handler wrapper
│   ├── handlers/
│   │   └── auth.ts         # Authentication handler
│   └── middleware/
│       └── index.ts        # Middleware functions
├── test.js                 # Test script
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
├── Dockerfile             # Multi-stage Docker build
└── README.md              # This file
```

## API Endpoints

### `GET /auth`

Validates an access token passed as a query parameter.

**Parameters:**
- `accessToken` (query parameter, optional): The access token to validate

**Responses:**
- `200 OK`: Returns `true` if access token is provided
- `401 Unauthorized`: Returns `{ "error": "Unauthorized" }` if no access token

**Examples:**
```bash
# With access token
curl "http://localhost:3000/auth?accessToken=test123"
# Response: true (Status: 200)

# Without access token  
curl "http://localhost:3000/auth"
# Response: {"error":"Unauthorized"} (Status: 401)
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lambda-auth-function
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Usage

### Local Development

1. **Start development server**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:3000` with hot reloading.

2. **Start production server**
   ```bash
   npm run build
   npm start
   ```

3. **Run tests**
   ```bash
   npm test
   ```
   This runs the test script in [test.js](test.js) that validates both authenticated and unauthenticated requests.

### AWS Lambda Deployment

1. **Build for Lambda**
   ```bash
   npm run build:lambda
   ```

2. **Deploy to AWS Lambda**
   - Set the handler to `index.handler`
   - Configure API Gateway to route requests to your Lambda function

### Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t lambda-auth-function .
   ```

2. **Run locally**
   ```bash
   docker run -p 9000:8080 lambda-auth-function
   ```

3. **Test with Lambda Runtime Interface Emulator**
   ```bash
   curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{}'
   ```

## Configuration

### Environment Variables

- `PORT`: Port number for local server (default: 3000)

### TypeScript Configuration

The project uses TypeScript with the following key settings in [tsconfig.json](tsconfig.json):
- Target: ES6
- Module: CommonJS
- Strict mode enabled
- Output directory: `./dist`

## Architecture

### Components

1. **[`app`](src/app.ts)**: Main Express application with route definitions and middleware
2. **[`handler`](src/index.ts)**: Lambda wrapper using serverless-http
3. **[`authHandler`](src/handlers/auth.ts)**: Authentication logic for token validation
4. **[`checkAccessToken`](src/middleware/index.ts)**: Middleware for token validation (alternative implementation)

### Flow

1. Request comes in via Express (local) or API Gateway (Lambda)
2. [`authHandler`](src/handlers/auth.ts) processes the request
3. Validates `accessToken` query parameter
4. Returns appropriate response (200 with `true` or 401 with error)

## Scripts

- `npm run dev`: Start development server with hot reloading
- `npm run build`: Compile TypeScript to JavaScript
- `npm run build:lambda`: Build and prepare for Lambda deployment
- `npm run package`: Create deployment package for Lambda
- `npm start`: Start production server
- `npm test`: Run test suite

## Dependencies

### Production
- **express**: Web framework
- **serverless-http**: Lambda integration
- **@types/aws-lambda**: AWS Lambda type definitions

### Development
- **typescript**: TypeScript compiler
- **ts-node-dev**: Development server with hot reloading
- **@types/express**: Express type definitions

## Testing

The project includes a simple test script ([test.js](test.js)) that validates:
- Successful authentication with access token
- Failed authentication without access token

Run tests with:
```bash
npm test
```

## Docker

The [Dockerfile](Dockerfile) uses a multi-stage build:
1. **Builder stage**: Installs dependencies and builds the application
2. **Production stage**: Creates optimized runtime image with only production dependencies

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests to ensure everything works
5. Submit a pull request

## License

ISC