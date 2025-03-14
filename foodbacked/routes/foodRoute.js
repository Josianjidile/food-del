import express from "express";
import { addFood, listFood, removeFood } from '../controller/foodController.js';
import multer from "multer";

const foodRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Routes
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.delete("/remove/:id", removeFood); // Use :id in the URL to match the controller

export default foodRouter;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       