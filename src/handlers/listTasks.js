const { ScanCommand } = require("@aws-sdk/lib-dynamodb");
const ddbDocClient = require('../utils/dynamodb');

module.exports.handler = async(event) => {
    const params = {
        TableName: process.env.TASKS_TABLE,
    }

    try{
        const {Items} = await ddbDocClient.send(new ScanCommand(params));

        return {
            statusCode: 200,
            body: JSON.stringify(Items)
        };
    }

    catch(error){
        console.log(error)
        return {
            statusCode: 500, 
            body: JSON.stringify({error: 'Error Retrieving tasks'})
        };
    }
}