const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const httpMethod = event.httpMethod;
    const queryParams = event.queryStringParameters;
    const body = JSON.parse(event.body);
    
    switch (httpMethod) {
        case 'GET':
    try {
        const params = {
            TableName: 'Employees',
            Key: {
                id: queryParams.id 
            }
        };
        
        const result = await dynamoDB.get(params).promise();
        
        return {
            statusCode: 200,
            body: JSON.stringify(result.Item)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' })
        };
    }


            
        case 'POST':
    try {
        const params = {
            TableName: 'Employees',
            Item: {
                id: body.id, 
                name: "Sebastian",
                age: 22,
                salary: 5000,
            }
        };
        
        await dynamoDB.put(params).promise();
        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Item added successfully' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' })
        };
    }

            
        case 'PUT':
    try {
        const params = {
            TableName: 'Employees',
            Key: {
                id: body.id 
            },
            UpdateExpression: 'SET #field1 = :Marek, #field2 = :25',
            ExpressionAttributeNames: {
                '#field1': 'name',
                '#field2': 'age'
            },
            ExpressionAttributeValues: {
                ':Marek': body.name,
                ':25': body.age
            },
            ReturnValues: 'UPDATED_NEW'
        };
        
        const result = await dynamoDB.update(params).promise();
        
        return {
            statusCode: 200,
            body: JSON.stringify(result.Attributes)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' })
        };
    }
            
        case 'DELETE':
    try {
        const params = {
            TableName: 'Employees',
            Key: {
                id: queryParams.id
            }
        };
        
        await dynamoDB.delete(params).promise();
        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Item deleted successfully' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' })
        };
    }

            
        default:
            return {
                statusCode: 405,
                body: JSON.stringify({ message: 'Method Not Allowed' })
            };
    }
};
