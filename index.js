const { downloadImage, resize, saveToS3,waterMark } = require('./utils');

exports.handler = async (event) => {
  
  let bucket = event.Records[0].s3.bucket.name;
  
  let url = event.Records[0].s3.object.key;
  
  const str = url;
  const split = str.split("/");
  const l = split.length;
  
  var end = split[l-1];
  
  const path = url;
  const buf = await downloadImage(bucket,path);
  let folderPath = {};
  
  if(split[l-2] == "propertyImages"){
     folderPath = {
      verySmall:"resizeImages/propertyImages/property-image-100x100/",
      large: "resizeImages/propertyImages/property-image-1000x800/",
      medium: "resizeImages/propertyImages/property-image-500x500/",
    };
  }else if(split[l-2] == "Builder"){
     folderPath = {
      verySmall:"resizeImages/Builder/builder-image-100x100/",
      large: "resizeImages/Builder/builder-image-1000x800/",
      medium: "resizeImages/Builder/builder-image-500x500/",
    };
  }else {
    return "Invalid Folder";
  }
  
  
  //LARGE 
  const large = await resize(buf, 1000, 800,folderPath.large);
  const waterMarkinglarge = await waterMark(large,200, 100);
  await saveToS3(bucket,end, waterMarkinglarge,folderPath.large);
  
  //SMALL
  const verySmall = await resize(buf, 100, 100,folderPath.verySmall);
  const waterMarkingsmall = await waterMark(verySmall,50,30);
  await saveToS3(bucket,end, waterMarkingsmall,folderPath.verySmall);
  
   
  
  //MEDIUM
  const medium = await resize(buf, 500, 500,folderPath.medium);
  const waterMarkingmedium = await waterMark(medium,100,50);
  await saveToS3(bucket,end, waterMarkingmedium,folderPath.medium);
  
  

};