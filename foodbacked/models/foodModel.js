import mongoose from "mongoose";

// Define the schema
const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
        type: String,
      },
    price: {
      type: Number,
      required: true,
    },
   
    image: {
      type: String,
      required: true,
    },
    category: {
        type: String,
        required: true,
      },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Create the model
const foodModel = mongoose.models.food || mongoose.model("Food", foodSchema);

export default foodModel;


