require("dotenv").config();
const aws = require("aws-sdk");
const fs = require("fs");
class BucketService {

  s3 = new aws.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY_ID
  });

  async uploadPicture(base64Picture, username) {
    base64Picture = base64Picture.split(';base64,').pop();

    const buffer = Buffer.from(base64Picture, 'base64');
    const path = `./imgs/${username}.jpg`;
    
    const imageCreated = await this.writePicture(path, base64Picture);

    if (imageCreated.error) {
      return {error : true, message: imageCreated.message};
    }

    const img = fs.readFileSync(path, buffer);

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: `${username}.jpg`,
      Body: img
    };
    return new Promise((resolve, reject) => {
      this.s3.upload(params, (err, result) => {
        fs.unlinkSync(path);
        if (err) {
          return resolve({error: true, message: err});
        }
        return resolve({error: false, message: result});
      });
    });
  }

  async writePicture(path, base64Picture) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, base64Picture, {encoding: 'base64'}, (err) => {
        if (err) {
          return resolve({error: true, message: err});
        }
        return resolve({error: false, message: "Image created."});
      });
    });
  }

}

module.exports = new BucketService();