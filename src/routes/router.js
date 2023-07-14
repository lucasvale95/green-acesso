const { Router } = require("express");
const multer = require("multer");
const { uploadMiddleware } = require("../middleware/uploadMiddleware");
const { uploadPDFMiddleware } = require("../middleware/uploadPDFMiddleware");
const {
  criarBoletoController,
  criarBoletoPDFController,
  obterBoletoController,
} = require("../controllers/boletoController");

const router = Router();
const multerConfig = multer({ dest: "uploads/" });

router.get("/boletos", obterBoletoController);

router.post(
  "/boletos",
  multerConfig.single("file"),
  uploadMiddleware,
  criarBoletoController
);

router.post(
  "/boletospdf",
  multerConfig.single("file"),
  uploadPDFMiddleware,
  criarBoletoPDFController
);

module.exports = router;
