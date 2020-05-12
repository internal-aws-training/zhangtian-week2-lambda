const aws = require('aws-sdk');
const s3 = new aws.S3();

exports.run = async () => {
  const sourceParams = {
    Bucket: 'lambda-traning-zhangtian',
    Key: 'testFile'
  };

  const file = await s3.getObject(sourceParams).promise()
    .then(res => {
      console.log("get file successfully");
      return res.Body;
    })
    .catch(error => {
      console.error("get file failure: ", error);
      throw error;
    });

  const copyParams = {
    Bucket: 'aws-practice-yaxin-copy',
    Key: 'zhangtian-testFile',
    Body: file
  };

  await s3.putObject(copyParams).promise()
    .then(() => console.log("upload successfully!"))
    .catch(error => {
      console.error("upload failure: ", error);
      throw error;
    });
};
