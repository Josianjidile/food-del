import foodModel from '../models/foodModel.js';
import fs from 'fs';

// Add food
const addFood = async (req, res) => {
    // Check if a file is uploaded
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    let image_filename = req.file.filename;

    // Validate required fields in the request body
    const { name, description, price, category } = req.body;
    if (!name || !description || !price || !category) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Create a new food item
    const food = new foodModel({
        name,
        description,
        price,
        category,
        image: image_filename,
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error adding food" });
    }
};

// Show all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find(); // Fetch all food items from the database
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching food list" });
    }
};

// Remove food item

const removeFood = async (req, res) => {
    try {
        const foodId = req.params.id; // Use req.params.id

        if (!foodId) {
            return res.status(400).json({ success: false, message: "Food ID is required" });
        }

        const food = await foodModel.findById(foodId);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Remove image file
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: "Error deleting image file" });
            }
        });

        await foodModel.findByIdAndDelete(foodId);

        res.json({ success: true, message: "Food removed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error removing food" });
    }
};


// Export the functions
export { addFood, listFood, removeFood };
