import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './List.css';
import { toast } from "react-toastify";

const List = ({url}) => {
 
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      toast.error("An error occurred while fetching the list");
    }
  };

  // const removeFood =async(foodId)=>{
  //   const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
  //    await fetchList();
  // }
  // const removeFood = async (foodId) => {
  //   const response= await axios.delete(`${url}/api/food/remove`,{id:foodId})
     
  //    await fetchList();

  
  //   console.log(foodId)
  // };

  const removeFood = async (foodId) => {
    try {
      await axios.delete(`${url}/api/food/remove/${foodId}`); // Pass the ID in the URL
   
      await fetchList();
      if (response.data.success) {
        setList(response.data.message);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      toast.error("An error occurred while fetching the list");
    }
  };
  
  

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list-container">
      <h1>All Food List</h1>
      {list.length > 0 ? (
        <table className="food-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                    className="food-image"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                <button onClick={() => removeFood(item._id)} className="action-btn delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items found.</p>
      )}
    </div>
  );
};

export default List;
