const Product = require("../Models/ProductModel");

// product api's
module.exports.getAllproducts = async (req, res) => {
  const result = await Product.find({})
  if (result) {
    res.status(200).json({
      message: "Data fetched Successfully",
      status: true,
      data: result,
    });
  } else {
    res.status(200).json({
      message: "Failed to fetch!",
      status: false,
    });
  }
};

module.exports.addProduct = async (req, res) => {
  const product = req.body;
  const result = await Product.create(product);
  if (result) {
    res.status(200).json({
      message: "Data Added Successfully",
      status: true,
      data: result,
    });
  } else {
    res.status(200).json({
      message: "Failed to add!",
      status: false,
    });
  }
};

module.exports.getProductId = async (req, res) => {
  const id = req.params.id;
  const result = await Product.findById(id);
  if (result) {
    res.status(200).json({
      message: "Data fetched Successfully",
      status: true,
      data: result,
    });
  } else {
    res.status(200).json({
      message: "Failed to fetch!",
      status: false,
    });
  }
};
module.exports.deleteProduct =  async (req, res) => {
  const id = req.params.id;
  const result = await Product.findByIdAndDelete(id);
  if (result) {
    res.status(200).json({
      message: "Data deleted Successfully",
      status: true,
      data: result,
    });
  } else {
    res.status(200).json({
      message: "Failed to Delete!",
      status: false,
    });
  }
};
module.exports.updateProduct =  async (req, res) => {
  const id = req.params.id;
  const change = req.body;
  if (change) {
    const result = await Product.findByIdAndUpdate(id, change)
    if (result) {
      res.status(200).json({
        message: "Data Updated Successfully",
        status: true,
      });
    } else {
      res.status(200).json({
        message: "Failed to update!",
        status: false,
      });
    }
  }
};
