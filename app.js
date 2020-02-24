import express from 'express';
import request from 'https';

const httpReq = require('request');

const app = express();

//subscription key.
const subscriptionKey = '9cf77d3c9d92490cabeb9d89722303b5';

const uriBase = 'https://centralindia.api.cognitive.microsoft.com/face/v1.0/detect';

// Request parameters.
const params = {
    'returnFaceId': 'true',
    'returnFaceLandmarks': 'false',
    'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +
        'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
};

app.get('/advertise/v1/face-details', (req, res) => {
    if (!req.query.imageUrl) {
        return res.status(400).send({
            success: 'false',
            message: 'Image Url should be provided as a query parameter'
        })
    }
    const options = {
        uri: uriBase,
        qs: params,
        body: '{"url": ' + '"' + req.query.imageUrl + '"}',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': subscriptionKey
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