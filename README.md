# Lambda Auth Function

This project is a simple Express.js application built with TypeScript that provides an authentication endpoint. The endpoint checks for the presence of an `accessToken` in the request query string and responds accordingly.

## Project Structure

```
lambda-auth-function
├── src
│   ├── app.ts               # Entry point of the application
│   ├── handlers
│   │   └── auth.ts          # Authentication handler
│   ├── middleware
│   │   └── index.ts         # Middleware functions (if needed)
│   └── types
│       └── index.ts         # Custom types and interfaces
├── package.json              # NPM dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## Setup Instructions

1. **Clone the repository:**

   ```
   git clone <repository-url>
   cd lambda-auth-function
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Compile TypeScript:**

   ```
   npm run build
   ```

4. **Run the application:**
   ```
   npm start
   ```

## AWS Lambda Deployment

This application is configured to work with AWS Lambda using `aws-serverless-express`.

### Using Serverless Framework

1. **Install Serverless Framework globally:**

   ```
   npm install -g serverless
   ```

2. **Install serverless-offline plugin:**

   ```
   npm install --save-dev serverless-offline
   ```

3. **Deploy to AWS:**
   ```
   sls deploy
   ```

### Manual Deployment

1. **Build for Lambda:**

   ```
   npm run build:lambda
   ```

2. **Package for deployment:**

   ```
   npm run package
   ```

3. **Upload `lambda-function.zip` to AWS Lambda console**
   - Handler: `dist/lambda.handler`
   - Runtime: Node.js 18.x

### Testing Lambda Locally

You can test the Lambda function locally using serverless-offline:

```
sls offline
```

## Usage

To use the authentication endpoint, send a GET request to `/auth` with the `accessToken` query parameter.

### Example Request

```
GET /auth?accessToken=your_token_here
```

### Example Responses

- If the `accessToken` exists:

  ```
  HTTP/1.1 200 OK
  {
    "success": true
  }
  ```

- If the `accessToken` does not exist:
  ```
  HTTP/1.1 401 Unauthorized
  {
    "error": "Unauthorized"
  }
  ```

## License

This project is licensed under the MIT License.
