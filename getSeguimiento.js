const aws = require('aws-sdk');

let awsConfig = {
    "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": "AKIA3DIUBMJLDJIKQ7FE", "secretAccessKey": "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"
}
aws.config.update(awsConfig)
let docClient = new aws.DynamoDB.DocumentClient()

exports.handler = (event, context, callback) => {
    console.log(event)
    console.log(event['pathParameters']['mascotaId'])
    let mascota_id = event['pathParameters']['mascotaId']
    let params = {
        TableName: "Seguimiento",
        FilterExpression: "mascota_id = :i",
        ExpressionAttributeValues:{
            ':i': Number(mascota_id)
        }
    }
    
    docClient.scan(params, function(err, data) {
        if(err) {
            callback({
                success: false,
                message: err
            })
        } else {
            callback(null, {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify(data.Items[0]),
            })
            
        }
    })
}