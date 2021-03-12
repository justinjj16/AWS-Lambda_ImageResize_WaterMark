const { downloadImage, resize, saveToS3,waterMark } = require('./utils');

exports.handler = async (event) => {
  
  const bucket = event.Records[0].s3.bucket.name;
  const url = event.Records[0].s3.object.key;
  const str = url;
  const split = str.split("/");
  const l = split.length;
  const end = split[l-1];
  const path = url;
  const buf = await downloadImage(bucket,path);

  let folderPath = {
      verySmall:"resizeImages/200x200/",
      large: "resizeImages/1024x768/",
      medium: "resizeImages/512x512/",
    };
  
  
  //LARGE 
  const large = await resize(buf, 1024,768,folderPath.large);
  const waterMarkinglarge = await waterMark(large);
  await saveToS3(bucket,end, waterMarkinglarge,folderPath.large);
  
  //SMALL
  const verySmall = await resize(buf, 200, 200,folderPath.verySmall);
  const waterMarkingsmall = await waterMark(verySmall);
  await saveToS3(bucket,end, waterMarkingsmall,folderPath.verySmall);
  
  //MEDIUM
  const medium = await resize(buf, 512, 512,folderPath.medium);
  const waterMarkingmedium = await waterMark(medium);
  await saveToS3(bucket,end, waterMarkingmedium,folderPath.medium);
  
  

};