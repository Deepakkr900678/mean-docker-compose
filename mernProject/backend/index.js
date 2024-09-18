const express = require("express");
const app = express();
const studentRoutes = require("./routes/student");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 5050;

dotenv.config();
database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

app.use("/api/v1/student", studentRoutes);

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running ...",
    });
});

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
});