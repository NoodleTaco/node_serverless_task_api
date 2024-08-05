const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const ddbDocClient = require('../utils/dynamodb');
const { v4: uuidv4 } = require('uuid');

module.exports.handler = async(event) => {
  const data = JSON.parse(event.body);
  const timestamp = new Date().getTime();
  const id = uuidv4();

  const params = {
    TableName: process.env.TASKS_TABLE,
    Item: {
      id: id,
      title: data.title,
      description: data.description,
      status: data.status || 'TODO',
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  try {
    await ddbDocClient.send(new PutCommand(params));
    return {
      statusCode: 201,
      body: JSON.stringify(params.Item),
    };
  } 
  catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error in Creating Task' }),
    };
  }
};