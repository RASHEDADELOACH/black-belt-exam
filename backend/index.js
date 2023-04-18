const port = process.env.PORT || 5000;
const dbConnect = require("./Dbconnect/dbconnect");
require("dotenv").config();

// db connection
dbConnect();

const app = require("./app");

app.listen(port, () => {
  console.log("Server is running on port", port);
});
