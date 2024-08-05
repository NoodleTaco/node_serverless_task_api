const { GetCommand } = require("@aws-sdk/lib-dynamodb");
const ddbDocClient = require('../utils/dynamodb');

module.exports.handler = async(event) => {
    const {id} = event.pathParameters;

    const params = {
        TableName: process.env.TASKS_TABLE,
        Key: {id}
    }

    try {
        const {Item} = await ddbDocClient.send(new GetCommand (params));

        if(Item){
            return {
                statusCode: 200, 
                body: JSON.stringify(Item)
            };
        }
        else{
            return {
                statusCode: 404, 
                body: JSON.stringify({error: "Task not found"})
            };
        }
    }
    catch(error){
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({error: "Error Retrieving Task"})
        };
    }
}