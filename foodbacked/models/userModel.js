import mongoose from "mongoose";

// Define the schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
      lowercase: true, // Make email lowercase to avoid duplicates
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], // Email format validation
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object, // or use a sub-schema for a more detailed structure
      default: {},
    },
  },
  { minimize:false},
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Create the model
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
