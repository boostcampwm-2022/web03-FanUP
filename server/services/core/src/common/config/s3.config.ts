import { S3Client } from '@aws-sdk/client-s3';
import { Request } from 'express';
import * as multerS3 from 'multer-s3';
import { v4 } from 'uuid';

const s3 = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESSKEY,
    secretAccessKey: process.env.AWS_SECRETKEY,
  },
});

const S3Storage = multerS3({
  s3,
  bucket: process.env.S3_BUCKET,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read',
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: (request: Request, file, cb) => {
    const fileName = file.originalname;
    const extension = fileName.substring(fileName.lastIndexOf('.'));
    cb(null, `${new Date().getTime()}-${v4()}${extension}`);
  },
});

export { S3Storage };
