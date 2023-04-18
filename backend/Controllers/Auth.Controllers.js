const user = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isExist = await user.findOne({ email: email });
    if (isExist) {
      res.status(200).json({
        status: false,
        message: "This user is already exists!",
      });
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          const result = await user.create({
            name,
            email,
            password: hash,
          });
          console.log(result)
          const token = jwt.sign({id: result._id}, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
          res.status(200).json({
            status: true,
            message: "Successfully created the user",
            result: result,
            token: token,
          });
        });
      });
    }
  } catch (error) {
    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

//signin
module.exports.login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const result = await user.findOne({ email: email });
    if (result) {
      bcrypt.compare(password, result.password, function (err, response) {
        if (err) {
          res.status(200).json({
            status: false,
            message: err.message,
          });
        }
        if (response) {
          const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
          res.status(200).json({
            status: true,
            message: "logged in",
            result: result,
            token: token,
          });
        } else {
          res.json({
            success: false,
            message: "passwords do not match",
          });
        }
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Invalid Email",
      });
    }
  } catch (error) {
    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports.autoLogin = async (req, res) => {
  try {
    const token = req.body.token;
    let id;
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
      if (err) {
        return res.status(403).send({ message: "Forbidden access" });
      }
      req.decoded = decoded;
      if (decoded.id) {
        const result = await user.findById(decoded.id);
        if (result) {
          res.status(200).json({
            message: "Found User",
            result: result,
            status: true,
          });
        } else {
          res.status(200).json({
            message: "Failed to get User",
            status: false,
          });
        }
      } else {
        res.status(200).json({
          message: "Failed to get User",
          status: false,
        });
      }
    });
  } catch (error) {
    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};
