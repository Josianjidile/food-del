import React, { useEffect, useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = ({url}) => {
 
  const [image, setImage] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "salad",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (Number(data.price) <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);
      formData.append("image", image);

      const response = await axios.post(`${url}/api/food/add`, formData);

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "salad",
        });
        setImage(null);
        setPreviewURL(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("An error occurred while adding the product.");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        toast.error("Only JPEG and PNG images are allowed.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size should not exceed 2MB.");
        return;
      }
      setImage(file);
    }
  };

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setPreviewURL(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [image]);

  return (
    <div className="add">
      <ToastContainer />
      <form onSubmit={onSubmitHandler}>
        {/* Image Upload Section */}
        <div className="add-img-upload">
          <label htmlFor="image">
            <img
              src={previewURL || assets.upload_area}
              alt="Upload Preview"
            />
            <p>Upload Image</p>
          </label>
          <input
            type="file"
            id="image"
            hidden
            onChange={handleImageUpload}
            required
          />
        </div>

        {/* Product Name */}
        <input
          name="name"
          onChange={onChangeHandler}
          value={data.name}
          type="text"
          placeholder="Product Name"
          required
        />

        {/* Product Description */}
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          placeholder="Product Description"
          rows="4"
          required
        ></textarea>

        {/* Category Dropdown */}
        <select
          name="category"
          onChange={onChangeHandler}
          value={data.category}
          required
        >
          <option value="" disabled>
            Choose Category
          </option>
          <option value="salad">Salad</option>
          <option value="rolls">Rolls</option>
          <option value="desserts">Desserts</option>
          <option value="sandwich">Sandwich</option>
          <option value="cake">Cake</option>
        </select>

        {/* Price Input */}
        <input
          name="price"
          onChange={onChangeHandler}
          value={data.price}
          type="number"
          placeholder="Price ($)"
          min="0"
          required
        />

        {/* Submit Button */}
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
  