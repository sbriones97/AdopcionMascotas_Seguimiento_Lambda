const aws = require('aws-sdk');
let awsConfig = {
    "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": "AKIA3DIUBMJLDJIKQ7FE", "secretAccessKey": "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"
}
aws.config.update(awsConfig)
let docClient = new aws.DynamoDB.DocumentClient()

exports.handler = (event, context, callback) => {
    let id = (Math.random() * 1000)
    event.seguimiento_id = id
    let params = {
        TableName: "Seguimiento",
        Item: event
    }
    
    docClient.put(params, function(err, data) {
        if(err) {
            callback({
                success: false,
                message: err
            })
        } else {
            callback(null, {
                success: true,
                message: "Ok",
                id: id
            })
        }
    })
}