import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import { s3 } from "../config/s3.js";

export const upload = (req, res, next) => {
  /**
   * 작성자: 나수민
   *
   * 업로드 객체 생성
   * 확장자 및 파일 크기 등 옵션 설정
   * AWS 연결
   */

  const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".pdf") {
      return cb(new Error("Only image and .pdf format allowed"));
    }
    cb(null, true);
  };

  const storage = multerS3({
    s3: s3,
    bucket: "bepol-bucket",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(
        null,
        `${Date.now()}_${Buffer.from(file.originalname, "latin1").toString(
          "utf8"
        )}`
      );
    },
  });

  const limits = { fileSize: 1024 * 1024 };

  const upload = multer({ storage, limits }).array("attachments");

  upload(req, res, (err) => {
    if (err) res.status(500).send({ message: err.message });
    else next();
  });
};
