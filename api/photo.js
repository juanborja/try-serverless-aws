'use strict';
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
module.exports.submit = (event, context, callback) => {
  const params = JSON.parse(event.body);
  var s3Params = {
    Bucket:process.env.S3_BUCKET,
    Key: params.name,
    ContentType: params.type,
    ACL: 'public-read',
  };
  var uploadURL = s3.getSignedUrl('putObject', s3Params);

 callback(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ uploadURL: uploadURL }),
  });
};



