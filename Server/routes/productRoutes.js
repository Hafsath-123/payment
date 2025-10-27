
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");


const {
    addProduct,
    getAllProducts,
} = require("../Controller/addProduct");

router.post("/add", upload.single("image"), addProduct);
router.get("/", getAllProducts);

module.exports = router;