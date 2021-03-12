# AWS Image Resize And Watermark

Its a JavaScript code for dealing with Aws lambda Image resize 
and watermark.

## Usage

### I) Create lambda function
Add [imagemagick](https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:145266761615:applications~image-magick-lambda-layer) and [ghostscript](https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:154387959412:applications~ghostscript-lambda-layer) layer

### II) Git clone
Git clone from [github](https://github.com/justinjj16/AWS-Lambda_ImageResize_WaterMark) and ```npm install ``` then  make zip 

### III) Import zip
Import zip folder in created lambda function

### IV) Create S3 bucket
Create AWS s3 bucket structure what your want.

eg: 
```
bucket
├── orginalInage
│   └── file2.jpeg
│   └── file2.png
├── resizeImage
│   └── 1024x768
│       └── file1.jpeg
│       └── file2.png
│   └── 512x512
│       └── file1.jpeg
│       └── file2.png
│   └── 200x200
│       └── file1.jpeg
│       └── file2.png
```
### V) S3 Bucket Permission

 i) Make buket permission as public. Permission--> Block public access (bucket settings) --> off all

ii) Create Bucket policy as 
```
{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Sid": "AllowPublicRead",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
        }
    ]
}
```
iii) Give Access control lis

iv) Create Cross-origin resource sharing (CORS) as

```
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "DELETE",
            "GET",
            "HEAD"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [
            "x-amz-server-side-encryption",
            "x-amz-request-id",
            "x-amz-id-2"
        ],
        "MaxAgeSeconds": 3000
    }
]
```

### VI) S3 bucket properties
Generate Event notification and give prefix as ```orginalImages/``` 

### VII) Set Lambda timeout time
Configuration -->General Configuration -->Edit 
[here](https://stackoverflow.com/questions/62948910/aws-lambda-errormessage-task-timed-out-after-3-00-seconds/66198913#66198913)

### VIII) Give s3 access for lambda
Go to IAM --> Roles --> select your function -->Amazones3fillAccess.

