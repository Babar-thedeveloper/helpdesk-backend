import multer from "multer";
import path from "path";
import fs from "fs";

// Storage Creator
const createStorage = (folderName) => {
  const fullPath = path.join("uploads", folderName);

  // Create folder if not exists then
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, fullPath);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
      cb(null, uniqueName);
    },
  });

  //  type validation here
  const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG, and PDF files are allowed"));
    }
  };

  return multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit
};

// Export different uploaders based on folder or add more as needed
// export const challanUploader = createStorage("challans");
// export const paymentProofUploader = createStorage("payment_proofs");
// export const groundUploader = createStorage("grounds");
// export const gameUploader = createStorage("games");
// export const userPictureUploader=createStorage("user_pictures")
