const buckets = require('express').Router()
const AWS = require('aws-sdk');
const config = require('../config/aws')

var myCredentials = new AWS.Credentials(config.accessKeyId, config.secretAccessKey)
var myConfig = new AWS.Config({
  credentials: myCredentials, region: config.region
});

var s3 = new AWS.S3();

const list = (req, res) => {
    s3.listBuckets({}, function(err, data) {
        const {Buckets = []} = data

        if (err) {
            console.error('Unable to fetch buckets:', err.stack)
            throw new Exception(err)
        }
        
        console.log(`Received ${Buckets.length} buckets`)
        
        return res.send(Buckets)
    });
}

const create = (req, res) => {
    const bucketName = req.body.name

    s3.createBucket({Bucket: bucketName}, (err, data) => {
        if (err) {
            console.error(`Unable to create bucket '${bucketName}': ${err}`);
            throw new Exception(err)
        }
        
        console.log(`Bucket created: '${bucketName}'`)
        return res.send({status: 'success'})
    });
}

const deleteBucket = (req, res) => {
    const bucketName = req.params.name

    s3.deleteBucket({Bucket: bucketName}, (err, data) => {
        if (err) {
            console.error(`Unable to delete bucket '${bucketName}': ${err}`);
            throw new Exception(err)
        }
        
        console.log(`Bucket deleted: '${bucketName}'`)
        return res.send({status: 'success'})
    });
}

module.exports = {
    list,
    create,
    deleteBucket
}