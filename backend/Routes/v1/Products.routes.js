const express = require("express");
const {
  getAllproducts,
  addProduct,
  getProductId,
  deleteProduct,
  updateProduct,
} = require("../../Controllers/Products.Controllers");
const TokenVerify = require("../../Middlewares/TokenVerify");
const router = express.Router();

router.route("/", TokenVerify).get(getAllproducts).post(addProduct);
router
  .route("/:id", TokenVerify)
  .get(getProductId)
  .delete(deleteProduct)
  .patch(updateProduct);

module.exports = router;
