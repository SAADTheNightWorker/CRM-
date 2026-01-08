const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure "upload" directory exists
const uploadDir = path.join(process.cwd(), "upload");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("✅ Created 'upload' directory");
}

// Define storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const fileName = `${file.fieldname}-${uniqueSuffix}${ext}`;
    cb(null, fileName);
  },
});

// File filter for PDF, JPEG, PNG
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("❌ Only PDF, JPEG, and PNG files are allowed"));
  }
};

// Create Multer middleware
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit
});

module.exports = upload;
