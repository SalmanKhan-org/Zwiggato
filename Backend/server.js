require("dotenv").config({ path: 'C:/NewMernStack/.env' })
const express = require("express");
const { connectDB } = require("./db/connectDB");
const error = require("./middlewares/error");
const userRoutes = require("./routes/userRoutes")
const restaurantRoutes = require("./routes/restaurantRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const path = require("path");

const DIRNAME = path.resolve();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser())

app.use("/api/v1", userRoutes);
app.use("/api/v1", restaurantRoutes);
app.use("/api/v1", menuRoutes);
app.use("/api/v1", orderRoutes);
//error handler middleware
app.use(error);

app.use(express.static(path.join(DIRNAME, "/Frontend/dist")));
app.use("*", (req, res) => {
    res.sendFile(path.resolve(DIRNAME, "Frontend", "dist", "index.html"));
})

const PORT = process.env.PORT ;
app.listen(PORT, () => {
    connectDB()
})

