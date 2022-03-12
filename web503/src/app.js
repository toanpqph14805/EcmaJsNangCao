// const express = require('express');
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import productRoute from "./routes/product";

const app = express();
// middleware
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

// routes
app.use("/api", productRoute);

// connection db
mongoose.connect("mongodb://localhost:27017/we16310")
    .then(() => console.log("Ket noi db thanh cong"))
    .catch((error) => console.log(error));
// connect
const PORT = 8000;
app.listen(PORT, () => {
    console.log("Server của bạn đang chạy cổng ", PORT);
});