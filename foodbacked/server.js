import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";

// App Config
const app = express();
const PORT = process.env.PORT || 5000;



// Middleware
app.use(express.json());
app.use(cors()); 

// db connection
connectDB();

//api endpoint 
app.use("/api/food",foodRouter)
app.use("/images",express.static("uploads"))
app.use("/api/user", userRouter)

app.use(express.urlencoded({ extended: true })); 

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
