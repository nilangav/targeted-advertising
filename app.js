const express = require("express");
const httpReq = require('request');

const app = express();

var config = require('./config.json');;

// Request parameters.
const params = {
    'returnFaceId': config.faceParams.returnFaceId,
    'returnFaceLandmarks': config.faceParams.returnFaceLandmarks,
    'returnFaceAttributes': config.faceParams.returnFaceAttributes
};

app.get( config.endpoints.faceDetailsByUrl, (req, res) => {
    if (!req.query.imageUrl) {
        return res.status(400).send({
            success: 'false',
            message: 'Image Url should be provided as a query parameter'
        })
    }
    const options = {
        uri: config.faceApiBaseUri,
        qs: params,
        body: '{"url": ' + '"' + req.query.imageUrl + '"}',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': config.subscriptionKey
        }
    };
    httpReq.post(options, (error, response, body) => {
        if (error) {
            console.log('Error: ', error);
            return;
        }
        return res.status(200).send({
            success: 'true',
            message: 'Face Data retrieved successfully',
            data: JSON.parse(body)
        })
    })
});


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});