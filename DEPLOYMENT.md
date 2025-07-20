# AWS Lambda Deployment Guide

## Prerequisites

- AWS CLI configured with appropriate permissions
- Node.js 18.x or later
- Serverless Framework (optional but recommended)

## Method 1: Using Serverless Framework (Recommended)

1. **Install Serverless Framework:**

   ```bash
   npm install -g serverless
   npm install --save-dev serverless-offline
   ```

2. **Configure AWS credentials:**

   ```bash
   aws configure
   ```

3. **Deploy:**

   ```bash
   sls deploy
   ```

4. **Test locally with Serverless Offline:**
   ```bash
   sls offline
   ```

## Method 2: Manual Deployment

1. **Build and package:**

   ```bash
   npm run build:lambda
   npm run package
   ```

2. **Create Lambda function in AWS Console:**

   - Function name: `lambda-auth-function`
   - Runtime: Node.js 18.x
   - Handler: `dist/lambda.handler`
   - Upload `lambda-function.zip`

3. **Create API Gateway:**
   - Create new REST API
   - Add resource with proxy integration
   - Deploy API

## Testing the Deployed Function

Once deployed, test your Lambda function:

```bash
# With token (should return true)
curl "https://your-api-gateway-url/auth?accessToken=test123"

# Without token (should return 401)
curl "https://your-api-gateway-url/auth"
```

## Environment Configuration

For production, consider adding:

- API rate limiting
- Input validation
- Proper authentication mechanism
- Logging with CloudWatch
- Error handling and monitoring
