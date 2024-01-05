const express = require("express");
const cors=require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/userRoute");
const errorHandler = require("./middleware/errorHandler");
const { productRouter } = require("./routes/productRoutes");
const app = express();

app.use(express.json());
app.use(cors());
app.use(errorHandler);

app.use("/api", userRouter);
app.use("/api", productRouter);
app.get("/", (req, res) => {
    res.send("Home Page");
  });

app.listen(8080, async() => {
    await connection;
    console.log("connected to db.")
    console.log(`Server is running on port 8080`);
});
