const { DeleteCommand } = require("@aws-sdk/lib-dynamodb");
const ddbDocClient = require('../utils/dynamodb');

module.exports.handler = async(event) =>{
    const {id} = event.pathParameters;

    const params = {
        TableName: process.env.TASKS_TABLE,
        Key: {id},
    }

    try{
        await ddbDocClient.send(new DeleteCommand(params));

        return{
            statusCode:200, 
            body: JSON.stringify({message: 'Task Deleted'})
        };
    }
    catch(error){
        console.log(error);
        return {
            statusCode:500, 
            body: JSON.stringify({error: 'Error deleting task'})
        };
    }
}