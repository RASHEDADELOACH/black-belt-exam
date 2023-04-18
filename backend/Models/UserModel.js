const { default: mongoose } = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide a name"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("user", userSchema);
module.exports = user;
