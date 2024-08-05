# Serverless Task Management API

This project implements a serverless task management API using AWS Lambda, API Gateway, and DynamoDB. 

## Technologies Used

- Node.js
- AWS Lambda
- Amazon API Gateway
- Amazon DynamoDB
- Serverless Framework
- AWS CloudWatch

## Architecture Overview

This application uses a serverless architecture:

1. API Gateway receives HTTP requests and routes them to the appropriate Lambda function.
2. Lambda functions process the requests, interacting with DynamoDB as needed.
3. DynamoDB stores the task data.
4. CloudWatch is used for monitoring and logging.

## API Endpoints

This API provides the following endpoints for task management:

- `POST /tasks`: Create a new task
  - Body: `{ "title": "Task title", "description": "Task description", "status": "TODO" }`

- `GET /tasks/{id}`: Retrieve a specific task
  - Path parameter: `id` (task ID)

- `GET /tasks`: List all tasks

- `PUT /tasks/{id}`: Update a specific task
  - Path parameter: `id` (task ID)
  - Body: `{ "title": "Updated title", "description": "Updated description", "status": "IN_PROGRESS" }`

- `DELETE /tasks/{id}`: Delete a specific task
  - Path parameter: `id` (task ID)
