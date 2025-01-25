import multer from "multer";

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "assets/temp");
   },
   filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now());
   },
});

export const upload = multer({
   storage: storage,
   // limits: {
   //    fileSize: 3000000,
   // },
});
