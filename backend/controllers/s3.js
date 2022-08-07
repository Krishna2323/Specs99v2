const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');
const catchAsync = require('../utils/catchAsync');

const s3 = new S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

exports.uploadFileAWS = (path, filename) => {
  const fileStream = fs.createReadStream(path);

  const testKey = 'testkey';

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: fileStream,
    Key: filename,
  };
  return s3.upload(uploadParams).promise();
};

exports.getFileStream = (key) => {
  const downloadParams = {
    Key: key,
    Bucket: process.env.AWS_BUCKET_NAME,
  };

  return s3.getObject(downloadParams).createReadStream();
};
