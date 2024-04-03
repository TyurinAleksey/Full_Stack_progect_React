import express from "express";
import multer from "multer";
import mongoose from "mongoose";

import {registerValidation, loginValidation, postCreateValidation} from "./validations.js";

import {checkAuth, handelValidationsErrors} from "./utils/index.js"

import {UserController, PostController} from "./controllers/index.js"

mongoose.connect(
    "mongodb+srv://admin:wwwwww@cluster0.pwmfw2w.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
).then(() => console.log("DB ok"))
    .catch((err) => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "uploads");
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
})

const upload = multer({storage});

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.post("/auth/login", loginValidation, handelValidationsErrors, UserController.login);
app.post("/auth/register", registerValidation, handelValidationsErrors, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe)

app.post("/uploads", checkAuth, upload.single("image"), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, handelValidationsErrors, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", checkAuth, postCreateValidation, handelValidationsErrors, PostController.update);

app.listen("4444", (err) => {
    if (err) {
        return (err)
    }
    console.log("Сервер запущен...")
});