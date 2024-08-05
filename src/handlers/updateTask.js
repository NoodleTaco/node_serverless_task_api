const { UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const ddbDocClient = require('../utils/dynamodb');

module.exports.handler = async(event) => {
    const {id} = even.pathParameters;
    const {title, description, status} = Json.parse (event.body);
    const timestamp = new Date().getTime();

    const params = {
        TableName: process.env.TASKS_TABLE,
        Key: { id },
        ExpressionAttributeNames: {
          '#task_status': 'status',
        },
        ExpressionAttributeValues: {
          ':title': title,
          ':description': description,
          ':status': status,
          ':updatedAt': timestamp,
        },
        UpdateExpression: 'SET title = :title, description = :description, #task_status = :status, updatedAt = :updatedAt',
        ReturnValues: 'ALL_NEW',
    };

    try {
        const { Attributes } = await ddbDocClient.send(new UpdateCommand(params));
        
        return {
          statusCode: 200,
          body: JSON.stringify(Attributes),
        };
      } catch (error) {
        console.log(error);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Could not update the task' }),
        };
      }
}