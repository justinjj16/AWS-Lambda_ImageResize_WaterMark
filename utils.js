const GM = require("gm");
const gm = GM.subClass({ imageMagick: true });
const FileType = require("file-type");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();

exports.downloadImage = async (bucket, url) => {
  try {
    const params = {
      Bucket: bucket,
      Key: url,
    };
    var origimage = await s3.getObject(params).promise();
    origimage.responseType = "arraybuffer";
    return Buffer.from(origimage.Body, "binary");
  } catch (error) {
    console.log(error);
    return;
  }
};

exports.resize = async (buf, width, height,path) => {
  return new Promise((resolve, reject) => {
    gm(buf)
    .resize(width, height)
      .toBuffer((err, buffer) => (err ? reject(err) : resolve(buffer)));
  });
};
exports.waterMark = async(buf,width,height)=>{
  return new Promise((resolve, reject) => {
    gm(buf)
    .gravity('SouthEast')
    .composite('./justinLogo.png')
     .toBuffer((err, buffer) => (err ? reject(err) : resolve(buffer)))
  });
  
}
exports.saveToS3 = async (bucket, name, buf, path) => {
  const contentType = await FileType.fromBuffer(buf);
  const key = `${path}${name}`;
  await s3
    .putObject({
      Bucket: bucket,
      Key: key,
      Body: buf,
      Tagging: "key1=value1&key2=value2",
      ContentEncoding: "base64",
      ContentType: contentType.mime,
    })
    .promise();
  return key;
};