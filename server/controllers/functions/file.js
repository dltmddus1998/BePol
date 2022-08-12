import { s3 } from "../../config/s3.js";

export const deleteS3File = (filename) => {
  const params = {
    Bucket: "bepol-bucket",
    Key: filename,
  };

  try {
    s3.deleteObject(params, function (error, data) {
      if (error) {
        console.log(error);
      } else {
        console.log(data, " 정상 삭제 되었습니다.");
        return true;
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const downloadS3File = (res, filename) => {
  const options = {
    Bucket: "bepol-bucket",
    Key: filename,
  };

  res.attachment(filename);
  s3.getObject(options).createReadStream().pipe(res);
};
